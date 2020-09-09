import { useCompoundBody } from "use-cannon";

type CapsuleColliderProps = {
  initPos?: [number, number, number];
};

// height of 1
const RADIUS = 0.2;
const HEIGHT = 0.6;

const sphereProps = { type: "Sphere", args: [RADIUS] };
const sphere1 = { ...sphereProps, position: [0, HEIGHT / 3, 0] };
const sphere2 = { ...sphereProps, position: [0, HEIGHT / 2, 0] };
const sphere3 = { ...sphereProps, position: [0, (HEIGHT * 2) / 3, 0] };

export const useCapsuleCollider = (props: CapsuleColliderProps) => {
  const { initPos = [0, 0, 0] } = props;

  const defaultProps = {
    mass: 0,
    position: initPos,
    segments: 8,
    friction: 0.3,
    fixedRotation: true,
    type: "Dynamic",
  };

  const compoundBody = useCompoundBody(() => ({
    ...defaultProps,
    // @ts-ignore
    shapes: [sphere1, sphere2, sphere3],
  }));

  return compoundBody;
};

export const VisibleCapsuleCollider = () => {
  const createSphere = (sphere: any) => (
    <mesh position={sphere.position}>
      <sphereBufferGeometry args={sphere.args} attach="geometry" />
      <meshStandardMaterial color="red" attach="material" wireframe={true} />
    </mesh>
  );

  return (
    <group name="collider" position={[0.5, -HEIGHT, 0]}>
      {createSphere(sphere1)}
      {createSphere(sphere2)}
      {createSphere(sphere3)}
    </group>
  );
};
