import React, { useMemo } from "react";
import { Vector3 } from "three";
import { RENDER_DIST } from "../index";

const NUM_ENTITIES = 30;
const HEIGHT_POWER = 6;
const ENTITY_RADIUS = 2;
const SPAWN_X = RENDER_DIST * 2.2; // [-SPAWN / 2, SPAWN / 2]
const SPAWN_Y = RENDER_DIST * 1.1; // [0, SPAWN]
const SPAWN_Z = RENDER_DIST * 2.2; // [-SPAWN / 2, SPAWN / 2]

type GenericEntityProps = {
  seed: number;
  position: Vector3;
};

const GenericEntity = (props: GenericEntityProps) => {
  const { seed, position } = props;

  const color = Math.random() * 0xffffff;

  return (
    <group position={position} key={seed}>
      <mesh castShadow receiveShadow>
        <sphereBufferGeometry args={[ENTITY_RADIUS, 20, 20]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const Entities = () => {
  const entities: GenericEntityProps[] = useMemo(() => {
    const arr: GenericEntityProps[] = [];
    for (let i = 0; i < NUM_ENTITIES; i++) {
      const position = new Vector3();

      const posIsValid = (pos: Vector3) => {
        if (
          pos.distanceTo(new Vector3(0, ENTITY_RADIUS + 1, 0)) <
          ENTITY_RADIUS * 2
        ) {
          return false;
        }

        for (let x = 0; x < arr.length; x++) {
          if (arr[x]?.position.distanceTo(position) < ENTITY_RADIUS * 2) {
            return false;
          }
        }

        return true;
      };

      do {
        const x = Math.random() * SPAWN_X - SPAWN_X / 2;
        const y =
          Math.pow(Math.random(), HEIGHT_POWER) * SPAWN_Y + ENTITY_RADIUS + 1;
        const z = Math.random() * SPAWN_Z - SPAWN_Z / 2;
        position.set(x, y, z);
      } while (!posIsValid(position));

      arr.push({
        seed: Math.random(),
        position,
      });
    }
    return arr;
  }, []);

  if (!entities) {
    return <></>;
  }

  return (
    <>
      {entities.map((props) => (
        <GenericEntity {...props} key={props.seed} />
      ))}
    </>
  );
};

export default Entities;
