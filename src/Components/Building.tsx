import React, { useRef, useState, useEffect } from "react";
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

interface Building {
  color: string;
  scale: number[];
  position: number[];
}

const BuildingA = (props: any) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  const buildingArray: any = [];

  const generateBuildings = (townScale: any) => {
    const buildingScale = 3;
    const betweenBuilding = 2;
    const NumberBuildings = Math.floor(
      townScale / (buildingScale + betweenBuilding)
    );
    const platformEdge = -townScale / 2;

    const randomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const getPosition = (axis: number) => {
      return platformEdge + buildingScale * (axis + 1);
    };

    // Temporary, need to iterate through an array of coordinates and values
    for (let x = 0; x < NumberBuildings; x++) {
      for (let y = 0; y < NumberBuildings; y++) {
        const height = randomNumber(4, 7);
        buildingArray.push({
          color: `rgba(${[
            randomNumber(20, 245),
            randomNumber(20, 245),
            randomNumber(20, 245),
            0.9
          ].join(",")})`,
          scale: [3, 3, height],
          position:
            y !== 0
              ? [
                  getPosition(x) +
                    (townScale % (buildingScale + betweenBuilding)) +
                    betweenBuilding,
                  getPosition(y) +
                    (townScale % (buildingScale + betweenBuilding)) +
                    betweenBuilding,
                  height / 2
                ]
              : [
                  getPosition(x) + betweenBuilding,
                  getPosition(y) + betweenBuilding,
                  height / 2
                ]
        });
        // setBuildings([
        //   ...buildings,
        //   {
        //     color: `rgba(${[
        //       randomNumber(20, 245),
        //       randomNumber(20, 245),
        //       randomNumber(20, 245),
        //       0.9
        //     ].join(",")})`,
        //     scale: [3, 3, height],
        //     position:
        //       x !== 0 || x !== NumberBuildings
        //         ? [
        //             getPosition(x) + betweenBuilding,
        //             getPosition(y) + betweenBuilding,
        //             height / 2
        //           ]
        //         : [
        //             getPosition(x) +
        //               (townScale % (buildingScale + betweenBuilding)),
        //             getPosition(y) +
        //               (townScale % (buildingScale + betweenBuilding)),
        //             height / 2
        //           ]
        //   }
        // ]);
        console.log(buildings);
      }
    }
  };

  useEffect(() => {
    generateBuildings(props.townScale);
    setBuildings(buildingArray);
  }, []);

  console.log(buildings);

  return (
    <group>
      {buildings.map(building => {
        console.log(buildings);
        return (
          <mesh
            ref={ref}
            {...props}
            scale={active ? [3.2, 3.2, 3] : building.scale}
            position={building.position}
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
              color={building.color}
            />
          </mesh>
        );
      })}
      {/* <mesh
        ref={ref}
        {...props}
        scale={active ? [3.2, 3.2, 3] : props.scale}
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
          color={props.color}
        />
      </mesh> */}
    </group>
  );
};

export default BuildingA;
// export default Obj;
