import { useEffect, useState } from "react"

function Counter({ test = "Eleon Mask shit😙" }: { test?: string }) {
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        console.log(test, counter)
    }, [test, counter])
    return (
        <>
            <h1 className="counter-head">{test}</h1>
            <div className="container">
                <button
                    type="button"
                    onClick={() => setCounter((count) => count + 1)}
                    className="button add"
                >
                    +
                </button>
                <div>{counter}</div>
                <button
                    type="button"
                    onClick={() => setCounter((count) => count - 1)}
                    className="button subs"
                >
                    -
                </button>
            </div>
            <style jsx>{`
                .counter-head {
                    font-size: 2.5rem;
                    font-weight: 900;
                }
                .container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 0.25rem;
                }
                .button {
                    all: unset;
                    padding: 0.25rem;
                    borde-radius: 5px;
                    margin: 1rem;
                    color: white;
                    font-size: 1.25rem;
                    font-weight: 900;
                }
                .add {
                    background-color: tomato;
                }
                .subs {
                    background-color: skyblue;
                }
            `}</style>
        </>
    )
}

export default Counter
