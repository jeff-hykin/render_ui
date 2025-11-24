#!/usr/bin/env -S deno run --allow-all
import { indent } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/indent.js'
import Yaml from 'https://esm.sh/yaml@2.4.3'
import { Console, cyan, green, magenta, yellow } from "https://deno.land/x/quickr@0.8.4/main/console.js"
import { asyncIterablePrefetcher } from "https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/async_iterator_prefetcher.js"
import { escapeHtml } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/escape_html.js'
import { FileSystem, glob } from "https://deno.land/x/quickr@0.8.6/main/file_system.js"
import { jsBundle } from "./jsBundle.js"
import { escapeJsString } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/escape_js_string.js'
import bundledJs from "./frontend/main.bundle.js"
import { hashItem } from "https://raw.githubusercontent.com/jeff-hykin/quickr/96026715afcc72bb185fee7a1d9c9a6875064f33/main/flat/hash_item.js"
import storageObject from "https://deno.land/x/storage_object@0.0.2.0/main.js"
import { certFileContents, keyFileContents } from "./dummyCertFiles.js"

function escapeInnerJs(code) {
    return code.replace("</script>", "<\\/script>")
}
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
        async (req) => {
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
                        try {
                            code = escapeInnerJs(new TextDecoder().decode(await jsBundle(`${thisFolder}/frontend/main.js`)))
                            // save the bundle, escaped for html, for static importing later
                            FileSystem.write({path:`${thisFolder}/frontend/main.bundle.js`, data:`export default ${escapeJsString(code)}`}).catch((error)=>{
                                console.warn(`failed to save the bundled frontend, nbd: ${error}`)
                            })
                        } catch (error) {
                            console.log(`failed to bundle frontend: ${error}`)
                        }
                    }
                }
                return new Response(new TextEncoder().encode(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${escapeHtml(config.title||"Render UI")}</title>
                        <style>
                            @-ms-viewport {
                              width: device-width;
                            }
                            article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, main, summary {
                              display: block;
                            }

                            *, *::before, *::after {
                              box-sizing: inherit;
                            }

                            html {
                              /* 1 */
                              box-sizing: border-box;
                              /* 2 */
                              touch-action: manipulation;
                              /* 3 */
                              -webkit-text-size-adjust: 100%;
                              -ms-text-size-adjust: 100%;
                              /* 4 */
                              -ms-overflow-style: scrollbar;
                              /* 5 */
                              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                            }

                            body {
                              line-height: 1;
                            }

                            html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, main {
                              font-size: 100%;
                              font: inherit;
                              vertical-align: baseline;
                            }

                            ol, ul {
                              list-style: none;
                            }

                            blockquote, q {
                              quotes: none;
                            }

                            blockquote::before, blockquote::after, q::before, q::after {
                              content: "";
                              content: none;
                            }

                            table {
                              border-collapse: collapse;
                              border-spacing: 0;
                            }

                            hr {
                              /* 1 */
                              box-sizing: content-box;
                              height: 0;
                              /* 2 */
                              overflow: visible;
                            }

                            pre, code, kbd, samp {
                              /* 1 */
                              font-family: monospace, monospace;
                            }

                            pre {
                              /* 2 */
                              overflow: auto;
                              /* 3 */
                              -ms-overflow-style: scrollbar;
                            }

                            a {
                              /* 1 */
                              background-color: transparent;
                              /* 2 */
                              -webkit-text-decoration-skip: objects;
                            }

                            abbr[title] {
                              /* 1 */
                              border-bottom: none;
                              /* 2 */
                              text-decoration: underline;
                              text-decoration: underline dotted;
                            }

                            b, strong {
                              font-weight: bolder;
                            }

                            small {
                              font-size: 80%;
                            }

                            sub, sup {
                              font-size: 75%;
                              line-height: 0;
                              position: relative;
                            }

                            sub {
                              bottom: -0.25em;
                            }

                            sup {
                              top: -0.5em;
                            }

                            img {
                              border-style: none;
                            }

                            svg:not(:root) {
                              overflow: hidden;
                            }

                            button {
                              border-radius: 0;
                            }

                            input, button, select, optgroup, textarea {
                              font-family: inherit;
                              font-size: inherit;
                              line-height: inherit;
                            }

                            button, [type=reset], [type=submit], html [type=button] {
                              -webkit-appearance: button;
                            }

                            input[type=date], input[type=time], input[type=datetime-local], input[type=month] {
                              -webkit-appearance: listbox;
                            }

                            fieldset {
                              min-width: 0;
                            }

                            [tabindex="-1"]:focus {
                              outline: 0 !important;
                            }

                            button, input {
                              overflow: visible;
                            }

                            button, select {
                              text-transform: none;
                            }

                            button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner {
                              border-style: none;
                              padding: 0;
                            }

                            legend {
                              /* 1 */
                              max-width: 100%;
                              white-space: normal;
                              /* 2 */
                              color: inherit;
                              /* 3 */
                              display: block;
                            }

                            progress {
                              vertical-align: baseline;
                            }

                            textarea {
                              overflow: auto;
                            }

                            [type=checkbox], [type=radio] {
                              /* 1 */
                              box-sizing: border-box;
                              /* 2 */
                              padding: 0;
                            }

                            [type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {
                              height: auto;
                            }

                            [type=search] {
                              /* 1 */
                              -webkit-appearance: textfield;
                              /* 2 */
                              outline-offset: -2px;
                            }

                            [type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration {
                              -webkit-appearance: none;
                            }

                            ::-webkit-file-upload-button {
                              /* 1 */
                              -webkit-appearance: button;
                              /* 2 */
                              font: inherit;
                            }

                            template {
                              display: none;
                            }

                            [hidden] {
                              display: none;
                            }

                            button:focus {
                              outline: 1px dotted;
                              outline: 5px auto -webkit-focus-ring-color;
                            }

                            button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring {
                              outline: 1px dotted ButtonText;
                            }

                            html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, main {
                              margin: 0;
                              padding: 0;
                              border: 0;
                            }

                            input, button, select, optgroup, textarea {
                              margin: 0;
                            }

                            body {
                              width: 100vw;
                              min-height: 100vh;
                              overflow: visible;
                              scroll-behavior: auto;
                            }

                            textarea {
                              resize: vertical;
                            }

                            br {
                              display: inline-block;
                              content: "";
                              border-bottom: 0px solid transparent;
                            }
                        </style>
                    </head>
                        <body>
                            <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
                                <div style="width: 50px;height: 50px;border: 10px solid #dddddd;border-top-color: #009579;border-radius: 50%;transform: rotate(0.16turn);" id="good-component--initial-loader">
                                </div>
                            </div>
                        </body>
                        <script>
                            // 
                            // Synchonous/Fast loading animation
                            // 
                                const animateLoader = ()=>{
                                const element = document.getElementById("good-component--initial-loader")
                                    element && element.animate(
                                        [
                                            { transform: 'rotate(0turn)' },
                                            { transform: 'rotate(1turn)' },
                                        ],
                                        {
                                            duration: 1000,
                                            iterations: Infinity,
                                            easing: 'ease',
                                        },
                                    )
                                }
                                document.body ? animateLoader() : document.addEventListener("DOMContentLoaded", animateLoader)
                        </script>
                    <script type="module">
                        import { renderUiConnectionKey } from "https://esm.sh/gh/jeff-hykin/render_ui@cae2868/main/frontend/connectionsCore.js"
                        globalThis[renderUiConnectionKey].connections = {
                            default: ${escapeInnerJs(JSON.stringify(connectionInfo))},
                        }
                    </script>
                    <script type="module">
                        ${code /* NOTE: this has already been escaped for html (e.g. cached escape) */}
                    </script>
                </html>`), { status: 200, headers: { "content-type": "text/html" } })
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