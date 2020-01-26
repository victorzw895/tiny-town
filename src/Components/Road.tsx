import React, { useState, useRef } from "react";
import { useThree, useFrame } from "react-three-fiber";

const Road = (props: any) => {
  // const { size, viewport } = useThree();

  const ref = useRef();

  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      ref={ref}
      {...props}
      scale={active ? [1.5, 1.5, 1.5] : [20, 1, 0]}
      position={[0, 2.5, 1]}
      // rotation={[-1.3, 0, -0.2]}
      // rotation={[-1.2, 0, 0.78]}
      //   rotation={[-1.2, 0, Math.PI / 4]}
      //   onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial
        attach="material"
        color={hovered ? "lightseagreen" : "palegreen"}
      />
    </mesh>
  );
};

export default Road;
