import logo from './logo.svg';
import './App.css';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import {useEffect, useRef, useState, Suspense} from "react";
import {gsap} from 'gsap'
import {Button} from "./Components/Button";
import {TextureLoader} from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {Link} from "./Components/Link";
import {ReadingMenu} from "./Components/ReadingMenu";

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

const completeText = {
    presentation:{
        title:"Qui sommes-nous ?",
        text:
            <>
                <h3>Notre société</h3>
                <p>
                    Depuis 2012, année de sa création, VENOM, réseau de distribution commercial, est partenaire d’<bold>ENGIE</bold> (anciennement GDF Suez). Au travers de ces années d’expérience, une seule volonté : celle de permettre aux consommateurs d’avoir accès à une énergie de qualité à un tarif abordable. VENOM est également présent sur des marchés porteurs tels que l’assurance et la presse. Notre société représente ainsi un apport de plus de 30 000 nouveaux clients pour nos partenaires.
                </p>
            </>
    },
    partenaire:{
        title:"Partenaire",
        text:<h3>Salut</h3>
    },
    recrutement:{
        title:"Recrutement",
        text:"lorem lorem"
    }
}

function Background(props) {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => {
      mesh.current.rotation.y += 0.00005
  })

  return (
      <points
          {...props}
          ref={mesh}
          // position={[0,0,-4]}
          >
        <sphereGeometry args={[4, 70,70]} />
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
            <planeGeometry args={[rectWidth,rectWidth*(imageHeight/imageWidth)]}/>
            <meshBasicMaterial map={texture}/>
        </mesh>
    )
}

const VideoRect = (props)=>{
    let [imageWidth, setImageWidth] = useState(1280)
    let [imageHeight, setImageHeight] = useState(720)
    const rectWidth = 1.6
    const [video] = useState(()=>{
        const vid = document.createElement('video')
        vid.src = '/video-presentation.mov'
        vid.muted = true
        vid.loop = true
        return vid
    })

    useEffect(()=>{
        props.loaded(true)
        video.play()
    }, [video])

    return(
        <mesh ref={props.reference} {...props}>
            <planeGeometry args={[rectWidth,rectWidth*(imageHeight/imageWidth)]}/>
            <meshBasicMaterial>
                <videoTexture attach={"map"} args={[video]} />
            </meshBasicMaterial>
        </mesh>
    )
}

