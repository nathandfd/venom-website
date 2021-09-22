import './Mobile.scss'

import {MobileButton} from "./Components/Button";
import {ReadingMenu} from "./Components/ReadingMenu";
import {useEffect, useRef, useState} from "react";
import {MobileNavbar} from "./Components/MobileNavbar";
import {VenomChibi} from "./Components/VenomChibi";
import {gsap} from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin)

const section1H1 = CSSRulePlugin.getRule('.Mobile .section1 h1:before')
const section2H1 = CSSRulePlugin.getRule('.Mobile .section2 h1:before')
const section3H1 = CSSRulePlugin.getRule('.Mobile .section3 h1:before')
const section4H1 = CSSRulePlugin.getRule('.Mobile .section4 h1:before')

const timeline = gsap.timeline({
    scrollTrigger:{
        trigger:'.header',
        start: "top top",
        end: "bottom top",
        scrub: true,
    }
})

export const Mobile = ({completeText})=>{

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
                    start: "top center"
                },
                cssRule:{
                    width:"95%"
                },
                duration: 0.7
            })
    }, [])

    return(
        <div className="Mobile" style={{'backgroundColor':'#121212'}}>
            <MobileNavbar/>
            <div className="header">
                <div className="background">
                    <div className="background1">
                        <h1>
                            Est-ce que nous ressemblons à des "super-héros" ? Nous sommes des professionnels.
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
                <div className={"centering-div"}>
                    <div className="floating-text floating-left">
                        <h1 className={"sectionTitle"}>Présentation</h1>
                        {/*<img src="/office.jpg" alt=""/>*/}
                        <video controls={true} src="/video-presentation.mp4"></video>
                        <p>VENOM est un réseau de distribution commercial qui est présent sur des marchés porteurs tels que la fourniture d’énergie, l’assurance ou encore la presse. Nous proposons par l’intermédiaire de nos forces de vente les offres les plus compétitives du marché actuel.</p>
                        <MobileButton text={"Découvrir"} onClick={()=>{setMenuVisibility('presentation')}} />
                    </div>
                </div>
            </div>
            <div id={"partenaire"} className="section section2">
                <div className="centering-div">
                    <div className="floating-text floating-right">
                        <h1 className={"sectionTitle"}>Partenaire</h1>
                        <img src="/partenaire.png" alt=""/>
                        <p>VENOM est partenaire d’ENGIE, fournisseur historique de gaz. Notre seule volonté est de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. C’est pourquoi nous mobilisons nos forces de vente afin de promouvoir les offres d’ENGIE.</p>
                        <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('partenaire')}} />
                    </div>
                </div>
            </div>
            <div id={"knowledges"} className="section section3">
                <div className="centering-div">
                    <div className="floating-text floating-left">
                        <h1 className={"sectionTitle"}>Savoir-faire</h1>
                        <img src="/knowledges.jpg" alt=""/>
                        <p>VENOM est partenaire d’ENGIE, fournisseur historique de gaz. Notre seule volonté est de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. C’est pourquoi nous mobilisons nos forces de vente afin de promouvoir les offres d’ENGIE.</p>
                        <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('knowledges')}} />
                    </div>
                </div>
            </div>
            <div id={"recrutement"} className="section section4">
                <div className="centering-div">
                    <div className="floating-text floating-right">
                        <h1 className={"sectionTitle"}>Nous recrutons !</h1>
                        <img src="/recrutement.jpg" alt=""/>
                        <p>Venom recrute à travers toute la France pour mener à bien ses objectifs. Conseillers Commerciaux, Managers Commerciaux ou encore Directeurs d’agences, nous recherchons nos futurs collaborateurs.Vous pensez avoir l’âme d’un super-héros de la vente ?<br/> Lancez-vous et rejoignez l’un de nos services : commercial ou back-office.</p>
                        <div className={"double-button"}>
                            <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('recrutement')}} />
                            <MobileButton text={"Nous rejoindre"} onClick={()=>{setMenuVisibility('contact')}} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"footer"}>
                <p>© Copyright 2021 Venom. All rights reserved.</p>
                <p onClick={()=>{setMenuVisibility('legalNotices')}}>Mentions légales</p>
            </div>
            <ReadingMenu text={completeText[sectionText]} visibility={menuVisibility} setVisibility={setVisibility}/>
        </div>
    )
}