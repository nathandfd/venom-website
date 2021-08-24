import './VenomChibi.scss'
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {useEffect, Suspense, useRef} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import venomChibi from '../Assets/venom-chibi.glb'

const Chibi = ({SceneRef, setChibiLoaded})=>{
    const gltf = useLoader(GLTFLoader, venomChibi)

    useEffect(()=>{
        setChibiLoaded(true)
    })

    return(
        <primitive ref={SceneRef} object={gltf.scene} position={[0,0,3]}/>
    )
}

export const VenomChibi = ({SceneRef, setChibiLoaded})=>{
    return(
        <Canvas id={"canvas"} >
            <ambientLight intensity={0.4} />
            <pointLight color="white" intensity={0.8} position={[-5, 5, 5]} />
            <Suspense fallback={null}>
                <Chibi SceneRef={SceneRef} setChibiLoaded={setChibiLoaded} />
            </Suspense>
        </Canvas>
    )
}