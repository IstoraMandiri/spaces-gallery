import React, { useCallback, useRef, useState } from "react";
import { Raycaster, Vector3 } from "three";
import { useFrame } from "react-three-fiber";

type EffectProps = {
  targetEffect: "wireframe" | "reflection" | "glow" | "bubble" | "outline";
  raycaster: React.MutableRefObject<Raycaster>;
  effects: {
    wireframe?: boolean;
    reflection?: boolean;
    glow?: boolean;
    bubble?: boolean;
    outline?: boolean;
  };
  setEffects: any;
};

const ToggleEffect = (props: EffectProps) => {
  const { targetEffect, effects, setEffects, raycaster } = props;

  const button = useRef<THREE.Mesh>();

  const hovered = useRef<boolean>(false);
  const [scale, setScale] = useState<boolean>(false);

  useFrame(() => {
    if (button.current) {
      const intersections = raycaster.current.intersectObject(button.current);
      if (intersections && intersections.length > 0) {
        if (!hovered.current) {
          hovered.current = true;
        }
      } else {
        if (hovered.current) {
          hovered.current = false;
        }
      }
    }
  });

  const onClick = useCallback(() => {
    if (hovered) {
      // setScale(!scale)
      console.log("updateWireframe");
      setEffects({ ...effects, [targetEffect]: !effects[targetEffect] });
    }
  }, [effects, hovered]);

  document.addEventListener("click", onClick);

  return (
    <mesh ref={button}>
      <boxBufferGeometry
        attach="geometry"
        args={scale ? [2, 2, 2] : [1, 1, 1]}
      />
      <meshBasicMaterial
        attach="material"
        color={hovered.current ? "yellow" : "red"}
      />
    </mesh>
  );
};

export default ToggleEffect;
