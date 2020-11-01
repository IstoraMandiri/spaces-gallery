import React from "react";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";
import { ContainerProps } from "react-three-fiber/targets/shared/web/ResizeContainer";

type SceneProps = {
  useEnvStore: EnvironmentStoreHook;
  defaultCanvasProps: Partial<ContainerProps>;
  children?: React.ReactNode;
};

export type SceneComponent = React.ComponentType<SceneProps>;
