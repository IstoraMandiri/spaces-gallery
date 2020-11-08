import LevelSign from "./LevelSign";
import Sign from "./Sign";
const Signs = () => {
  return (
    <>
      <Sign
        text="Jump Off to Visit Virtual Genesis"
        position={[-2.5, 1, 23.75]}
      />
      <Sign
        text="Jump Off to Visit Virtual Genesis"
        position={[2.5, 1, -23.75]}
        rotation={[0, Math.PI, 0]}
      />
      <LevelSign
        level={1}
        angle={Math.PI / 2 + 0.45}
        rotation={[0, 0, 0]}
        position={[0, -2.5, 0]}
      />
      <LevelSign
        level={2}
        angle={Math.PI / 2 - 0.2}
        rotation={[0, 0, 0]}
        position={[0, 1, 0]}
      />
      <LevelSign
        level={2}
        angle={Math.PI / 2 + 0.45}
        rotation={[0, 0, 0]}
        position={[0, 1, 0]}
      />
      <LevelSign
        level={3}
        angle={Math.PI / 2 - 0.2}
        rotation={[0, 0, 0]}
        position={[0, 5, 0]}
      />
      <LevelSign
        level={1}
        angle={-Math.PI / 2 + 0.45}
        rotation={[0, 0, 0]}
        position={[0, -2.5, 0]}
      />
      <LevelSign
        level={2}
        angle={-Math.PI / 2 - 0.2}
        rotation={[0, 0, 0]}
        position={[0, 1, 0]}
      />
      <LevelSign
        level={2}
        angle={-Math.PI / 2 + 0.45}
        rotation={[0, 0, 0]}
        position={[0, 1, 0]}
      />
      <LevelSign
        level={3}
        angle={-Math.PI / 2 - 0.2}
        rotation={[0, 0, 0]}
        position={[0, 5, 0]}
      />
    </>
  );
};

export default Signs;
