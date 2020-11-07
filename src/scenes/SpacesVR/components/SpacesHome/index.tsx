import HomeBlue from "../../models/HomeBlue";
import HomePurple from "../../models/HomePurple";
import HomeRed from "../../models/HomeRed";
import React from "react";
import Logo from "@spacesvr/components/Logo";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group scale={[0.025, 0.025, 0.025]}>
        <HomeBlue position-x={50} />
        <HomePurple position-z={-30} />
        <HomeRed position-z={60} />
        <Logo floating rotating position={[0, 5, 0]} />
      </group>
    </group>
  );
};

export default SpacesHome;
