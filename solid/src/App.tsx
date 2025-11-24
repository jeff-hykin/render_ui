/** @jsx h */
import { createSignal, h } from "./tools/solid.js"
import { HelloWorld } from "./components/HelloWorld.tsx"
import { Panels } from "./components/Panels.tsx"

export default function App() {
    const [count, setCount] = createSignal(0)

    const increment = () => {
        console.log(`incrementing`)
        return setCount(count() + 1)
    }
    const decrement = () => setCount(count() - 1)
    const reset = () => setCount(0)
    
    console.log(`here`)
    
    return (
        <div style={{ textAlign: "center", "margin-top": "2rem" }}>
            <h1>Solid.js Counter</h1>
            <h2>Count: {count}</h2>
            <button onClick={decrement}>-</button>
            <button onClick={reset} style={{ margin: "0 1rem" }}>
                Reset
            </button>
            <button onClick={increment}>+</button>
            <Panels style={{ "min-height": "10rem" }} />
        </div>
    )
}