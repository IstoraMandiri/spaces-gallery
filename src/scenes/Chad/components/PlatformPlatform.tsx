import { useBox } from "@react-three/cannon";
import { CHAD_COLOR } from "../index";

const ChadSceneSelector = () => {
  const [ref] = useBox(() => ({
    type: "Static",
    position: [0, -2.75, 0],
    args: [2, 1, 2],
  }));

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[2, 1, 2]} />
      <meshBasicMaterial
        color={CHAD_COLOR}
        transparent={true}
        opacity={0.65}
        attach="material"
      />
    </mesh>
  );

  return null;
};

export default ChadSceneSelector;
