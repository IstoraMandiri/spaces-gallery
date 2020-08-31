import { extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { useEffect, useRef } from "react";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
extend({ EffectComposer, RenderPass, GlitchPass, ShaderPass, BloomPass });

const Effects = () => {
  const { gl, scene, camera, size } = useThree();

  const gammaCorrection = new ShaderPass(GammaCorrectionShader);

  const composer = useRef<EffectComposer>();
  const counter = useRef(0);

  useEffect(() => void composer?.current?.setSize(size.width, size.height), [
    size,
  ]);

  useEffect(() => {
    gammaCorrection.renderToScreen = true;
    composer?.current?.addPass(gammaCorrection);
  }, []);

  useFrame(() => {
    counter.current += 0.01;
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

export default Effects;
