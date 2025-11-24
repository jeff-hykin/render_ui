/** @jsx h */
import { createSignal, createEffect, h, Show, onMount } from "../tools/solid.js"
// import "dockview-core/dist/styles/dockview.css"
import { createDockview, GroupPanelPartInitParameters, IContentRenderer, themeAbyss } from "../tools/dockview.js"

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const panelTypes = {
    FixedHeightContainer: class implements IContentRenderer {
        private readonly _element: HTMLElement

        get element(): HTMLElement {
            return this._element
        }

        constructor() {
            this._element = document.createElement("div")
            this._element.style.color = "white"
            this._element.style.height = "100%"
            this._element.textContent = [TEXT, "\n\n"].join("").repeat(20)
        }

        init(parameters: GroupPanelPartInitParameters): void {
            //
        }
    },
    OverflowContainer: class implements IContentRenderer {
        private readonly _element: HTMLElement

        get element(): HTMLElement {
            return this._element
        }

        constructor() {
            this._element = document.createElement("div")
            this._element.style.color = "white"
            this._element.style.height = "200px"
            this._element.style.overflow = "auto"
            this._element.textContent = [TEXT, "\n\n"].join("").repeat(20)
        }

        init(parameters: GroupPanelPartInitParameters): void {
            //
        }
    },
    UserDefinedOverflowContainer: class implements IContentRenderer {
        private readonly _element: HTMLElement

        get element(): HTMLElement {
            return this._element
        }

        constructor() {
            this._element = document.createElement("div")
            this._element.style.color = "white"
            this._element.style.height = "100%"

            const innerEl = document.createElement("div")
            innerEl.style.height = "100%"
            innerEl.style.color = "white"
            innerEl.style.overflow = "auto"

            innerEl.textContent = [TEXT, "\n\n"].join("").repeat(20)
            this._element.appendChild(innerEl)
        }

        init(parameters: GroupPanelPartInitParameters): void {
            //
        }
    },
}

export function Panels(props) {
    function onRef(el: HTMLDivElement) {
        const api = createDockview(el, {
            theme: themeAbyss,
            createComponent: (options) => {
                console.debug(`options.name is:`,options.name)
                const item = new panelTypes[options.name]
                console.debug(`item is:`,item)
                return item
            },
        })

        api.addPanel({
            id: "panel_1",
            component: "FixedHeightContainer",
            title: "Panel 1",
        })

        api.addPanel({
            id: "panel_2",
            component: "OverflowContainer",
            title: "Panel 2",
            position: { direction: "right" },
        })

        api.addPanel({
            id: "panel_3",
            component: "UserDefinedOverflowContainer",
            title: "Panel 3",
            position: { direction: "right" },
        })
    }
    return <div name="hi" style={{ ...props.style }} ref={onRef}></div>
}
