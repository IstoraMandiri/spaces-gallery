import { ContactShadows } from "@react-three/drei";

const PLANE_WIDTH = 200;
const PLANE_HEIGHT = 200;
const CAMERA_HEIGHT = 0.3;

const state = {
  shadow: {
    blur: 3.5,
    darkness: 1,
    opacity: 1,
  },
  plane: {
    color: "#ffffff",
    opacity: 1,
  },
  showWireframe: false,
};

const Floor = () => {
  return (
    <group>
      <ContactShadows
        opacity={1}
        width={1}
        height={1}
        blur={1} // Amount of blue (default=1)
        far={10} // Focal distance (default=10)
        resolution={256} // Rendertarget resolution (default=256)
      />
      <group rotation-x={-Math.PI / 2}>
        <mesh>
          <planeBufferGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
          <meshStandardMaterial color={"white"} />
        </mesh>
      </group>
    </group>
  );
};

export default Floor;
