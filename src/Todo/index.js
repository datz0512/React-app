import { useRef, useReducer } from 'react'
import reducerTodo ,{ initStateTodo } from './reducer'
import { addJob, setJob, deleteJob } from './actions'

function App() {
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
        </div>   
    )
}

export default App;