import { useState, useCallback, useMemo, useRef, useReducer, useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Content from './Content.js'
import TodoApp from './Todo'
import { ThemeContext } from './ThemeContext'
import './App.scss'
import Video from './Video.js'
import Heading from './components/Heading'
import Paragraph from './components/Paragraph'
import GlobalStyles from './components/GlobalStyles'
import Button from './components/Button/index.js'
import NavBar from './components/NavBar/NavBar.js'
import HomePage from './pages/Home'
import ContactPage from './pages/Contact'
import NewsPage from './pages/News'

function App() {
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(0)
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

    const initState = 0

    const UP_ACTION = 'up'
    const DOWN_ACTION = 'down'

    const reducer = (state, action) => {
        switch(action){
            case UP_ACTION:
                return state + 1
            case DOWN_ACTION:
                return state - 1
            default:
                throw new Error('Invalid action')
        }
    }

    const [count1, dispatch] = useReducer(reducer, initState)
    const context = useContext(ThemeContext)
    
    const videoRef = useRef()

    useEffect(()=> {
        console.log(videoRef.current);
    })

    const handlePlay = () => {
        videoRef.current.play()
    }
    const handlePause  = () => {
        videoRef.current.pause()
    }

    return(
        <GlobalStyles>
            <div className='App' style={{padding:20}}>
                <NavBar />
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/news' element={<NewsPage/>}/>
                    <Route path='/contact' element={<ContactPage/>}/>
                </Routes>
                <Heading />
                <Paragraph />
                <Button />
                <Button primary/>
                <Button secondary/>
                <br/>
                <Video ref={videoRef}/> 
                <button onClick={handlePlay}>Play</button>
                <button onClick={handlePause}>Pause </button>
                <TodoApp/>
                <br/>
                <h1>{count1}</h1>
                <button 
                    onClick={() => dispatch(DOWN_ACTION)}
                >
                    Down
                </button>
                <button 
                    onClick={() => dispatch(UP_ACTION)}
                >
                    Up
                </button>
                <br/>
                <br/>
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
                {show && 
                    <>
                        <button onClick={context.toggleTheme}>Toggle Theme</button>
                        &ensp;
                        {context.theme}
                        <Content onIncrease={handleIncrease}/>
                    </>
                }
            </div>
        </GlobalStyles>
    ) 
}

export default App;


