import { EnvironmentStoreHook } from "stores/environment";

type ModelProps = JSX.IntrinsicElements["group"] & {
  useEnvStore: EnvironmentStoreHook;
};
