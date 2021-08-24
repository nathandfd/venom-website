import './Mobile.scss'

import {MobileButton} from "./Components/Button";
import {ReadingMenu} from "./Components/ReadingMenu";
import {useEffect, useRef, useState} from "react";
import {MobileNavbar} from "./Components/MobileNavbar";
import {Canvas} from "@react-three/fiber";
import {VenomChibi} from "./Components/VenomChibi";
import {gsap} from "gsap";

export const Mobile = ({completeText})=>{

    const [menuVisibility, setVisibility] = useState(false)
    const [sectionText, setSectionText] = useState("presentation")
    const [isChibiLoaded, setChibiLoaded] = useState(false)
    const timeline = gsap.timeline({
        scrollTrigger:{
            trigger:'.header',
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    })

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
                y: 0.1
            })

            timeline.fromTo(venomChibi.current.rotation, {
                    x: 0.1
                },
                {
                    x: -0.1
                }, '<')

            timeline.fromTo(venomChibi.current.position, {
                    y: -0.1
                },
                {
                    y: 0.1
                }, '<')
        }
    }, [isChibiLoaded])

    return(
        <div className="Mobile" style={{'backgroundColor':'#121212'}}>
            <MobileNavbar/>
            <div className="header">
                <div className="background">
                    <div className="background1">
                        <h1>
                            Rejoins l’aventure et deviens commercial chez Venom !
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
            <div className="section section1">
                <div className={"centering-div"}>
                    <div className="floating-text floating-left">
                        <h1 className={"sectionTitle"}>Présentation</h1>
                        <img src="/office.jpg" alt=""/>
                        <p>VENOM est un réseau de distribution commercial qui est présent sur des marchés porteurs tels que la fourniture d’énergie, l’assurance ou encore la presse. Nous proposons par l’intermédiaire de nos forces de vente les offres les plus compétitives du marché actuel.</p>
                        <MobileButton text={"Découvrir"} onClick={()=>{setMenuVisibility('presentation')}} />
                    </div>
                </div>
            </div>
            <div className="section section2">
                <div className="centering-div">
                    <div className="floating-text floating-right">
                        <h1 className={"sectionTitle"}>Partenaire</h1>
                        <img src="/buisness.jpg" alt=""/>
                        <p>VENOM est partenaire d’ENGIE, fournisseur historique de gaz. Notre seule volonté est de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. C’est pourquoi nous mobilisons nos forces de vente afin de promouvoir les offres d’ENGIE.</p>
                        <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('partenaire')}} />
                    </div>
                </div>
            </div>
            <div className="section section3">
                <div className="centering-div">
                    <div className="floating-text floating-left">
                        <h1 className={"sectionTitle"}>Recrutement</h1>
                        <img src="/capybara.jpg" alt=""/>
                        <p>Venom recrute à travers toute la France pour mener à bien ses objectifs. Conseillers Commerciaux, Managers Commerciaux ou encore Directeurs d’agences, nous recherchons nos futurs collaborateurs.Vous pensez avoir l’âme d’un super-héros de la vente ? Lancez-vous et rejoignez l’un de nos services : commercial ou back-office.</p>
                        <div className={"double-button"}>
                            <MobileButton text={"En savoir plus"} onClick={()=>{setMenuVisibility('recrutement')}} />
                            <MobileButton text={"Nous rejoindre"} onClick={()=>{setMenuVisibility('contact')}} />
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={"footer"}>*/}
            {/*    © Copyright 2021 Venom. All rights reserved.*/}
            {/*</div>*/}
            {/*<div className={"canvas"}>*/}
            {/*    <Canvas linear={true} dpr={Math.max(window.devicePixelRatio, 1)}>*/}
            {/*        /!*<ambientLight color={"#fff"}/>*!/*/}
            {/*        <Background position={[0,0,4.5]}/>*/}
            {/*        <Suspense fallback={null}>*/}
            {/*            <group ref={parallaxObjParent}>*/}
            {/*                <VideoRect loaded={setParallaxObjLoaded} position={[0.3,-0.1,4]}/>*/}
            {/*                <ImageRect imageLink={'/buisness.jpg'} loaded={()=>{}} rotation={[0,0,0.1]} position={[0.3,-0.1,3.9]}/>*/}
            {/*                <ImageRect imageLink={'/office.jpg'} loaded={()=>{}} rotation={[0,0,-0.1]} position={[0.3,-0.1,3.9]}/>*/}
            {/*            </group>*/}
            {/*        </Suspense>*/}
            {/*    </Canvas>*/}
            {/*</div>*/}
            {/*<div ref={cursor} id="cursor-point"></div>*/}
            {/*<div ref={follower} id="cursor-follower">*/}
            {/*    <div className="hexagon"></div>*/}
            {/*    <div className="hexagon"></div>*/}
            {/*    <div className="hexagon"></div>*/}
            {/*</div>*/}
            <ReadingMenu text={completeText[sectionText]} visibility={menuVisibility} setVisibility={setVisibility}/>
        </div>
    )
}