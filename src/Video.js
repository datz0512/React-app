import { forwardRef, useImperativeHandle, useRef } from 'react'
import video1 from './videos/clip1.mp4'

function Video(props, ref){
    console.log(props);
    console.log(ref);
    const videoRef = useRef()

    useImperativeHandle(ref, () => ({
        play(){
            videoRef.current.play()
        },
        pause(){
            videoRef.current.pause()
        }
    }))

    return (
        <video 
            ref={videoRef}
            src={video1}
            width={300}
        />
    )
}

export default forwardRef(Video)