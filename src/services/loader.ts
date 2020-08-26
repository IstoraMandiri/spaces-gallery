import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Loader } from "three";

export const loadModel = (setLoading: (l: number) => void) => {
  return (loader: Loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    (loader as GLTFLoader).setDRACOLoader(dracoLoader);
    loader.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const perc = itemsLoaded / itemsTotal;
      const newPerc = Math.min(perc, 1);
      setLoading(newPerc);
    };
  };
};
