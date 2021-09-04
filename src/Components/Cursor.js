import './Cursor.scss'

import {useEffect, useRef} from "react";

export const Cursor = ({cursorRef})=>{
    const cursor = useRef()

    useEffect(()=>{
        const mousemoveHandler = (e) => {
            cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
        }

        document.addEventListener('mousemove', mousemoveHandler, {passive: true, capture: true})

        return () => {
            document.removeEventListener("mousemove", mousemoveHandler)
        }
    },[])

    return(
        <div ref={cursor} className={"cursor-container"}>
            <div id="cursor-point"></div>
            <div ref={cursorRef} id="cursor-follower">
                <div className="hexagon"></div>
                <div className="hexagon"></div>
                <div className="hexagon"></div>
            </div>
        </div>
    )
}