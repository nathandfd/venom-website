import './Link.css'
import {gsap} from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const NavLink = (props)=>{

    const desktopOnClick = ()=>{gsap.to(window, {duration: 1, scrollTo:props.scrollToAnchor})}
    // const desktopOnClick = ()=>{}
    const mobileOnClick = ()=>{props.closeFunction(); gsap.to(window, {duration: 1, scrollTo:props.scrollToAnchor})}

    return(
        <>
            {
                props.setHover?
                    <a
                        onMouseEnter={()=>{props.setHover(true)}}
                        onMouseLeave={()=>{props.setHover(false)}}
                        onClick={desktopOnClick}
                    >
                        {props.text}
                    </a>
                    :
                    <a
                        onClick={mobileOnClick}
                    >
                        {props.text}
                    </a>
            }
        </>
    )
}