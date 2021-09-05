import './MobileNavbar.scss'
import {NavLink} from "./NavLink";
import {useRef} from "react";
import {gsap} from "gsap";

const html = document.getElementsByTagName('html')[0]

export const MobileNavbar = ()=>{

    const menu = useRef()

    const closeMenu = ()=>{
        html.style.overflow = "auto"
        gsap.to(menu.current, {
            xPercent: 0,
            duration: .3
        })
        gsap.set(menu.current, {display:"none", delay:.3})
    }

    const openMenu = ()=>{
        html.style.overflow = "hidden"
        gsap.set(menu.current, {display:"flex"})
        gsap.to(menu.current, {
            xPercent: -100,
            duration: .3
        })
    }

    return(
        <div className={"MobileNavbar"}>
            <div className={"navbar"}>
                <img src="/venom-logo.png" alt=""/>
                <div className={"openButton"} onClick={openMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className="menu" ref={menu}>
                <div className="blurred-background"></div>
                <div className={"close"} onClick={closeMenu}>
                    <svg height="329pt" viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg">
                        <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                    </svg>
                </div>
                <img src="/venom-logo.png" alt=""/>
                <ul>
                    <li><NavLink closeFunction={closeMenu} scrollToAnchor={"#presentation"} text={"Présentation"} /></li>
                    <li><NavLink closeFunction={closeMenu} scrollToAnchor={"#partenaire"} text={"Partenaire"} /></li>
                    <li><NavLink closeFunction={closeMenu} scrollToAnchor={"#recrutement"} text={"Recrutement"} /></li>
                    <li><NavLink closeFunction={closeMenu} scrollToAnchor={"#recrutement"} text={"Contact"} /></li>
                </ul>
            </div>
        </div>
    )
}