import {useEffect, useState} from 'react'

const tabs = ['posts', 'comments', 'albums']

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const [showGoToTop, setShowGoToTop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [countdown, setCountdown] = useState(180)
    const [avatar, setAvatar] = useState()

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

    return (
        <div>
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

export default Content