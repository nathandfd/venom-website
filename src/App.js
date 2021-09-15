import './App.scss';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import React, {useEffect, useRef, useState, Suspense} from "react";
import {gsap} from 'gsap'
import {Button} from "./Components/Button";
import {TextureLoader} from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {NavLink} from "./Components/NavLink";
import {ReadingMenu} from "./Components/ReadingMenu";
import {LoadingScreen} from "./Components/LoadingScreen";

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin)

const video = document.createElement('video')

function isHidden(el) {
    const style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'))
}

function Background(props) {
  const mesh = useRef()

  useFrame((state, delta) => {
      mesh.current.rotation.y += 0.0005
  })

  return (
      <points
          {...props}
          ref={mesh}
          >
        <sphereBufferGeometry args={[4, 40,40]} />
        {/*  <torusGeometry args={[4,2,30,100]}/>*/}
        <pointsMaterial color={'white'} size={0.02} />
      </points>
  )
}

const ImageRect = (props)=>{
    const texture = useLoader(TextureLoader,props.imageLink)
    let [imageWidth, setImageWidth] = useState(0)
    let [imageHeight, setImageHeight] = useState(0)
    const rectWidth = 1.6

    useEffect(()=>{
        setImageHeight(texture.image.naturalHeight)
        setImageWidth(texture.image.naturalWidth)
    }, [texture])

    return(
        <mesh ref={props.reference} {...props}>
            <planeBufferGeometry attach={"geometry"} args={[rectWidth,rectWidth*(imageHeight/imageWidth)]}/>
            <meshBasicMaterial attach={"material"} map={texture}/>
        </mesh>
    )
}

const VideoRect = (props)=>{
    const imageWidth = 1280
    const imageHeight = 720
    const rectWidth = 1.6

    useEffect(()=>{
        video.src = '/video-presentation.mp4'
        video.muted = true
        video.loop = true
        props.loaded(true)
    }, [])

    return(
        <mesh ref={props.reference} {...props}>
            <planeBufferGeometry args={[rectWidth,rectWidth*(imageHeight/imageWidth)]}/>
            <meshBasicMaterial attach={"material"}>
                <videoTexture attach={"map"} args={[video]} />
            </meshBasicMaterial>
        </mesh>
    )
}

