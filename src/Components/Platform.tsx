import React, { useRef, useState } from "react";
import { useThree, useFrame } from "react-three-fiber";

const Platform = (props: any) => {
  const { size, viewport } = useThree();

  const aspect = size.width / viewport.width;

  const ref = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  //   useFrame(() => (ref.current.rotation.x 0= ref.current.rotation.y += 0.01));
  //   useFrame(() => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      ref={ref}
      {...props}
      scale={active ? [1.5, 1.5, 1.5] : [10, 10, 10]}
      position={[0, 0, 0]}
      rotation={[-1.27, 0, 0.7]}
      //   onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      onMouseDown={() => {
        console.log("mouseDown");
      }}
    >
      <planeGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial
        attach="material"
        color={hovered ? "hotpink" : "rgba(160,160,160)"}
      />
    </mesh>
  );
};

export default Platform;
