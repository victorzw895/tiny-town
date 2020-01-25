import React, { useRef, useState } from "react";
import { useThree, useFrame } from "react-three-fiber";

const Platform = (props: any) => {
  // const { size, viewport } = useThree();

  // const aspect = size.width / viewport.width;

  const ref: any | undefined = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // const [rotation, setRotation] = useState([-1.27, 0, 0.7])
  const [dragging, setDragging] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  //   useFrame(() => (ref.current.rotation.x 0= ref.current.rotation.y += 0.01));
  // useFrame(() => {
  //   ref.current.rotation.x -= 0.01;
  //   console.log(ref.current.rotation.x);
  // });

  return (
    <mesh
      ref={ref}
      {...props}
      scale={active ? [1.5, 1.5, 1.5] : [100, 100, 100]}
      position={[0, 0, 0]}
      // rotation={[-1.3, 0, -0.2]}
      // rotation={[-1.2, 0, 0.78]}
      // rotation={[-1.2, 0, Math.PI / 4]}
      //   onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial
        attach="material"
        color={hovered ? "rgba(156,156,156)" : "rgba(160,160,160)"}
      />
    </mesh>
  );
};

export default Platform;
