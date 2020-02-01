import React, { useRef } from "react";
import * as THREE from "three";

import { Canvas as C, extend, useFrame, useThree } from "react-three-fiber";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

import Building from "./Building";
import Platform from "./Platform";
import Road from "./Road";

extend({ MapControls });
const Controls = props => {
  const { gl, camera } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <mapControls
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
      enableRotate={true}
      enableDamping
      dampingFactor={0.05}
      screenSpacePanning={false}
      minDistance={60}
      maxDistance={250}
      // rotateSpeed={0.5}
      maxPolarAngle={(80 * Math.PI) / 180}
      maxZoom={40}
      minZoom={30}
    />
  );
};

const Town = () => {
  const d = 8.25;
  const mouse = useRef({ x: 0, y: 0 });
  return (
    <div className="App">
      <C
        // orthographic
        // perspective
        camera={{ position: [-8, 12, 8], zoom: 5, up: [0, 0, 1], far: 1000 }}
        style={{ background: "lightblue" }}
        // onCreated={({ gl }) => (
        //   (gl.shadowMap.enabled = true),
        //   (gl.shadowMap.type = THREE.PCFSoftShadowMap)
        // )}
        shadowMap
        // camera={{ position: [0, 0, 15] }}
      >
        <fog attach="fog" args={[0xdfdfdf, 120, 140]} />
        <hemisphereLight
          skyColor={"aliceblue"}
          groundColor={0xffffff}
          intensity={0.48}
          position={[0, 50, 0]}
        />
        <directionalLight
          position={[-8, 12, 8]}
          intensity={0.3}
          shadow-camera-left={d * -1}
          shadow-camera-bottom={d * -1}
          shadow-camera-right={d}
          shadow-camera-top={d}
          shadow-camera-near={0.1}
          shadow-camera-far={1500}
          castShadow
        />
        {/* <hemisphereLight
          castShadow
          physicallyCorrectLights={true}
          toneMappingExposure={Math.pow(0.7, 5.0)}
          power={740}
          position={[0, 0, 30]}
        /> */}

        {/* <ambientLight intensity={0.5} />
        <spotLight
          intensity={0.6}
          position={[30, 30, 50]}
          angle={0.2}
          penumbra={1}
          castShadow
        /> */}

        {/* <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" /> */}
        {/* <spotLight
          castShadow
          intensity={1}
          angle={Math.PI / 8}
          position={[0, 0, 30]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        /> */}

        {/* <fog attach="fog" args={["#090b1f", 0, 200]} /> */}
        <Building
          position={[0, 0, 3]}
          color={"violet"}
          scale={[3, 3, 6]}
          townScale={100}
        />
        {/* <Building position={[0, 5, 1.5]} color={"orange"} scale={[3, 3, 3]} />
        <Building position={[0, 10, 1.5]} color={"purple"} scale={[3, 3, 3]} />
        <Building position={[5, 5, 1.5]} color={"blue"} scale={[3, 3, 3]} /> */}
        {/* <BuildingA position={[1.2, 0, 0]} /> */}
        <Road townScale={100} />
        <Platform position={[0, 0, 0]} />
        <Controls
        // autoRotate
        // enablePan={true}
        // enableZoom={false}
        // enableDamping
        // dampingFactor={0.5}
        // rotateSpeed={1}
        // maxPolarAngle={Math.PI / 1.1}
        // minPolarAngle={Math.PI / 2}
        />
      </C>
    </div>
  );
};

export default Town;
