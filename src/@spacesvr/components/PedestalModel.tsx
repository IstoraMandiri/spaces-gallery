import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type PedestalModelProps = JSX.IntrinsicElements["group"] & {
  width?: number;
  height?: number;
};

const frameLipWidth = 0.1;
const frameHeight = 0.2;

type DefaultGLTFResult = GLTF & {
  nodes: any;
  materials: any;
};

const PedestalModel = (props: PedestalModelProps) => {
  const { width = 0.5, height = 1.25, children } = props;

  return (
    <group {...props}>
      <group position={[0, height, 0]}>{children}</group>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[width, height, width]} />
        <meshStandardMaterial attach="material" color="#4a4a4a" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry
          attach="geometry"
          args={[width + frameLipWidth, frameHeight, width + frameLipWidth]}
        />
        <meshStandardMaterial attach="material" color="#4a4a4a" />
      </mesh>
    </group>
  );
};

export default PedestalModel;
