import { isMobile } from "react-device-detect";
import MobilePause from "./components/MobilePause";
import React from "react";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";
import DesktopPause from "./components/DesktopPause";

type PauseMenuProps = {
  useEnvStore: EnvironmentStoreHook;
  artist?: string;
  title?: string;
  link?: string;
};

const PauseMenu = (props: PauseMenuProps) => {
  const { useEnvStore, artist, title, link } = props;

  return (
    <>
      <DesktopPause
        useEnvStore={useEnvStore}
        artist={artist}
        link={link}
        title={title}
      />
      {isMobile && <MobilePause useEnvStore={useEnvStore} />}
    </>
  );
};

export default PauseMenu;
