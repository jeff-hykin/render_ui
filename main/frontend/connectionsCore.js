export const renderUiConnectionKey = Symbol.for("renderUiConnectionCore")
globalThis[renderUiConnectionKey] = {
    connections: {},
}