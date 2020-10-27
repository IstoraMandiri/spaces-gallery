import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";

type ModelProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
};
