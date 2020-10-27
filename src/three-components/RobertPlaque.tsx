import React from "react";
import { usePlane } from "@react-three/cannon";
import Robert0 from "../models/Robert0";
import Robert1 from "../models/Robert1";
import Robert2 from "../models/Robert2";
import Robert3 from "../models/Robert3";
import Robert4 from "../models/Robert4";
import Robert5 from "../models/Robert5";
import { EnvironmentStoreHook } from "../stores/environment";

const SCALE = 100;

type PlaqueItem = {
  Model: any;
  url: string;
};

const PlaqueLookup: PlaqueItem[] = [
  { Model: Robert0, url: "0" },
  { Model: Robert1, url: "1" },
  { Model: Robert2, url: "2" },
  { Model: Robert3, url: "3" },
  { Model: Robert4, url: "4" },
  { Model: Robert5, url: "5" },
];

type RobertProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
  label: string;
};

const RobertPlaque = (props: RobertProps) => {
  const { useEnvStore, label } = props;

  const plaque = PlaqueLookup.find((tel) => tel.url === label);

  if (!plaque) {
    return null;
  }

  const { Model } = plaque;

  return (
    <group {...props}>
      <group scale={[SCALE, SCALE, SCALE]}>
        {/* @ts-ignore */}
        <Model useEnvStore={useEnvStore} />
      </group>
    </group>
  );
};

export default RobertPlaque;