function App() {
    const cursor = useRef()
    const follower = useRef()
    const parallaxObj = useRef()
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
        if (parallaxObjLoaded) {
            document.addEventListener('mousemove', (e) => {
                gsap.to(cursor.current, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: .2
                })
                gsap.to(follower.current, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 1
                })
                gsap.to(parallaxObjParent.current.children, {
                    onUpdate: () => {
                        let tempSortedArray = [...parallaxObjParent.current.children]
                        tempSortedArray.sort((a, b) => {
                            return b.position.z - a.position.z
                        })
                        tempSortedArray.forEach((child, index) => {
                            child.position.set(-(e.clientX * (0.02 / (index + 1)) / window.innerWidth) + 0.5, (e.clientY * (0.02 / (index + 1)) / window.innerHeight) - 0.1)
                        })
                    }
                })
                gsap.to('.floating-text.floating-left', {
                    // left: -(e.clientX * 2 / window.innerWidth) + 10 + 'rem',
                    // top: -(e.clientY * 1 / window.innerHeight) + 5 + 'rem',
                    left: -(e.clientX * 2 / window.innerWidth) + 10 + 'vw',
                    top: -(e.clientY * 1 / window.innerHeight) + 10 + 'vh',
                })
                gsap.to('.floating-text.floating-right', {
                    // right: (e.clientX * 2 / window.innerWidth) + 5 + 'rem',
                    // bottom: (e.clientY * 1 / window.innerHeight) + 5 + 'rem',
                    right: (e.clientX * 2 / window.innerWidth) + 5 + 'vw',
                    bottom: (e.clientY * 1 / window.innerHeight) + 10 + 'vh',
                })
            })
        }
    },[parallaxObjLoaded])

    useEffect(()=>{
        if (cursorHovering){
            gsap.to(follower.current.children,{
                paddingRight: 14,
                paddingLeft: 14,
                marginLeft:-15,
                duration: .5
            })
        }
        else {
            gsap.to(follower.current.children,{
                paddingRight: 0,
                paddingLeft: 0,
                marginLeft:0,
                duration: .5
            })
        }
    }, [cursorHovering])

    useEffect(()=>{
        if (parallaxObjLoaded){
            const h1Before = CSSRulePlugin.getRule('.floating-text h1:before')

            const timeline = gsap.timeline({
                scrollTrigger:{
                    trigger:'.App',
                    pin: true,
                    start: "top top",
                     end: "+=6000",
                    scrub: 0.1,
                }
            })

            const beforeLineAnimation = gsap.timeline({
                paused:true,
            })

            beforeLineAnimation
                .fromTo(h1Before,{cssRule:{width:'0%'}},{cssRule:{width:'95%'}, duration:.75, ease:"power4"})

            timeline
                .set(parallaxObjParent.current.position,{x:0})
                .set('.header',{visibility:'visible'},'<')
                .fromTo('.header .background1',{translateX:0},{translateX:'-60%', duration:1, ease:"none"})
                .fromTo('.header .background2',{translateX:0},{translateX:'60%', duration:1, ease:"none"},'<')
                .fromTo('.header .navbar',{translateY:0},{translateY:'-100%', duration:1, ease:"none"},'<')
                .fromTo('.header .scroll-down',{translateY:0},{translateY:'120%', duration:1, ease:"none"},'<')
                .set('.section1',{visibility:'visible'},'<')
                .fromTo('.section1',{opacity:0},{opacity:1,duration:1, onStart:()=>{beforeLineAnimation.pause(0)}, onComplete:()=>{beforeLineAnimation.resume()}},'<0.3')
                .fromTo('.header', {pointerEvents:'auto'},{pointerEvents:'none', duration:0},'<')
                .set('.header',{visibility:'hidden'})
                .to('.section1',{opacity:0, duration:1, delay:1})
                .set('.section1',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:-1, duration:1})
                .to(parallaxObjParent.current.children[1].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[0].position,{z:'-=0.1', duration:1},'<')
                .set('.section2',{visibility:'visible'})
                .fromTo('.section2',{opacity:0},{opacity:1, duration:1, onStart:()=>{beforeLineAnimation.pause(0)}, onComplete:()=>{beforeLineAnimation.resume()}})
                .to('.section2',{opacity:0, duration:1, delay:1})
                .set('.section2',{visibility:'hidden'})
                .to(parallaxObjParent.current.position,{x:0, duration:1})
                .to(parallaxObjParent.current.children[2].position,{z:'+=0.1', duration:1},'<')
                .to(parallaxObjParent.current.children[1].position,{z:'-=0.1', duration:1},'<')
                .set('.section3',{visibility:'visible'})
                .fromTo('.section3',{opacity:0},{opacity:1, duration:1, onStart:()=>{beforeLineAnimation.pause(0)}, onComplete:()=>{beforeLineAnimation.resume()}})
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
                    <Button text={"Nous rejoindre"} setHover={setCursorHovering} onClick={()=>{setMenuVisibility('recrutement')}} />
                </div>
            </div>
        </div>
      <div className={"canvas"}>
          <Canvas linear={true} dpr={Math.max(window.devicePixelRatio, 2)}>
              <ambientLight color={"#fff"}/>
              <Background position={[0,0,4.5]}/>
              <Suspense fallback={null}>
                  <group ref={parallaxObjParent}>
                      <VideoRect loaded={setParallaxObjLoaded} reference={parallaxObj} position={[0.3,-0.1,4]}/>
                      <ImageRect imageLink={'/buisness.jpg'} loaded={()=>{}} reference={parallaxObj} rotation={[0,0,0.1]} position={[0.3,-0.1,3.9]}/>
                      <ImageRect imageLink={'/office.jpg'} loaded={()=>{}} reference={parallaxObj} rotation={[0,0,-0.1]} position={[0.3,-0.1,3.9]}/>
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
