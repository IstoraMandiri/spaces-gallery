import { useEffect, useMemo, useRef } from "react";
import {
  Color,
  DoubleSide,
  Mesh,
  ShaderMaterial,
  SphereBufferGeometry,
  Uniform,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { useFrame } from "react-three-fiber";
import { lokfrag, lokvertex } from "./lokshaders";

const UNIFORMS = {
  pointSize: new Uniform(2.47),
  twisterX: new Uniform(0),
  twisterY: new Uniform(0),
  twisterZ: new Uniform(0),
  twisterSpeedX: new Uniform(0.074),
  twisterSpeedY: new Uniform(0.8),
  twisterSpeedZ: new Uniform(0.1),
  offsetModifier: new Uniform(new Color("#7d747d")),
};

const LokLok = (props: { color: string | undefined }) => {
  const { color } = props;

  const uniforms = {
    resolution: new Uniform(new Vector2(2000, 2000)),
    time: new Uniform(0),
    ...UNIFORMS,
    baseColor: new Uniform(new Color(color || "#28fa92")),
  };

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

  const group = useRef<Mesh>();
  const geometry = useMemo(
    () => new SphereBufferGeometry(8, 5 * 14, 3 * 14),
    []
  );
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms,
        transparent: true,
        side: DoubleSide,
        vertexShader: `
          ${printUniforms()}
          ${lokvertex}`,
        fragmentShader: `
          ${printUniforms()}
          ${lokfrag}
        `,
      }),
    []
  );

  useEffect(() => {
    material.uniforms.baseColor.value = new Color(color || "#28fa92");
  }, [color]);

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.x = clock.getElapsedTime() / 8;
      group.current.rotation.y = clock.getElapsedTime() / 9;
      group.current.rotation.z = clock.getElapsedTime() / 10;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      <group position={[0, 0, 0]}>
        <points material={material} geometry={geometry} ref={group} />
      </group>
    </group>
  );
};

export default LokLok;
