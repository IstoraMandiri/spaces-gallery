import LevelSign from "./LevelSign";
import Sign from "./Sign";
import React from "react";

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
      <group name="left-stairs">
        <LevelSign
          text={"LEVEL" + "\n" + "TWO"}
          dir="up"
          rotation={[0, 0.2, 0]}
          position={[-23, -3, 11]}
        />
        <LevelSign
          text={"LEVEL" + "\n" + "ONE"}
          dir="down"
          rotation={[0, Math.PI + 0.4, 0]}
          position={[-25, 1, -4]}
        />
        <LevelSign
          text={"LEVEL" + "\n" + "THREE"}
          dir="up"
          rotation={[0, 0.2, 0]}
          position={[-23, 1, 11]}
        />
        <LevelSign
          text={"LEVEL" + "\n" + "TWO"}
          dir="down"
          rotation={[0, Math.PI + 0.4, 0]}
          position={[-25, 5, -4]}
        />
      </group>
      <group name="right-stairs">
        <LevelSign
          text={"LEVEL" + "\n" + "TWO"}
          dir="up"
          rotation={[0, -Math.PI - 0.2, 0]}
          position={[23, -3, -11]}
        />
        <LevelSign
          text={"LEVEL" + "\n" + "ONE"}
          dir="down"
          rotation={[0, 0.4, 0]}
          position={[25, 1, 4]}
        />
        <LevelSign
          text={"LEVEL" + "\n" + "THREE"}
          dir="up"
          rotation={[0, -Math.PI - 0.2, 0]}
          position={[23, 1, -11]}
        />
        <LevelSign
          text={"LEVEL" + "\n" + "TWO"}
          dir="down"
          rotation={[0, 0.4, 0]}
          position={[25, 5, 4]}
        />
      </group>
    </>
  );
};

export default Signs;
