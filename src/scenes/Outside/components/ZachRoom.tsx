import React, { useMemo, useRef } from "react";
import FramedImage from "three-components/FramedImage";
import {
  DoubleSide,
  Mesh,
  ShaderMaterial,
  Uniform,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { useFrame } from "react-three-fiber";

const SHADER = `
  #define BALLS 4
  #define PI 3.14159265358979323846264338327950
  #define TWO_PI PI * 2.0

  mat2 rotate2d(float a){
    return mat2(cos(a), -sin(a), sin(a), cos(a));
  }

  void main () {
    vec2 uv = -1. + 2.* vUv.xy;
    uv.x *= resolution.x/resolution.y;
    gl_FragColor = vec4(0);
    uv = normalize(uv) * length(uv);
    vec2 uv2 = uv * zoom/5.;
    vec2 uv3 = uv * zoom/15.;
    uv = mix(uv2, uv3, abs(.1*sin(time/200.)));
    float dist = distance(uv, vec2(0));
    float thing = dist * .001*sin(shapeMultiplier*dot(uv2, uv3)/dist - time);
    uv *= rotate2d(rotation * (dist - time/20.));
    float grid = (cos(uv.x * xMultiplier - time) - sin(uv.y * yMultiplier + time));
    uv /= colorSpread * thing  * grid;
    uv*=dist;
    for (int i = 0; i < BALLS; i++) {
      float t = float(i) * PI / float(BALLS);
      vec2 p = vec2(sin(t), cos(t)); 
      p += cos(time/20. + float(i) * PI);
      vec3 col = cos(vec3(0, 1, -1) * PI * 2. / 3. + PI * (time / 50. + float(i) / 5.)) * 0.5 + 0.5;
      gl_FragColor += vec4(ballSize  / length(uv + p * colorMultiplier) * col, 1.0);
    }
    gl_FragColor.xyz = glow * brightness * pow(gl_FragColor.xyz, vec3(contrast));
    gl_FragColor.w = 1.0;
  }
`;

const UNIFORMS = {
  zoom: new Uniform(2.14),
  xMultiplier: new Uniform(63.13),
  yMultiplier: new Uniform(0),
  ballSize: new Uniform(1.18),
  colorSpread: new Uniform(2.77),
  colorMultiplier: new Uniform(282.59),
  shapeMultiplier: new Uniform(21.93),
  glow: new Uniform(10350.68),
  contrast: new Uniform(4.57),
  rotation: new Uniform(4.072),
  brightness: new Uniform(11311.66),
};

const ZachRoom = () => {
  const uniforms = {
    resolution: new Uniform(new Vector2(2000, 2000)),
    time: new Uniform(0),
    ...UNIFORMS,
  };

  const group = useRef<Mesh>();

  const printUniforms = () => {
    return Object.keys(uniforms).reduce((acc, key) => {
      // @ts-ignore
      let { value } = uniforms[key];
      let type = typeof value;
      // Coerce strings to floats (useful when feeding data from HTML inputs).
      if (type === "string") {
        value = parseFloat(value);
        type = "number";
      }
      if (value instanceof Vector2) {
        // @ts-ignore
        type = "vec2";
      }
      if (value instanceof Vector3) {
        // @ts-ignore
        type = "vec3";
      }
      if (value instanceof Vector4) {
        // @ts-ignore
        type = "vec4";
      }
      switch (type) {
        case "number":
          acc += `uniform float ${key};\n`;
          break;
        case "boolean":
          acc += `uniform bool ${key};\n`;
          break;
        // @ts-ignore
        case "vec2":
          acc += `uniform vec2 ${key};\n`;
          break;
        // @ts-ignore
        case "vec3":
          acc += `uniform vec3 ${key};\n`;
          break;
        // @ts-ignore
        case "vec4":
          acc += `uniform vec4 ${key};\n`;
          break;
      }
      return acc;
    }, `varying vec2 vUv;`);
  };

  const material = useRef(
    new ShaderMaterial({
      uniforms: uniforms,
      side: DoubleSide,
      vertexShader: `
        ${printUniforms()}
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        ${printUniforms()}
        ${SHADER}
      `,
    })
  );

  useFrame(({ clock }) => {
    material.current.uniforms.time.value = clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.x = clock.getElapsedTime() / 8;
      group.current.rotation.y = clock.getElapsedTime() / 9;
      group.current.rotation.z = clock.getElapsedTime() / 10;
    }
  });

  return (
    <group rotation={[0, Math.PI, 0]}>
      <group position={[0, 5.5, -40]}>
        <mesh material={material.current} ref={group}>
          <boxBufferGeometry attach="geometry" args={[3.5, 3.5, 3.5]} />
        </mesh>
      </group>
    </group>
  );
};

export default ZachRoom;
