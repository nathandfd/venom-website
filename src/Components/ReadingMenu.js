import './ReadingMenu.css'
import {useEffect} from "react";
import {gsap} from 'gsap'

export const ReadingMenu = (props)=>{
    useEffect(()=>{
        if(props.visibility){
            gsap.to('.reading-menu',{bottom:'0%', ease:'power4', duration:1})
        }
        else{
            gsap.to('.reading-menu',{bottom:'-100%', ease:'power4', duration:1})
        }
    },[props.visibility])
    return(
        <div className={"reading-menu"}>
            <div className={"close"} onClick={()=>{props.setVisibility(false)}} onMouseEnter={props.onHover?()=>{props.onHover(true)}:null} onMouseLeave={props.onHover?()=>{props.onHover(false)}:null}>
                <svg viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                    <linearGradient id="lgrad" x1="50%" y1="0%" x2="50%" y2="100%" >

                        <stop offset="0%" style={{stopColor:"rgb(129,0,0)",stopOpacity:1.00}} />
                        <stop offset="100%" style={{stopColor:"rgb(114,1,163)",stopOpacity:1.00}} />

                    </linearGradient>
                </svg>
            </div>
            <h1>{props.text.title}</h1>
            <p>{props.text.text}</p>
        </div>
    )
}