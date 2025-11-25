import { uniqueNamesGenerator, adjectives, animals, colors } from "https://esm.sh/unique-names-generator@4.7.1"
import { toCamelCase } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/to_camel_case.js'

// -------------------------------------------------------------
// clamp(value, min, max)    (used for resizing and boundaries)
// -------------------------------------------------------------
export function clamp(v, min, max) {
    if (v < min) return min
    if (v > max) return max
    return v
}

// -------------------------------------------------------------
// snapToGrid(x, y, gridSize)
// -------------------------------------------------------------
export function snapToGrid(x, y, gridSize = 10) {
    return {
        x: Math.round(x / gridSize) * gridSize,
        y: Math.round(y / gridSize) * gridSize,
    }
}

// -------------------------------------------------------------
// getHighestZIndex(parent)
// -------------------------------------------------------------
export function getHighestZIndex(parent) {
    let max = 0
    for (const child of parent.children) {
        const z = parseInt(window.getComputedStyle(child).zIndex || "0", 10)
        if (z > max) max = z
    }
    return max
}

// -------------------------------------------------------------
// generateName()
// -------------------------------------------------------------
export function generateName() {
    return toCamelCase(uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: "-",
        length: 3,
    }))
}

// -------------------------------------------------------------
// createEl(tag, props={}, children=[]) -- convenience
// -------------------------------------------------------------
export function createEl(tag, props = {}, children = []) {
    const el = document.createElement(tag)
    for (const [k, v] of Object.entries(props)) {
        if (k === "style") Object.assign(el.style, v)
        else if (k.startsWith("on") && typeof v === "function") {
            el.addEventListener(k.substring(2).toLowerCase(), v)
        } else {
            el[k] = v
        }
    }
    for (const child of children) {
        if (child instanceof Node) el.appendChild(child)
        else if (child != null) el.appendChild(document.createTextNode(child))
    }
    return el
}

// ============================================================================
// ===================== DRAGGABLE BEHAVIOR  ==================================
// ============================================================================

export function makeDraggable(windowEl, handleEl, onEnd = () => {}) {
    let offsetX = 0
    let offsetY = 0
    let dragging = false

    handleEl.style.cursor = "move"

    const onPointerDown = (e) => {
        dragging = true
        windowEl.setPointerCapture(e.pointerId)
        const rect = windowEl.getBoundingClientRect()
        offsetX = e.clientX - rect.left
        offsetY = e.clientY - rect.top
    }

    const onPointerMove = (e) => {
        if (!dragging) return
        const newX = e.clientX - offsetX
        const newY = e.clientY - offsetY
        windowEl.style.left = newX + "px"
        windowEl.style.top = newY + "px"
    }

    const onPointerUp = (e) => {
        if (!dragging) return
        dragging = false
        windowEl.releasePointerCapture(e.pointerId)
        onEnd()
    }

    handleEl.addEventListener("pointerdown", onPointerDown)
    windowEl.addEventListener("pointermove", onPointerMove)
    windowEl.addEventListener("pointerup", onPointerUp)

    // ⚠️ Potential Issue:
    // If the pointer leaves the element too quickly, pointer capture helps, but
    // older browsers without pointer capture could misbehave. This prototype
    // assumes modern browser support.
}

// ============================================================================
// ===================== RESIZABLE BEHAVIOR  ==================================
// ============================================================================

export function makeResizable(windowEl, onEnd = () => {}) {
    const directions = ["nw", "ne", "sw", "se"]
    const handles = {}

    directions.forEach((dir) => {
        const handle = document.createElement("div")
        handle.className = resizeHandleCSS + " " + dir
        handles[dir] = handle
        windowEl.appendChild(handle)

        let dragging = false
        let startX, startY, startW, startH, startLeft, startTop

        handle.addEventListener("pointerdown", (e) => {
            dragging = true
            windowEl.setPointerCapture(e.pointerId)

            const rect = windowEl.getBoundingClientRect()
            startX = e.clientX
            startY = e.clientY
            startW = rect.width
            startH = rect.height
            startLeft = rect.left
            startTop = rect.top
        })

        const move = (e) => {
            if (!dragging) return
            let dx = e.clientX - startX
            let dy = e.clientY - startY

            let newLeft = startLeft
            let newTop = startTop
            let newWidth = startW
            let newHeight = startH

            // Resize logic
            if (dir.includes("e")) newWidth = startW + dx
            if (dir.includes("s")) newHeight = startH + dy
            if (dir.includes("w")) {
                newWidth = startW - dx
                newLeft = startLeft + dx
            }
            if (dir.includes("n")) {
                newHeight = startH - dy
                newTop = startTop + dy
            }

            // Minimums: titlebar height + minimal width
            const minWidth = 80
            const minHeight = 40

            if (newWidth >= minWidth) windowEl.style.width = `${newWidth}px`
            if (newHeight >= minHeight) windowEl.style.height = `${newHeight}px`

            windowEl.style.left = `${newLeft}px`
            windowEl.style.top = `${newTop}px`
        }

        const up = (e) => {
            if (!dragging) return
            dragging = false
            windowEl.releasePointerCapture(e.pointerId)
            onEnd()
        }

        windowEl.addEventListener("pointermove", move)
        windowEl.addEventListener("pointerup", up)
    })

    return handles
}