function App({completeText, cursorRef}) {
    const parallaxObjParent = useRef()
    const [parallaxObjLoaded, setParallaxObjLoaded] = useState(false)
    const [menuVisibility, setVisibility] = useState(false)
    const [sectionText, setSectionText] = useState("presentation")

    const timeline = gsap.timeline({
        scrollTrigger:{
            trigger:'.App',
            pin: true,
            start: "top top",
            end: "+=6000",
            scrub: true,
        }
    })

    const setMenuVisibility = (sectionText)=>{
        setSectionText(sectionText)
        setVisibility(true)
    }

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
        const floatingTextList = document.querySelectorAll(".floating-text")

        const mousemoveHandler = (e) => {
            gsap.to(parallaxObjParent.current.children, {
                onUpdate: () => {
                    let tempSortedArray = [...parallaxObjParent.current.children]
                    for (let i = 0; i < tempSortedArray.length; i++) {
                        tempSortedArray[i].position.set(-(e.clientX * (0.02) / window.innerWidth) + .8, (e.clientY * (0.02) / window.innerHeight) - 0.1)
                    }
                }
            })

            for (let i = 0; i<4; i++){
                if (!isHidden(floatingTextList[i])){
                    if (floatingTextList[i].classList.contains("floating-left")){
                        gsap.to(floatingTextList[i], {
                            left: -(e.clientX * 2 / window.innerWidth) + 10 + 'vw',
                            top: -(e.clientY * 1 / window.innerHeight) + 10 + 'vh',
                        })
                    }
                    else{
                        gsap.to(floatingTextList[i], {
                            right: (e.clientX * 2 / window.innerWidth) + 5 + 'vw',
                            bottom: (e.clientY * 1 / window.innerHeight) + 10 + 'vh',
                        })
                    }
                }
            }
        }

        for (let i = 0; i<4; i++){
            if (floatingTextList[i].classList.contains("floating-left")){
                gsap.to(floatingTextList[i], {
                    left: -(window.innerWidth  / window.innerWidth) + 10 + 'vw',
                    top: -(window.innerHeight/2 / window.innerHeight) + 10 + 'vh',
                })
            }
            else{
                gsap.to(floatingTextList[i], {
                    right: (window.innerWidth / window.innerWidth) + 5 + 'vw',
                    bottom: (window.innerHeight/2 / window.innerHeight) + 10 + 'vh',
                })
            }
        }

        if (parallaxObjLoaded) {
            document.addEventListener('mousemove', mousemoveHandler, {passive: true, capture: true})
        }

        return () => {
            document.removeEventListener("mousemove", mousemoveHandler)
        }
    },[parallaxObjLoaded])

    useEffect(()=>{
        if (parallaxObjLoaded){
            const h1Before = CSSRulePlugin.getRule('.App .floating-text h1:before')
            const h1BeforeAnimation = gsap.timeline({
                paused:true,
            })

            h1BeforeAnimation
                .fromTo(h1Before,{cssRule:{width:'0%'}},{cssRule:{width:'95%'}, duration:.75, ease:"power4"})


            timeline
                .set(parallaxObjParent.current.position,{x:0})
                .set('.header',{visibility:'visible'},'<')
                .fromTo('.header .background1',{xPercent:0},{xPercent:-60, duration:1, ease:"none"})
                .fromTo('.header .background2',{xPercent:0},{xPercent:60, duration:1, ease:"none"},'<')
                .fromTo('.header .navbar',{yPercent:0},{yPercent:-100, duration:1, ease:"none"},'<')
                .fromTo('.header .scroll-down',{yPercent:0},{yPercent:120, duration:1, ease:"none"},'<')
                .set('.section1',{visibility:'visible'},'<')
                .fromTo('.section1',{opacity:0},{opacity:1,duration:1, onComplete:()=>{h1BeforeAnimation.resume(); video.currentTime = 0; video.play()}},'<0.3')
                .fromTo('.header', {pointerEvents:'auto'},{pointerEvents:'none', duration:0},'<')
                .set('.header',{visibility:'hidden'})
                .to('.section1',{opacity:0, duration:1, delay:1})
                .set('.section1',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:-1.6, duration:1})
                .to(parallaxObjParent.current.children[1].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[0].position,{z:'-=0.1', duration:1, onReverseComplete:()=>{video.play()}, onComplete:()=>{video.currentTime = 0;video.pause()}},'<')
                .set('.section2',{visibility:'visible'})
                .fromTo('.section2',{opacity:0},{opacity:1, duration:1, onStart:()=>{h1BeforeAnimation.pause(0)}, onComplete:()=>{h1BeforeAnimation.resume()}})
                .to('.section2',{opacity:0, duration:1, delay:1})
                .set('.section2',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:0, duration:1})
                .to(parallaxObjParent.current.children[2].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[1].position,{z:'-=0.1', duration:1},'<')
                .set('.section3',{visibility:'visible'})
                .fromTo('.section3',{opacity:0},{opacity:1, duration:1, onStart:()=>{h1BeforeAnimation.pause(0)}, onComplete:()=>{h1BeforeAnimation.resume()}})
                .to('.section3',{opacity:0, duration:1, delay:1})
                .set('.section3',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:-1.6, duration:1})
                .to(parallaxObjParent.current.children[3].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[2].position,{z:'-=0.1', duration:1},'<')
                .set('.section4',{visibility:'visible'})
                .fromTo('.section4',{opacity:0},{opacity:1, duration:1, onStart:()=>{h1BeforeAnimation.pause(0)}, onComplete:()=>{h1BeforeAnimation.resume()}})
        }
    },[parallaxObjLoaded])

  return (
    <div className="App" style={{'minHeight':'100vh','backgroundColor':'#121212'}}>
        <div className="header">
            <div className="navbar">
                <div className="blurred-background"></div>
                <ul>
                    <li><NavLink scrollToAnchor={1000} text={"Présentation"} cursorRef={cursorRef}/></li>
                    <li><NavLink scrollToAnchor={2400} text={"Partenaire"} cursorRef={cursorRef}/></li>
                    <li><img src="/venom-logo.png" alt=""/></li>
                    <li><NavLink scrollToAnchor={4200} text={"Savoir-faire"} cursorRef={cursorRef}/></li>
                    <li><NavLink scrollToAnchor={6000} text={"Recrutement"} cursorRef={cursorRef}/></li>
                </ul>
            </div>
            <div className={"scroll-down"}>
                <p>Descend pour en savoir plus</p>
                <div className="chevron">
                    <div className="vector"></div>
                </div>
            </div>
            <div className="background">
                <div className="background1">
                    <h1>
                        Rejoins l’aventure et deviens commercial chez Venom !
                    </h1>
                </div>
                <div className="background2"></div>
            </div>
        </div>
        <div id={"presentation"} className="section section1">
            <div className={"centering-div"}>
                <div className="floating-text floating-left">
                    <h1 className={"sectionTitle"}>Présentation</h1>
                    <p>VENOM est un réseau de distribution commercial qui est présent sur des marchés porteurs tels que la fourniture d’énergie, l’assurance ou encore la presse. Nous proposons par l’intermédiaire de nos forces de vente les offres les plus compétitives du marché actuel.</p>
                    <Button text={"Découvrir"} cursorRef={cursorRef} onClick={()=>{setMenuVisibility('presentation')}} />
                </div>
            </div>
        </div>
        <div id={"partenaire"} className="section section2">
            <div className="centering-div">
                <div className="floating-text floating-right">
                    <h1 className={"sectionTitle"}>Partenaire</h1>
                    <p>VENOM est partenaire d’ENGIE, fournisseur historique de gaz. Notre seule volonté est de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. C’est pourquoi nous mobilisons nos forces de vente afin de promouvoir les offres d’ENGIE.</p>
                    <Button text={"En savoir plus"} cursorRef={cursorRef} onClick={()=>{setMenuVisibility('partenaire')}} />
                </div>
            </div>
        </div>
        <div id={"knowledges"} className="section section3">
            <div className="centering-div">
                <div className="floating-text floating-left">
                    <h1 className={"sectionTitle"}>Savoir-faire</h1>
                    <p>Notre société VENOM est composée de plusieurs services : le service administratif, le service qualité, le service ressources humaines et enfin le service communication. Chacun de nos services assurent le bon fonctionnement de notre société, le suivi de nos forces de vente et la satisfaction de nos clients.</p>
                    <Button text={"En savoir plus"} cursorRef={cursorRef} onClick={()=>{setMenuVisibility('knowledges')}} />
                </div>
            </div>
        </div>
        <div id={"recrutement"} className="section section4">
            <div className="centering-div">
                <div className="floating-text floating-right">
                    <h1 className={"sectionTitle"}>Recrutement</h1>
                    <p>Venom recrute à travers toute la France pour mener à bien ses objectifs. Conseillers Commerciaux, Managers Commerciaux ou encore Directeurs d’agences, nous recherchons nos futurs collaborateurs.Vous pensez avoir l’âme d’un super-héros de la vente ? Lancez-vous et rejoignez l’un de nos services : commercial ou back-office.</p>
                    <Button text={"En savoir plus"} cursorRef={cursorRef} onClick={()=>{setMenuVisibility('recrutement')}} />
                    <Button text={"Nous rejoindre"} cursorRef={cursorRef} onClick={()=>{setMenuVisibility('contact')}} />
                </div>
            </div>
        </div>
        <div className={"footer"}>
            <p>© Copyright 2021 Venom. All rights reserved.</p>
            <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={()=>{setMenuVisibility('legalNotices')}}>Mentions légales</p>
        </div>
        <div className={"canvas"}>
            <Suspense fallback={<LoadingScreen/>}>
                <Canvas linear={true} dpr={Math.min(window.devicePixelRatio, 1)}>
                    {/*<ambientLight color={"#fff"}/>*/}
                    <Background position={[0,0,4.5]}/>
                    <group ref={parallaxObjParent}>
                        <VideoRect loaded={setParallaxObjLoaded} position={[1.2,-0.1,3.7]}/>
                        <ImageRect imageLink={'/partenaire.png'} rotation={[0,0,0.1]} position={[1.2,-0.1,3.6]}/>
                        <ImageRect imageLink={'/knowledges.jpg'} rotation={[0,0,-0.05]} position={[1.2,-0.1,3.6]}/>
                        <ImageRect imageLink={'/recrutement.jpg'} rotation={[0,0,-0.1]} position={[1.2,-0.1,3.6]}/>
                    </group>
                </Canvas>
            </Suspense>
        </div>
        <ReadingMenu text={completeText[sectionText]} visibility={menuVisibility} setVisibility={setVisibility} cursorRef={cursorRef}/>
    </div>
  );
}

export default App;
