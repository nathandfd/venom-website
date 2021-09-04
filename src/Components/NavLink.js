import './Link.css'
import {gsap} from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const NavLink = ({cursorRef, text, scrollToAnchor, closeFunction})=>{

    const desktopOnClick = ()=>{gsap.to(window, {duration: 1, scrollTo:scrollToAnchor})}
    // const desktopOnClick = ()=>{}
    const mobileOnClick = ()=>{closeFunction(); gsap.to(window, {duration: 1, scrollTo:scrollToAnchor})}

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
            {
                cursorRef.current?
                    <a
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={desktopOnClick}
                    >
                        {text}
                    </a>
                    :
                    <a
                        onClick={mobileOnClick}
                    >
                        {text}
                    </a>
            }
        </>
    )
}