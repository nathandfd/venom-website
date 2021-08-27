import './App.scss';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import {useEffect, useRef, useState, Suspense} from "react";
import {gsap} from 'gsap'
import {Button} from "./Components/Button";
import {TextureLoader} from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {Link} from "./Components/Link";
import {ReadingMenu} from "./Components/ReadingMenu";

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin)

const video = document.createElement('video')

const timeline = gsap.timeline({
    scrollTrigger:{
        trigger:'.App',
        pin: true,
        start: "top top",
        end: "+=6000",
        scrub: true,
    }
})

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
        props.loaded(true)
    }, [texture])

    return(
        <mesh ref={props.reference} {...props}>
            <planeBufferGeometry attach={"geometry"} args={[rectWidth,rectWidth*(imageHeight/imageWidth)]}/>
            <meshBasicMaterial attach={"material"} map={texture}/>
        </mesh>
    )
}

const VideoRect = (props)=>{
    const videoTexture = useRef()

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
                <videoTexture ref={videoTexture} attach={"map"} args={[video]} />
            </meshBasicMaterial>
        </mesh>
    )
}

function App({completeText}) {
    const cursor = useRef()
    const follower = useRef()
    const parallaxObjParent = useRef()
    const [cursorHovering, setCursorHovering] = useState(false)
    const [parallaxObjLoaded, setParallaxObjLoaded] = useState(false)
    const [menuVisibility, setVisibility] = useState(false)
    const [sectionText, setSectionText] = useState("presentation")


    const setMenuVisibility = (sectionText)=>{
        setSectionText(sectionText)
        setVisibility(true)
    }

    useEffect(()=>{
            document.addEventListener('mousemove', (e) => {
                e.stopPropagation()
                e.preventDefault()
                gsap.set(cursor.current, {
                    left: e.clientX,
                    top: e.clientY,
                })
                gsap.to(follower.current, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 1
                })
                if (parallaxObjParent.current.children){
                    gsap.to(parallaxObjParent.current.children, {
                        onUpdate: () => {
                            let tempSortedArray = [...parallaxObjParent.current.children]
                            for (let i = 0; i < tempSortedArray.length; i++){
                                tempSortedArray[i].position.set(-(e.clientX * (0.02) / window.innerWidth) + 0.5, (e.clientY * (0.02) / window.innerHeight) - 0.1)
                            }
                        }
                    })
                }
                gsap.to('.floating-text.floating-left', {
                    left: -(e.clientX * 2 / window.innerWidth) + 10 + 'vw',
                    top: -(e.clientY * 1 / window.innerHeight) + 10 + 'vh',
                })
                gsap.to('.floating-text.floating-right', {
                    right: (e.clientX * 2 / window.innerWidth) + 5 + 'vw',
                    bottom: (e.clientY * 1 / window.innerHeight) + 10 + 'vh',
                })
            }, {passive:true, capture:true})
    },[])

    useEffect(()=>{
        if (cursorHovering){
            gsap.to(follower.current.children,{
                paddingRight: 14,
                paddingLeft: 14,
                marginLeft:-10,
                duration: .5,
                width:50
            })
        }
        else {
            gsap.to(follower.current.children,{
                paddingRight: 0,
                paddingLeft: 0,
                marginLeft:0,
                duration: .5,
                width:32
            })
        }
    }, [cursorHovering])

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
                .fromTo('.section1',{opacity:0},{opacity:1,duration:1, onComplete:()=>{h1BeforeAnimation.resume(); video.fastSeek(0); video.play()}},'<0.3')
                .fromTo('.header', {pointerEvents:'auto'},{pointerEvents:'none', duration:0},'<')
                .set('.header',{visibility:'hidden'})
                .to('.section1',{opacity:0, duration:1, delay:1})
                .set('.section1',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:-1, duration:1})
                .to(parallaxObjParent.current.children[1].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[0].position,{z:'-=0.1', duration:1, onReverseComplete:()=>{video.play()}, onComplete:()=>{video.fastSeek(0);video.pause()}},'<')
                .set('.section2',{visibility:'visible'})
                .fromTo('.section2',{opacity:0},{opacity:1, duration:1, onStart:()=>{h1BeforeAnimation.pause(0)}, onComplete:()=>{h1BeforeAnimation.resume()}})
                .to('.section2',{opacity:0, duration:1, delay:1})
                .set('.section2',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:0, duration:1})
                .to(parallaxObjParent.current.children[2].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[1].position,{z:'-=0.1', duration:1},'<')
                .set('.section3',{visibility:'visible'})
                .fromTo('.section3',{opacity:0},{opacity:1, duration:1, onStart:()=>{h1BeforeAnimation.pause(0)}, onComplete:()=>{h1BeforeAnimation.resume()}})
        }
    },[parallaxObjLoaded])

  return (
    <div className="App" style={{'minHeight':'100vh','backgroundColor':'#121212'}}>
        <div className="header">
            <div className="navbar">
                <div className="blurred-background"></div>
                <ul>
                    <li><Link text={"Présentation"} setHover={setCursorHovering}/></li>
                    <li><Link text={"Partenaire"} setHover={setCursorHovering}/></li>
                    <li><img src="/venom-logo.png" alt=""/></li>
                    <li><Link text={"Recrutement"} setHover={setCursorHovering}/></li>
                    <li><Link text={"Contact"} setHover={setCursorHovering}/></li>
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
        <div className="section section1">
            <div className={"centering-div"}>
                <div className="floating-text floating-left">
                    <h1 className={"sectionTitle"}>Présentation</h1>
                    <p>VENOM est un réseau de distribution commercial qui est présent sur des marchés porteurs tels que la fourniture d’énergie, l’assurance ou encore la presse. Nous proposons par l’intermédiaire de nos forces de vente les offres les plus compétitives du marché actuel.</p>
                    <Button text={"Découvrir"} setHover={setCursorHovering} onClick={()=>{setMenuVisibility('presentation')}} />
                </div>
            </div>
        </div>
        <div className="section section2">
            <div className="centering-div">
                <div className="floating-text floating-right">
                    <h1 className={"sectionTitle"}>Partenaire</h1>
                    <p>VENOM est partenaire d’ENGIE, fournisseur historique de gaz. Notre seule volonté est de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. C’est pourquoi nous mobilisons nos forces de vente afin de promouvoir les offres d’ENGIE.</p>
                    <Button text={"En savoir plus"} setHover={setCursorHovering} onClick={()=>{setMenuVisibility('partenaire')}} />
                </div>
            </div>
        </div>
        <div className="section section3">
            <div className="centering-div">
                <div className="floating-text floating-left">
                    <h1 className={"sectionTitle"}>Recrutement</h1>
                    <p>Venom recrute à travers toute la France pour mener à bien ses objectifs. Conseillers Commerciaux, Managers Commerciaux ou encore Directeurs d’agences, nous recherchons nos futurs collaborateurs.Vous pensez avoir l’âme d’un super-héros de la vente ? Lancez-vous et rejoignez l’un de nos services : commercial ou back-office.</p>
                    <Button text={"En savoir plus"} setHover={setCursorHovering} onClick={()=>{setMenuVisibility('recrutement')}} />
                    <Button text={"Nous rejoindre"} setHover={setCursorHovering} onClick={()=>{setMenuVisibility('contact')}} />
                </div>
            </div>
        </div>
        {/*<div className={"footer"}>*/}
        {/*    © Copyright 2021 Venom. All rights reserved.*/}
        {/*</div>*/}
      <div className={"canvas"}>
          <Canvas linear={true} dpr={Math.min(window.devicePixelRatio, 2)}>
              {/*<ambientLight color={"#fff"}/>*/}
              <Background position={[0,0,4.5]}/>
              <Suspense fallback={null}>
                  <group ref={parallaxObjParent}>
                      <VideoRect loaded={setParallaxObjLoaded} position={[0.3,-0.1,4]}/>
                      <ImageRect imageLink={'/buisness.jpg'} loaded={()=>{}} rotation={[0,0,0.1]} position={[0.3,-0.1,3.9]}/>
                      <ImageRect imageLink={'/office.jpg'} loaded={()=>{}} rotation={[0,0,-0.1]} position={[0.3,-0.1,3.9]}/>
                  </group>
              </Suspense>
          </Canvas>
      </div>
        <div ref={cursor} id="cursor-point"></div>
        <div ref={follower} id="cursor-follower">
            <div className="hexagon"></div>
            <div className="hexagon"></div>
            <div className="hexagon"></div>
        </div>
        <ReadingMenu text={completeText[sectionText]} visibility={menuVisibility} setVisibility={setVisibility} onHover={setCursorHovering}/>
    </div>
  );
}

export default App;
