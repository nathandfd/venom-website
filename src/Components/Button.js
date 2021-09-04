import './Button.scss'
import {gsap} from "gsap";

export const Button = ({onClick, text, cursorRef})=>{
    const handleMouseEnter = ()=>{
        gsap.to(cursorRef.current.children,{
            paddingRight: 14,
            paddingLeft: 14,
            marginLeft:-10,
            duration: .5,
            width:50
        })
    }
    const handleMouseLeave = ()=>{
        gsap.to(cursorRef.current.children,{
            paddingRight: 0,
            paddingLeft: 0,
            marginLeft:0,
            duration: .5,
            width:32
        })
    }

    return(
        <>
            <button
                className={"desktopButton"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={()=>{onClick(true)}}
            >
                {text}
            </button>
        </>
    )
}

export const MobileButton = ({onClick, text})=>{
    return(
        <>
            <button
                className={"mobileButton"}
                onClick={()=>{onClick(true)}}
            >
                {text}
            </button>
        </>
    )
}