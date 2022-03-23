import { useState, useCallback, useMemo, useRef } from 'react'
import Content from './Content.js'

function App() {
    const [show, setShow] = useState(false)
    const [count , setCount] = useState(0)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [products, setProducts] = useState([])

    const handleIncrease = useCallback(() => {
        setCount(prevCount => prevCount + 1)
    }, [])

    const nameRef = useRef()

    const handleSubmit = () => {
        setProducts([...products, {
            name,
            price: +price
        }])
        setName('')
        setPrice('')

        nameRef.current.focus()
    }

    const total = useMemo(() => {
        const result = products.reduce((result, prod) => {
            console.log("Tinh toan lai");
            return result + prod.price  
        }, 0)
        return result
    }, [products])

    return(
        <div className='App' style={{padding:20}}>
            <input
                ref={nameRef}
                value={name}
                placeholder="Enter name..."
                onChange={e => setName(e.target.value)}
            />
            <br />
            <input
                value={price}
                placeholder="Enter price..."
                onChange={e => setPrice(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Add</button>
            <br />
            Total: {total}
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product.name} - {product.price}</li>
                ))}
            </ul>

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


