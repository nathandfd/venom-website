import './VenomChibi.scss'
import {Canvas, useLoader} from "@react-three/fiber";
import {useEffect, Suspense} from "react";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import venomChibi from '../Assets/venom_chibi/scene.gltf'

const Chibi = ()=>{
    const gltf = useLoader(GLTFLoader, venomChibi)
    return(
        <primitive object={gltf.scene} position={[0,0,0]}/>
        // <mesh geometry={nodes}/>
    )
}

export const VenomChibi = ()=>{
    return(
        <Canvas>
            <ambientLight intensity={0.8} />
            <Suspense fallback={null}>
                <Chibi />
            </Suspense>
        </Canvas>
    )
}