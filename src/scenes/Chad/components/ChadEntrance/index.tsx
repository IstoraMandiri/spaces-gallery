import RightWall from "./components/RightWall";
import Credits from "./components/Credits";
import Statement from "./components/Statement";
import ButtonTest from "./components/ButtonTest";

const ChadEntrance = () => {
  return (
    <group position={[-2, -2, 65]}>
      <Statement />
      <Credits />
      <RightWall />
      <ButtonTest />
    </group>
  );
};

export default ChadEntrance;
