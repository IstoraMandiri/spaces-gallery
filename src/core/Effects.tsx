import { extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { useEffect, useRef } from "react";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
extend({ EffectComposer, RenderPass, GlitchPass, ShaderPass });

const vertShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix 
      * modelViewMatrix 
      * vec4( position, 1.0 );
  }
`;

const fragShader = `
  uniform float amount;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  float random( vec2 p ) {
    vec2 K1 = vec2(
      23.14069263277926, // e^pi (Gelfond's constant)
      2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
    );
    return fract( cos( dot(p,K1) ) * 12345.6789 );
  }

  void main() {
    vec4 color = texture2D( tDiffuse, vUv );
    vec2 uvRandom = vUv;
    uvRandom.y *= random(vec2(uvRandom.y,amount));
    color.rgb += random(uvRandom)*0.1;
    gl_FragColor = vec4( color  );
  }
`;

const Effects = () => {
  const { gl, scene, camera, size } = useThree();

  const gammaCorrection = new ShaderPass(GammaCorrectionShader);
  const composer = useRef<EffectComposer>();
  const counter = useRef(0);

  const myEffect = {
    uniforms: {
      amount: { value: 0 },
      tDiffuse: { value: null },
    },
    vertexShader: vertShader,
    fragmentShader: fragShader,
  };

  const myShaderPass = useRef(new ShaderPass(myEffect));

  useEffect(() => void composer?.current?.setSize(size.width, size.height), [
    size,
  ]);

  useEffect(() => {
    gammaCorrection.renderToScreen = true;
    composer?.current?.addPass(gammaCorrection);

    myShaderPass.current.renderToScreen = true;
    composer?.current?.addPass(myShaderPass.current);
  }, []);

  useFrame(() => {
    counter.current += 0.01;
    myShaderPass.current.uniforms["amount"].value = counter.current;
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
