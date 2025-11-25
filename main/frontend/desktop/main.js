import { css } from "https://esm.sh/@emotion/css@11.13.5"

import { clamp, snapToGrid, getHighestZIndex, generateName, createEl, makeDraggable, makeResizable } from "./helpers.js"
var { html, passAlongProps } = await import("https://esm.sh/gh/jeff-hykin/elemental@0.6.5/main/deno.js?dev")

// ============================================================================
// =======================  EMOTION Css CLASSES  ===============================
// ============================================================================

// Window outer shell
const windowCss = css`
    position: absolute;
    background: #fdfdfd;
    border: 1px solid #aaa;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    user-select: none;
`

// Titlebar
const titleBarCss = css`
    background: #4a4a4a;
    color: white;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: move;
    font-size: 13px;
`

const hamburgerCss = css`
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 2px;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`

// Content area
const contentCss = css`
    flex: 1;
    overflow: auto;
    background: #fff;
`

// Settings panel
const settingsPanelCss = css`
    position: absolute;
    background: #f5f5f5;
    border-left: 1px solid #ccc;
    width: 180px;
    top: 0;
    right: -180px;
    bottom: 0;
    display: none;
    overflow-y: auto;
    padding: 6px;
`

// Resize handle
const resizeHandleCss = css`
    position: absolute;
    width: 10px;
    height: 10px;
    background: transparent;
    z-index: 5;

    &.nw {
        top: -1px;
        left: -1px;
        cursor: nwse-resize;
    }
    &.ne {
        top: -1px;
        right: -1px;
        cursor: nesw-resize;
    }
    &.sw {
        bottom: -1px;
        left: -1px;
        cursor: nesw-resize;
    }
    &.se {
        bottom: -1px;
        right: -1px;
        cursor: nwse-resize;
    }
`

// ============================================================================
// =======================  WINDOW CREATION  ==================================
// ============================================================================

function createWindow({ name, type, gridSize, desktop, bringToFront, hideAllSettings, hooks }) {
    // Outermost window element
    const win = createEl("div", {
        className: windowCss,
        style: {
            left: "120px",
            top: "120px",
            width: "300px",
            height: "220px",
        },
    })

    // Title bar
    const titleBar = createEl(
        "div",
        {
            className: titleBarCss,
        },
        [
            createEl("span", { textContent: name }),
            createEl("span", {
                className: hamburgerCss,
                textContent: "☰",
                onclick: () => {
                    const active = settingsPanel.style.display === "block"
                    hideAllSettings()
                    settingsPanel.style.display = active ? "none" : "block"
                    bringToFront(win)
                },
            }),
        ]
    )

    // Content root
    const contentRoot = createEl("div", { className: contentCss })

    // Settings panel
    const settingsPanel = createEl("div", { className: settingsPanelCss })

    win.appendChild(titleBar)
    win.appendChild(contentRoot)
    win.appendChild(settingsPanel)

    // Insert window to desktop
    desktop.appendChild(win)
    bringToFront(win)

    // Make draggable
    makeDraggable(win, titleBar, () => {
        // On drag end → snap to grid
        const rect = win.getBoundingClientRect()
        const snapped = snapToGrid(rect.left, rect.top, gridSize)
        win.style.left = snapped.x + "px"
        win.style.top = snapped.y + "px"
    })

    // Make resizable
    makeResizable(win, () => {
        // On resize end - do nothing special, but could snap size
        // To keep behavior predictable, we don't snap size.
    })

    // CONTENT HOOKS
    let contentHook = hooks[type]
    if (contentHook) {
        const element = contentHook({
            root: contentRoot,
            settingsRoot: settingsPanel,
            name,
            windowElement: win,
        })
        if (element) contentRoot.appendChild(element)
    }

    // Window instance API
    const instance = {
        name,
        type,
        element: win,
        contentRoot,
        settingsRoot: settingsPanel,
        bringToFront: () => bringToFront(win),
        close: () => win.remove(),
        showSettings: () => {
            hideAllSettings()
            settingsPanel.style.display = "block"
        },
        hideSettings: () => {
            settingsPanel.style.display = "none"
        },
        moveTo: (x, y) => {
            win.style.left = x + "px"
            win.style.top = y + "px"
        },
        resizeTo: (w, h) => {
            win.style.width = w + "px"
            win.style.height = h + "px"
        },
    }

    return instance
}

// ============================================================================
// =======================  CREATE WINDOW BUTTON ===============================
// ============================================================================

const createButtonCss = css`
    background: #333;
    color: white;
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    &:hover > .menu {
        display: block;
    }
`

const menuCss = css`
    display: none;
    position: absolute;
    top: 30px;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    width: 140px;
    z-index: 9999;
`

const menuItemCss = css`
    padding: 6px 8px;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`

function createFloatingCreateButton(onSelect) {
    const menu = createEl(
        "div",
        {
            className: "menu " + menuCss,
        },
        [
            createEl("div", {
                className: menuItemCss,
                textContent: "New 2D Window",
                onclick: () => onSelect("2d"),
            }),
            createEl("div", {
                className: menuItemCss,
                textContent: "New 3D Window",
                onclick: () => onSelect("3d"),
            }),
            createEl("div", {
                className: menuItemCss,
                textContent: "New AttrList Window",
                onclick: () => onSelect("attr"),
            }),
        ]
    )

    const btn = createEl(
        "div",
        {
            className: createButtonCss,
            textContent: "Create Window",
        },
        [menu]
    )

    return btn
}

// ============================================================================
// =======================  CREATE WINDOWING SYSTEM ===========================
// ============================================================================

export function createWindowingSystem(options = {}) {
    const gridSize = options.gridSize || 10

    // Desktop container
    const desktop = createEl("div", {
        style: {
            position: "fixed",
            left: "0px",
            top: "0px",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
        },
    })

    // Track windows
    const windows = []

    // Hooks container
    const hooks = {
        "2d": options.create2DWindow || (() => null),
        "3d": options.create3DWindow || (() => null),
        attr: options.createAttrListWindow || (() => null),
    }

    // Bring window to front
    function bringToFront(winEl) {
        const z = getHighestZIndex(desktop) + 1
        winEl.style.zIndex = z
        // Hide other settings panels
        hideAllSettings()
    }

    // Hide all settings panels
    function hideAllSettings() {
        windows.forEach((w) => (w.settingsRoot.style.display = "none"))
    }

    // Create a new window programmatically
    function createWindowOfType(type) {
        const name = generateName()
        const instance = createWindow({
            name,
            type,
            gridSize,
            desktop,
            bringToFront,
            hideAllSettings,
            hooks,
        })
        windows.push(instance)
        instance.bringToFront()
        return instance
    }

    // Floating button
    const createButton = createFloatingCreateButton((type) => {
        createWindowOfType(type)
    })

    // Public manager API
    const manager = {
        listWindows: () => [...windows],
        createWindow: ({ type }) => createWindowOfType(type),
        bringToFront: (winInstance) => bringToFront(winInstance.element),
        closeWindow: (winInstance) => {
            const idx = windows.indexOf(winInstance)
            if (idx >= 0) windows.splice(idx, 1)
            winInstance.close()
        },
        getWindowByName: (name) => windows.find((w) => w.name === name),
        setGridSize: (n) => {
            /* ⚠️ Potential Issue: Windows won't refresh automatically */
        },
    }

    return {
        createButton,
        desktop,
        manager,
    }
}

// ============================================================================
// ======================= END OF IMPLEMENTATION ===============================
// ============================================================================
