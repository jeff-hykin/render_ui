import { createEditor } from 'https://cdn.jsdelivr.net/gh/jeff-hykin/codemirror_esm@1.0.0.5/helpers.js'
import { javascript } from 'https://cdn.jsdelivr.net/gh/jeff-hykin/codemirror_esm@1.0.0.5/@codemirror/lang-javascript.js'
import { bash } from 'https://cdn.jsdelivr.net/gh/jeff-hykin/codemirror_esm@1.0.0.5/@codemirror/lang-bash.js'
import throttle from 'https://esm.sh/lodash/throttle'
import { translate } from 'https://esm.sh/gh/jeff-hykin/bash2deno@master/api.js'
import { renderUiConnectionKey } from "https://esm.sh/gh/jeff-hykin/render_ui@0.0.1/main/frontend/connectionsCore.js"
var { html, passAlongProps } = await import("https://esm.sh/gh/jeff-hykin/elemental@0.6.5/main/deno.js?dev")

const connections = globalThis[renderUiConnectionKey].connections
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


const warningsDiv = html`<div style=${`
    height: 12rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: gray;
    overflow-y: scroll;
`}/>`

const javascriptEditor = createEditor({
    style: "width:50vw;height:100vh",
    language: javascript,
})

const convertCode = throttle(({element, editor}, update)=>{
    try {
        console.debug(`element.value is:`,element.value)
        let { jsCode, xmlStylePreview } = translate(element.value)
        // remove fs if its not needed (hack)
        if (jsCode.match(/\bfs\b/g).length > 1) {
            jsCode = jsCode.replace(/.+\bfs\b.+\n/g, "")
        }
        // remove path if its not needed (hack)
        if (jsCode.match(/\bpath\b/g).length > 1) {
            jsCode = jsCode.replace(/.+\bpath\b.+\n/g, "")
        }
        javascriptEditor.value = jsCode
        // warningsDiv.innerHTML = warnings.map(each=>`<span>${each}</span>`.replace(/\n/g,"<br>")).join("<br>")
    } catch (error) {
        warningsDiv.innerHTML = error.message + "\n" + error.stack.replace(/\n/g,"<br>")
    }
}, 1000)

const bashEditor = createEditor({
    style: "width:50vw;height:100vh",
    language: bash,
    value: `
        echo "hello" > file.txt
    `.replace(/\n                /g, "\n").slice(1),
    onInput: convertCode,
})

// initial convert
setTimeout(() => {
    console.log(`initial convert`)
    convertCode({element: bashEditor})
}, 500)


document.body = html`<body display=flex>
    ${bashEditor}
    ${javascriptEditor}
    ${warningsDiv}
</body>`