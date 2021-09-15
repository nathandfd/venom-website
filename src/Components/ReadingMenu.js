import './ReadingMenu.scss'
import {useEffect} from "react";
import {gsap} from 'gsap'

export const ReadingMenu = ({cursorRef, visibility, text, setVisibility})=>{
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

    useEffect(()=>{
        if(visibility){
            gsap.set('html',{overflow: 'hidden'})
            gsap.set('.reading-menu-container', {display:'block'})
            gsap.to('.reading-menu',{bottom:'0%', ease:'power4', duration:1})
            gsap.to('.reading-menu-container', {backgroundColor: 'rgba(0,0,0,.6)', duration: .7})

            if (document.getElementById("contactForm")){
                const sendButton = document.getElementById("send-form")

                sendButton.addEventListener('click',(e)=>{
                    e.preventDefault()
                    const headers = new Headers()
                    const formData = new FormData(document.getElementById("contactForm"))
                    const formMessage = document.getElementById("form-message")
                    const myInit = {
                        method: 'POST',
                        headers:headers,
                        mode: 'cors',
                        cache: 'default',
                        body: formData
                    };

                    sendButton.value = "Envoi en cours..."

                    fetch('send_mail.php',myInit)
                        .then(resp=>resp.json())
                        .then((data)=>{
                            if (data){
                                formMessage.innerHTML = "Votre message à bien été envoyé ! Venom vous répondra d'ici peu"
                            }
                            else{
                                formMessage.innerHTML = "Aïe, quelque chose s'est mal passé. Veuillez recommencer"
                            }
                            sendButton.value = "Envoyer"
                            document.getElementById("contactForm").reset()
                        })
                        .catch(()=>{
                            formMessage.innerHTML = "Erreur réseau"
                            sendButton.value = "Envoyer"
                            document.getElementById("contactForm").reset()
                        })
                })
            }
        }
        else{
            gsap.set('html',{overflow: 'auto'})
            gsap.to('.reading-menu',{bottom:'-100%', ease:'power4', duration:1})
            gsap.to('.reading-menu-container', {backgroundColor: 'rgba(0,0,0,0)', duration: .7})
            gsap.set('.reading-menu-container', {display:'none', delay:.3})
        }
    },[visibility])
    return(
            <div className="reading-menu-container">
                <div className={"reading-menu"}>
                    <div className={"close"} onClick={()=>{setVisibility(false)}} onMouseEnter={cursorRef?()=>{handleMouseEnter()}:null} onMouseLeave={cursorRef?()=>{handleMouseLeave()}:null}>
                        <svg viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
                            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                            <linearGradient id="lgrad" x1="50%" y1="0%" x2="50%" y2="100%" >

                                <stop offset="0%" style={{stopColor:"rgb(129,0,0)",stopOpacity:1.00}} />
                                <stop offset="100%" style={{stopColor:"rgb(114,1,163)",stopOpacity:1.00}} />

                            </linearGradient>
                        </svg>
                    </div>
                    <div className={"reading-menu-body"}>
                        <h1>{text.title}</h1>
                        {text.text}
                    </div>
                </div>
            </div>
    )
}