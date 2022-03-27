import { useEffect, useState, useLayoutEffect, useRef, memo } from 'react'
import Paragraph from './Paragraph'

const tabs = ['posts', 'comments', 'albums']
const lessons = [
    {
        id: 1,
        name: 'ReactJS la gi va tai sao nen hoc'
    },
    {
        id: 2,
        name: 'SPA/MPA la gi'
    },
    {
        id: 3,
        name: 'Arrow function'
    }
]

function Content({ onIncrease }) {
    // console.log('re-render');
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const [showGoToTop, setShowGoToTop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [countdown, setCountdown] =  useState(180)
    const [avatar, setAvatar] = useState()
    const [lessonId, setLessonId] = useState(1)
    const [countUp, setCountUp] = useState(0)
    const [count, setCount] = useState(60)

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown(prevState => prevState - 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts);
            })
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            setShowGoToTop(window.scrollY >= 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)    
        }
    }, [])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)

    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview )
        }
    }, [avatar])

    useEffect(() => {
        const handleComment = ({detail}) => {
             console.log(detail);
        }
        window.addEventListener(`lesson-${lessonId}`, handleComment)
        
        return () => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
        }
    }, [lessonId])

    useLayoutEffect(() => {
        if(countUp > 3){
            setCountUp(0)
        }
    }, [countUp])

    const handleRun = () => {
        setCountUp(countUp + 1)
    }

    let timeId = useRef()

    const handleStart = () => {
        timeId.current = setInterval(() => {
            setCount(prevCount => prevCount - 1)
        }, 1000)
    }

    const handleStop = () => {
        clearInterval(timeId.current)
    }

    return (
        <div>
            <Paragraph />
            <button onClick={onIncrease}>Click me!</button>
            <h1>{count}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <h1>{countUp}</h1>
            <button onClick={handleRun}>UP</button>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key={lesson.id}
                        style={{
                            color:lessonId === lesson.id ?
                                'red' :
                                '#333',
                            cursor: 'pointer'
                        }}
                        onClick={() => setLessonId(lesson.id)}
                    >
                        {lesson.name}
                    </li>
                ))}
            </ul>
            <input 
                type='file'
                onChange={handlePreviewAvatar}
            />
            {avatar && (
                <img 
                    src={avatar.preview} 
                    alt=''
                    width='50%' 
                />
            )}
            <h1>{countdown}</h1>
            <h1>{width}</h1>
            {tabs.map(tab => (
                <button 
                    key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        backgroundColor: '#333'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}
            <input 
                value={title}
                onChange = {e => setTitle(e.target.value)}
            />
            {posts.map(post => (
                <li key={post.id}>{post.title || post.name}</li>
            ))}
            {showGoToTop && (
                <button
                    style={{
                        position: 'fixed',
                        right:       20,
                        bottom: 20 
                    }}
                >
                    Go to top
                </button>
            )}
        </div>
        
    )
}

export default memo(Content)