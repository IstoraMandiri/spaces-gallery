import { extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { useEffect, useRef } from "react";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { MusicStoreHook } from "stores/music";
import { MathUtils } from "three";
extend({
  EffectComposer,
  RenderPass,
  ShaderPass,
  AfterimagePass,
});

type ShirtsEffectsProps = {
  useMusicStore: MusicStoreHook;
};

const MIN = 130;
const MAX = 220;

const ShirtsEffects = (props: ShirtsEffectsProps) => {
  const { useMusicStore } = props;
  const { gl, scene, camera, size } = useThree();

  const aa = useMusicStore((st) => st.audioAnalyser);
  const afterImagePass = useRef(new AfterimagePass(0));

  const fxaaPass = new ShaderPass(FXAAShader);
  const pixelRatio = window ? window.devicePixelRatio : 2;
  // @ts-ignore
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (window.innerWidth * pixelRatio);
  // @ts-ignore
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (window.innerHeight * pixelRatio);

  const composer = useRef<EffectComposer>();

  useEffect(() => void composer?.current?.setSize(size.width, size.height), [
    size,
  ]);

  useEffect(() => {
    fxaaPass.renderToScreen = true;
    composer?.current?.addPass(fxaaPass);

    afterImagePass.current.renderToScreen = true;
    composer?.current?.addPass(afterImagePass.current);
  }, []);

  useFrame(() => {
    if (aa) {
      const freq = aa.getFrequencyData()[1];

      // if (freq < min) min = freq;
      // if (freq > max) max = freq;

      let newFreq = (freq - MIN) / (MAX - MIN);
      newFreq = MathUtils.clamp(newFreq, 0, 1);
      newFreq = MathUtils.lerp(0.5, 0.92, newFreq * newFreq);

      // @ts-ignore
      afterImagePass.current.uniforms["damp"].value = newFreq;
    }
    composer?.current?.render();
  }, 1);

  return (
    <>
      {/* @ts-ignore*/}
      <effectComposer ref={composer} args={[gl]}>
        {/* @ts-ignore*/}
        <renderPass attachArray="passes" args={[scene, camera]} />
        {/* @ts-ignore*/}
      </effectComposer>
    </>
  );
};

export default ShirtsEffects;
