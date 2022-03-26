import { useState, useCallback, useMemo, useRef, useReducer } from 'react'
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

    const initStateTodo = {
        job: '',
        jobs: []
    }

    const SET_JOB = 'set_job'
    const ADD_JOB = 'add_job'
    const DELETE_JOB = 'delete_job'

    const setJob = payload => {
        return {
            type: SET_JOB,
            payload
        }
    }

    const addJob = payload => {
        return {
            type: ADD_JOB,
            payload
        }
    }

    const deleteJob = payload => {
        return {
            type: DELETE_JOB,
            payload
        }
    }

    const reducerTodo = (state, action) => {
        switch(action.type){
            case SET_JOB:
                return {
                    ...state,
                    job: action.payload
                }
            
            case ADD_JOB:
                return {
                    ...state,
                    jobs: [...state.jobs, action.payload]
                }
            case DELETE_JOB:
                const newJobs = [...state.jobs]
                newJobs.splice(action.payload, 1)
                return {
                    ...state,
                    jobs: newJobs
                }
            default:
                throw new Error('Invalid action')
        }  
    }

    const [state, dispatchTodo] = useReducer(reducerTodo, initStateTodo)
    const { job, jobs } = state

    const inputRef = useRef()

    const handleSubmitTodo = () => {
        dispatchTodo(addJob(job)) 
        dispatchTodo(setJob(''))  
        inputRef.current.focus()     
    }

    return(
        <div className='App' style={{padding:20}}>
            <h3>TODO</h3>
            <input 
                ref={inputRef}
                value={job}
                placeholder='Enter todos...'
                onChange={e => {
                    dispatchTodo(setJob(e.target.value))
                }}
            />
            <button
                onClick={handleSubmitTodo}
            >
                Add
            </button>
            <ul style={{listStyleType: "none"}}>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {index+1}
                        <span>.&#160;</span> 
                        {job} &#160;
                        <span onClick={() => dispatchTodo(deleteJob(index))}>
                            &times;
                        </span>
                    </li>
                ))}
            </ul>

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


