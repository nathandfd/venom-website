import './VenomChibi.scss'
import {Canvas, useLoader} from "@react-three/fiber";
import React, {useEffect, Suspense, useState} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import venomChibi from '../Assets/venom-chibi.glb'

const Chibi = ({SceneRef, setChibiLoaded})=>{
    const gltf = useLoader(GLTFLoader, venomChibi)

    useEffect(()=>{
        setChibiLoaded(true)
    })

    return(
        <>
            <primitive ref={SceneRef} object={gltf.scene} position={[0,0,2.8]}/>
        </>
    )
}

const LoadingScreen = ()=>{
    return(
        <div style={{
            display:"flex",
            position:"fixed",
            inset:0,
            height:"100vh",
            width:"100vw",
            backgroundColor:"red",
            zIndex:1000000
        }}>
            <h1 style={{color:"blue",fontSize:"2em"}}>YOOOOOO</h1>
        </div>
    )
}

export const VenomChibi = ({SceneRef, setChibiLoaded})=>{
    return(
        <Suspense fallback={<LoadingScreen/>}>
            <Canvas id={"canvas"} dpr={Math.min(window.devicePixelRatio, 1)}>
                <ambientLight intensity={0.4} />
                <pointLight color="white" intensity={0.8} position={[-5, 5, 5]} />
                {/*<Suspense fallback={null}>*/}
                    <Chibi SceneRef={SceneRef} setChibiLoaded={setChibiLoaded} />
                {/*</Suspense>*/}
            </Canvas>
        </Suspense>
    )
}