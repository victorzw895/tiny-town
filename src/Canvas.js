import React, { useRef } from "react";
import { Canvas as C, extend, useFrame, useThree } from "react-three-fiber";
import { MapControls } from "three/examples/jsm/controls/OrbitControls";

import BuildingA from "./Components/BuildingA";
import Platform from "./Components/Platform";

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
      enableRotate={false}
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
        style={{ background: "lightblue" }}
        shadowMap
        camera={{ position: [0, 0, 15] }}
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
        {/* <fog attach="fog" args={["#090b1f", 0, 25]} /> */}
        <BuildingA position={[0, 0, 0]} />
        {/* <BuildingA position={[1.2, 0, 0]} /> */}
        <Platform position={[0, 0, 0]} />
        <Controls
        // autoRotate
        // enablePan={true}
        // enableZoom={true}
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
