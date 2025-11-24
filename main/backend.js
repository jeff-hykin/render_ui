import { relayMessages } from "./backendApi.js"

relayMessages({
    port: 8000,
    address: "0.0.0.0",
    title: "Render UI",
})