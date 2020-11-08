import { Suspense, useRef } from "react";
import SpacesSphere from "@spacesvr/models/SpacesSphere";
import { useFrame } from "react-three-fiber";

const SPEED = 0.2;

type LogoProps = {
  floating?: boolean;
  rotating?: boolean;
} & JSX.IntrinsicElements["group"];

const Logo = (props: LogoProps) => {
  const { rotating, floating, ...restProps } = props;

  const group = useRef<THREE.Group>();

  useFrame(({ clock }) => {
    if (group.current && rotating) {
      group.current.rotation.y = clock.getElapsedTime() * SPEED;
    }

    if (group.current && floating) {
      group.current.position.y =
        0.1 * 2 * Math.sin(clock.getElapsedTime() * SPEED * 2);
    }
  });

  return (
    <group {...restProps}>
      <group ref={group}>
        <Suspense fallback={null}>
          <SpacesSphere />
        </Suspense>
      </group>
    </group>
  );
};

export default Logo;
