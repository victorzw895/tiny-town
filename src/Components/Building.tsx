import React, { useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";

import { useDrag } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";

function Obj() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 3, friction: 40, tension: 800 }
  }));
  const bind = useDrag(
    ({ offset: [x, y], vxvy: [vx, vy], down, ...props }) =>
      set({
        position: [x / aspect, -y / aspect, 0],
        rotation: [y / aspect, x / aspect, 0]
      }),
    { pointerEvents: true }
  );

  return (
    <a.mesh {...spring} {...bind()} castShadow>
      <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
      <meshNormalMaterial attach="material" />
    </a.mesh>
  );
}

const BuildingA = (props: any) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  const getBuilding = () => {
    let color;
    switch (props.buildingType) {
      case "A":
        color = "violet";
        break;
      case "B":
        color = "orange";
        break;
      default:
        color = "purple";
    }
    return color;
  };

  return (
    <mesh
      ref={ref}
      {...props}
      scale={active ? [3, 3, 3] : [2, 2, 2]}
      position={props.position}
      // rotation={[-1.27, 0, 0.7]}
      // rotation={[-1.2, 0, 0.78]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        // color={hovered ? "yellow" : "orange"}
        color={getBuilding()}
      />
    </mesh>
  );
};

export default BuildingA;
// export default Obj;
