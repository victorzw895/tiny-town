import React, { useRef } from "react";

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
  return (
    <div className="App">
      <C
        // orthographic
        // perspective
        camera={{ position: [0, 0, 50], zoom: 5, up: [0, 0, 1], far: 10000 }}
        style={{ background: "lightblue" }}
        // shadowMap
        // camera={{ position: [0, 0, 15] }}
      >
        <pointLight position={[0, 0, 30]} />
        {/* <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" /> */}
        {/* <spotLight
          castShadow
          intensity={4}
          angle={Math.PI / 8}
          position={[15, 25, 5]}
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
