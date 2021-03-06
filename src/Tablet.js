import './Tablet.scss'

import {MobileButton} from "./Components/Button";
import {ReadingMenu} from "./Components/ReadingMenu";
import {useEffect, useRef, useState} from "react";
import {MobileNavbar} from "./Components/MobileNavbar";
import {VenomChibi} from "./Components/VenomChibi";
import {gsap} from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin)

const section1H1 = CSSRulePlugin.getRule('.Tablet .section1 h1:before')
const section2H1 = CSSRulePlugin.getRule('.Tablet .section2 h1:before')
const section3H1 = CSSRulePlugin.getRule('.Tablet .section3 h1:before')
const section4H1 = CSSRulePlugin.getRule('.Tablet .section4 h1:before')

const timeline = gsap.timeline({
    scrollTrigger:{
        trigger:'.header',
        start: "top top",
        end: "bottom top",
        scrub: true,
    }
})

export const Tablet = ({completeText})=>{

    const [menuVisibility, setVisibility] = useState(false)
    const [sectionText, setSectionText] = useState("presentation")
    const [isChibiLoaded, setChibiLoaded] = useState(false)

    const setMenuVisibility = (sectionText)=>{
        setSectionText(sectionText)
        setVisibility(true)
    }

    const venomChibi = useRef()

    useEffect(()=>{
        if (isChibiLoaded){
            timeline.fromTo(venomChibi.current.rotation, {
                y: -0.1
            },
            {
                y: 0.4
            })

            timeline.fromTo(venomChibi.current.rotation, {
                    x: 0.1
                },
                {
                    x: -0.4
                }, '<')

            timeline.fromTo(venomChibi.current.position, {
                    y: 0
                },
                {
                    y: 0.2
                }, '<')
        }
    }, [isChibiLoaded])

    useEffect(()=>{
        gsap.fromTo(section1H1, {
            cssRule:{
                width:"0%"
            }
        },
        {
            scrollTrigger:{
                trigger: ".section1",
                start: "top center"
            },
            cssRule:{
                width:"95%"
            },
            duration: 0.7
        })

        gsap.fromTo(section2H1, {
                cssRule:{
                    width:"0%"
                }
            },
            {
                scrollTrigger:{
                    trigger: ".section2",
                    start: "top center"
                },
                cssRule:{
                    width:"95%"
                },
                duration: 0.7
            })

        gsap.fromTo(section3H1, {
                cssRule:{
                    width:"0%"
                }
            },
            {
                scrollTrigger:{
                    trigger: ".section3",
                    start: "top center"
                },
                cssRule:{
                    width:"95%"
                },
                duration: 0.7
            })

        gsap.fromTo(section4H1, {
                cssRule:{
                    width:"0%"
                }
            },
            {
                scrollTrigger:{
                    trigger: ".section4",
                    start: "center bottom"
                },
                cssRule:{
                    width:"95%"
                },
                duration: 0.7
            })
    }, [])

    return(
        <div className="Tablet" style={{'backgroundColor':'#121212'}}>
            <MobileNavbar/>
            <div className="header">
                <div className="background">
                    <div className="background1">
                        <h1>
                            Do we look like ???super-heroes????<br/>We???re the professionals.
                        </h1>
                    </div>
                    <div className="background2"></div>
                </div>
                <div className={"scroll-down"}>
                    <p>Descend pour en savoir plus</p>
                    <div className="chevron">
                        <div className="vector"></div>
                    </div>
                </div>
                <VenomChibi setChibiLoaded={setChibiLoaded} SceneRef={venomChibi} />
            </div>
            <div id={"presentation"} className="section section1">
                <div className={"img-container"}>
                    <video controls={true} src="/video-presentation.mp4"></video>
                </div>
                <div className={"text-container"}>
                    <h1 className={"sectionTitle"}>Pr??sentation</h1>
                    <p>VENOM est un r??seau de distribution commercial qui est pr??sent sur des march??s porteurs tels que la fourniture d?????nergie, l???assurance ou encore la presse. Nous proposons par l???interm??diaire de nos forces de vente les offres les plus comp??titives du march?? actuel.</p>
                    <MobileButton text={"D??couvrir"} onClick={()=>{setMenuVisibility('presentation')}} />
                </div>
            </div>
            <div id={"partenaire"} className="section section2">
                <div className={"text-container"}>
                    <h1 className={"sectionTitle"}>Partenaire</h1>
                    <p>VENOM est partenaire d???ENGIE, fournisseur historique de gaz. Notre seule volont?? est de permettre aux consommateurs d???avoir acc??s ?? une ??nergie de qualit?? ?? un tarif abordable. C???est pourquoi nous mobilisons nos forces de vente afin de promouvoir les offres d???ENGIE.</p>
                    <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('partenaire')}} />
                </div>
                <div className={"img-container"}>
                    <img src="/partenaire.jpg" alt=""/>
                </div>
            </div>
            <div id={"knowledges"} className="section section3">
                <div className={"img-container"}>
                    <img src="/knowledges.jpg" alt=""/>
                </div>
                <div className={"text-container"}>
                    <h1 className={"sectionTitle"}>Savoir-faire</h1>
                    <p>
                        La qualit?? de l'offre Venom repose sur la combinaison de plusieurs services : administratif, qualit??, ressources humaines et communication. Chacun d'entre eux participe au bon fonctionnement de notre soci??t??, le suivi de nos forces de vente et la satisfaction de nos clients.
                    </p>
                    <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('knowledges')}} />
                </div>
            </div>
            <div id={"recrutement"} className="section section4">
                <div className={"text-container"}>
                    <h1 className={"sectionTitle"}>Nous recrutons !</h1>
                    <p>Venom recrute ?? travers toute la France pour mener ?? bien ses objectifs. Conseillers Commerciaux, Managers Commerciaux ou encore Directeurs d???agences, nous recherchons nos futurs collaborateurs.Vous pensez avoir l?????me d???un super-h??ros de la vente ?<br/> Lancez-vous et rejoignez l???un de nos services : commercial ou back-office.</p>
                    <div className={"double-button"}>
                        <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('recrutement')}} />
                        <MobileButton text={"Nous rejoindre"} onClick={()=>{setMenuVisibility('contact')}} />
                    </div>
                </div>
                <div className={"img-container"}>
                    <img src="/recrutement.jpg" alt=""/>
                </div>
            </div>
            <div className={"footer"}>
                <p>?? Copyright 2021 Venom. All rights reserved.</p>
                <p onClick={()=>{setMenuVisibility('legalNotices')}}>Mentions l??gales</p>
            </div>
            <ReadingMenu text={completeText[sectionText]} visibility={menuVisibility} setVisibility={setVisibility}/>
        </div>
    )
}