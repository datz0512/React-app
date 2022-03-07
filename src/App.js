import { useState } from 'react'
import Content from './Content.js'

function App() {
    const [show, setShow] = useState(false)

    return(
        <div className='App' style={{padding:20}}>
            <button
                onClick={() => setShow(!show)}
            >
                Show/Hide
            </button>

            {show && <Content />}
        </div>
    ) 
}

export default App;


