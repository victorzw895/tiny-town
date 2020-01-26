import React, { useRef } from "react";
import { Canvas as C, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Building from "./Components/Building";
import Platform from "./Components/Platform";
import Road from "./Components/Road";

extend({ OrbitControls });
const Controls = props => {
  const { gl, camera } = useThree();
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      {...props}
      enableRotate={true}
      enableDamping
      dampingFactor={0.1}
      // rotateSpeed={0.5}
      maxZoom={40}
      minZoom={1.25}
    />
  );
};

const Canvas = () => {
  return (
    <div className="Canvas">
      <div
        style={{
          position: "fixed",
          zIndex: 1000,
          background: "white",
          width: "100%"
        }}
      >
        <p>NAV BAR</p>
      </div>
      <C
        orthographic
        camera={{ position: [0, 0, 50], zoom: 25, up: [0, 0, 1], far: 10000 }}
        style={{ background: "lightblue" }}
        shadowMap
        // camera={{ position: [0, 0, 15] }}
      >
        <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" />
        <spotLight
          castShadow
          intensity={4}
          angle={Math.PI / 8}
          position={[15, 25, 5]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        {/* <fog attach="fog" args={["#090b1f", 0, 200]} /> */}
        <Building position={[0, 0, 1.5]} buildingType={"A"} />
        <Building position={[0, 5, 1.5]} buildingType={"B"} />
        <Building position={[0, 10, 1.5]} buildingType={"C"} />
        <Building position={[5, 5, 1.5]} buildingType={"A"} />
        {/* <BuildingA position={[1.2, 0, 0]} /> */}
        <Road />
        <Platform position={[0, 0, 0]} />
        <Controls
          // autoRotate
          // enablePan={true}
          enableZoom={false}
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

export default Canvas;
