import { useState, useCallback } from 'react'
import Content from './Content.js'

function App() {
    const [show, setShow] = useState(false)
    const [count , setCount] = useState(0)

    const handleIncrease = useCallback(() => {
        setCount(prevCount => prevCount + 1)
    }, [])

    return(
        <div className='App' style={{padding:20}}>
            <button
                onClick={() => setShow(!show)}
            >
                Show/Hide
            </button>
            <h1>{count}</h1>
            {show && <Content onIncrease={handleIncrease}/>}
        </div>
    ) 
}

export default App;


