import './VenomChibi.scss'
import {Canvas, useLoader} from "@react-three/fiber";
import React, {useEffect, Suspense, useState} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import venomChibi from '../Assets/venom-chibi.glb'
import {LoadingScreen} from "./LoadingScreen";

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

// const Test = React.lazy(() => {
//     return new Promise(resolve => setTimeout(resolve, 500 * 1000)).then(
//         () =>
//         {
//             return(
//                 <h1>Salut</h1>
//             )
//         }
//     );
// });

export const VenomChibi = ({SceneRef, setChibiLoaded})=>{
    return(
        <Suspense fallback={<LoadingScreen/>}>
            {/*<Test/>*/}
            <Canvas id={"canvas"} dpr={Math.min(window.devicePixelRatio, 1)}>
                <ambientLight intensity={0.4} />
                <pointLight color="white" intensity={0.8} position={[-5, 5, 5]} />
                <Chibi SceneRef={SceneRef} setChibiLoaded={setChibiLoaded} />
            </Canvas>
        </Suspense>
    )
}