import { createEditor } from 'https://cdn.jsdelivr.net/gh/jeff-hykin/codemirror_esm@1.0.0.5/helpers.js'
import { javascript } from 'https://cdn.jsdelivr.net/gh/jeff-hykin/codemirror_esm@1.0.0.5/@codemirror/lang-javascript.js'
import { bash } from 'https://cdn.jsdelivr.net/gh/jeff-hykin/codemirror_esm@1.0.0.5/@codemirror/lang-bash.js'
import throttle from 'https://esm.sh/lodash/throttle'
import { translate } from 'https://esm.sh/gh/jeff-hykin/bash2deno@master/api.js'
import { renderUiConnectionKey } from "https://esm.sh/gh/jeff-hykin/render_ui@ca4afbe/main/frontend/connectionsCore.js"
globalThis.renderUiConnectionKey2 = renderUiConnectionKey
var { html, passAlongProps } = await import("https://esm.sh/gh/jeff-hykin/elemental@0.6.5/main/deno.js?dev")
import { createWindowingSystem } from "./desktop/main.js"

console.debug(`renderUiConnectionKey is:`,renderUiConnectionKey)
const connections = globalThis[Symbol.for("renderUiConnectionCore")].connections
// DEBUGGING ONLY
globalThis.connections = connections

console.debug(`connections is:`,connections)

function connect(connectionName) {
    const connection = connections[connectionName]
    if (connection) {
        const { hostname, port } = connection
        console.log(`connecting to ${hostname}:${port}`)
        return new WebSocket(`ws://${hostname}:${port}/render_ui_listener/${connectionName}`)
    }
}
globalThis.connect = connect


const { createButton, desktop, manager } = createWindowingSystem()

createButton.style.position = 'fixed'
createButton.style.top = '10px'
createButton.style.right = '10px'

desktop.style.position = 'fixed'
desktop.style.left = '0'
desktop.style.top = '0'
desktop.style.width = '100vw'
desktop.style.height = '100vh'


// const javascriptEditor = createEditor({
//     style: "width:50vw;height:100vh",
//     language: javascript,
// })

// const convertCode = throttle(({element, editor}, update)=>{
//     try {
//         console.debug(`element.value is:`,element.value)
//         let { jsCode, xmlStylePreview } = translate(element.value)
//         // remove fs if its not needed (hack)
//         if (jsCode.match(/\bfs\b/g).length > 1) {
//             jsCode = jsCode.replace(/.+\bfs\b.+\n/g, "")
//         }
//         // remove path if its not needed (hack)
//         if (jsCode.match(/\bpath\b/g).length > 1) {
//             jsCode = jsCode.replace(/.+\bpath\b.+\n/g, "")
//         }
//         javascriptEditor.value = jsCode
//         // warningsDiv.innerHTML = warnings.map(each=>`<span>${each}</span>`.replace(/\n/g,"<br>")).join("<br>")
//     } catch (error) {
//         warningsDiv.innerHTML = error.message + "\n" + error.stack.replace(/\n/g,"<br>")
//     }
// }, 1000)

// const bashEditor = createEditor({
//     style: "width:50vw;height:100vh",
//     language: bash,
//     value: `
//         echo "hello" > file.txt
//     `.replace(/\n                /g, "\n").slice(1),
//     onInput: convertCode,
// })

// // initial convert
// setTimeout(() => {
//     console.log(`initial convert`)
//     convertCode({element: bashEditor})
// }, 500)

document.body = html`<body display=flex font-family="sans-serif">
    ${desktop}
    ${createButton}
</body>`