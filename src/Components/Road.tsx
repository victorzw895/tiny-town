import React, { useState, useRef, useEffect } from "react";
import { useThree, useFrame } from "react-three-fiber";

interface Road {
  color: string;
  scale: number[];
  position: number[];
}

const Road = (props: any) => {
  // const { size, viewport } = useThree();

  const ref = useRef();

  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHover] = useState(false);
  const [roads, setRoads] = useState<Road[]>([]);

  const roadArray: any = [];

  const generateRoad = (townScale: any) => {
    const roadScale = 2;
    const betweenRoad = 5;
    const NumberRoads = Math.floor(townScale / (roadScale + betweenRoad));
    const platformEdge = -townScale / 2;
    const startPoint =
      platformEdge + (townScale % (roadScale + betweenRoad)) + 3.5;

    const randomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min) + min);
    };

    const getPosition = (axis: number) => {
      return startPoint + (roadScale + betweenRoad) * (axis + 1);
    };

    for (let x = 0; x < NumberRoads - 2; x++) {
      roadArray.push({
        color: "lightseagreen",
        scale: [90, 2, 0],
        position: [0, getPosition(x), 0.1]
      });
      roadArray.push({
        color: "lightseagreen",
        scale: [2, 90, 0],
        position: [getPosition(x), 0, 0.1]
      });
    }
  };

  useEffect(() => {
    generateRoad(props.townScale);
    setRoads(roadArray);
  });

  return (
    <group>
      {roads.map(road => {
        return (
          <mesh
            ref={ref}
            {...props}
            scale={active ? [1.5, 1.5, 1.5] : road.scale}
            position={road.position}
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
      })}
    </group>
    // <mesh
    //   ref={ref}
    //   {...props}
    //   scale={active ? [1.5, 1.5, 1.5] : [20, 1, 0]}
    //   position={[0, 2.5, 0.1]}
    //   // rotation={[-1.3, 0, -0.2]}
    //   // rotation={[-1.2, 0, 0.78]}
    //   //   rotation={[-1.2, 0, Math.PI / 4]}
    //   //   onClick={e => setActive(!active)}
    //   onPointerOver={e => setHover(true)}
    //   onPointerOut={e => setHover(false)}
    // >
    //   <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
    //   <meshBasicMaterial
    //     attach="material"
    //     color={hovered ? "lightseagreen" : "palegreen"}
    //   />
    // </mesh>
  );
};

export default Road;
