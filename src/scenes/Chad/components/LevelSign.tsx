import { useLoader } from "react-three-fiber";
import { TextureLoader, Vector2 } from "three";

type LevelSignProps = {
  level: 1 | 2 | 3;
  angle: number;
} & JSX.IntrinsicElements["group"];

const Level1 =
  "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/level1.jpg";
const Level2 =
  "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/level2.jpg";
const Level3 =
  "https://d27rt3a60hh1lx.cloudfront.net/content/chadknight/level3.jpg";

const LevelSign = (props: LevelSignProps) => {
  const { level, angle, ...restProps } = props;

  const levelImg = level === 1 ? Level1 : level === 2 ? Level2 : Level3;
  const texture = useLoader(TextureLoader, levelImg);

  const ratio = new Vector2(3240, 1920).normalize().multiplyScalar(3.4);

  return (
    <group rotation={[0, angle, 0]}>
      <group position={[0, 0, -32]}>
        <group {...restProps}>
          <mesh position={[0, 0, 0.001]}>
            <planeBufferGeometry args={[ratio.x, ratio.y]} attach="geometry" />
            <meshStandardMaterial map={texture} attach="material" />
          </mesh>
          <mesh position={[0, 0, -0.2 / 2 - 0.001]}>
            <boxBufferGeometry
              args={[ratio.x, ratio.y, 0.2]}
              attach="geometry"
            />
            <meshStandardMaterial color="white" attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default LevelSign;
