#!/usr/bin/env -S deno run --allow-all
import { indent } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/indent.js'
import Yaml from 'https://esm.sh/yaml@2.4.3'
import { Console, cyan, green, magenta, yellow } from "https://deno.land/x/quickr@0.8.4/main/console.js"
import { asyncIterablePrefetcher } from "https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/async_iterator_prefetcher.js"
import { escapeHtml } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/escape_html.js'
import { FileSystem, glob } from "https://deno.land/x/quickr@0.8.6/main/file_system.js"
import { jsBundle } from "./jsBundle.js"
import { escapeJsString } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/escape_js_string.js'
import bundledJs from "./frontend/main.ignore.js"
import { hashItem } from "https://deno.land/x/quickr@9602671/main/flattened/hash_item.js"
import storageObject from "https://deno.land/x/storage_object@0.0.2.0/main.js"
import { certFileContents, keyFileContents } from "./dummyCertFiles.js"

const thisFolder = FileSystem.thisFolder
const defaultPort = 4321
export function relayMessages(config={}) {
    // 
    // serve bag file
    // 
    const dataSenders = []
    const dataReceivers = []
    function sendData(event) {
        for (var each of dataReceivers) {
            each.send(event.data)
        }
    }
    
    let extras = {}
    if (config.dummyWss) {
        extras = {
            cert: certFileContents,
            key: keyFileContents,
        }
    }
    const connectionInfo = {
        port: Number.parseInt(config.port||defaultPort),
        hostname: config.address||"0.0.0.0",
    }
    Deno.serve(
        {
            port: connectionInfo.port,
            hostname: connectionInfo.hostname,
            ...extras,
            // onListen: () => {
            //   console.log(`Running on http://127.0.0.1:9093`)
            // },
        },
        (req) => {
            const url = new URL(req.url)
            //
            // asked for something other than websocket
            //
            if (req.headers.get("upgrade") != "websocket") {
                // dev
                let code = bundledJs
                // if on dev, bundle the frontend
                if (await FileSystem.exists(`${thisFolder}/frontend/main.js`)) {
                    // check if the frontend has changed (uses caching and modified times)
                    const {hash, lastModificationTime} = await hashItem(`${thisFolder}/frontend/`, { cache: storageObject.renderUiFrontendCache })
                    if (hash != storageObject.renderUiBundleHash) {
                        storageObject.renderUiBundleHash = hash
                        console.log(`bundling frontend ... `)
                        code = await jsBundle(`${thisFolder}/frontend/main.js`)
                        console.log(`bundled`)
                        // save the bundle, escaped for html, for static importing later
                        FileSystem.writeFile(`${thisFolder}/frontend/main.ignore.js`, `export default ${escapeJsString(escapeHtml(code))}`).catch((error)=>{
                            console.warn(`failed to save the bundled frontend, nbd: ${error}`)
                        })
                    }
                }
                return new Response(new TextEncoder().encode(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${escapeHtml(config.title||"Render UI")}</title>
                        <script type="module">
                            import { renderUiConnectionKey } from "https://esm.sh/gh/jeff-hykin/render_ui@0.0.1/main/frontend/connectionsCore.js"
                            globalThis[renderUiConnectionKey].connections = {
                                default: ${escapeHtml(JSON.stringify(connectionInfo))},
                            }
                        </script>
                        <script type="module">
                            ${code /* NOTE: this has already been escaped for html (e.g. cached escape) */}
                        </script>
                    </head>
                </html>`), { status: 200, headers: { "content-type": "text/plain" } })
            // 
            // socket
            // 
            } else {
                const { socket, response } = Deno.upgradeWebSocket(req)
                socket.addEventListener("open", () => {
                    if (url.pathname.startsWith("/render_ui_listener/")) {
                        console.log("a data receiver connected!")
                        dataReceivers.push(socket)
                        socket.addEventListener("message", (event)=>{
                            console.log(`got data from listener: ${event.data}`)
                        })
                    } else {
                        console.log("a data sender connected!")
                        dataSenders.push(socket)
                        socket.addEventListener("message", sendData)
                    }
                })
                socket.addEventListener("close", () => {
                    var index = dataSenders.indexOf(socket)
                    if (index !== -1) {
                        dataSenders.splice(index, 1)
                    }
                    var index = dataReceivers.indexOf(socket)
                    if (index !== -1) {
                        dataReceivers.splice(index, 1)
                    }
                })

                return response
            }
        }
    )
}