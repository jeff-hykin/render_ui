export const renderUiConnectionKey = Symbol.for("renderUiConnectionCore")
globalThis[renderUiConnectionKey] = globalThis[renderUiConnectionKey] || {}
globalThis[renderUiConnectionKey].connections = globalThis[renderUiConnectionKey].connections || {}