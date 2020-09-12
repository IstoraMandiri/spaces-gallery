export const lokfrag = `
  uniform vec3 baseColor;
  uniform vec3 offsetModifier;
    const mat2 m = mat2(0.80,  0.60, -0.60,  0.80);

    float noise(in vec2 p) {
      return sin(p.x)*sin(p.y);
    }

    float fbm4( vec2 p ) {
        float f = 0.0;
        f += 0.5000 * noise( p ); p = m * p * 2.02;
        f += 0.2500 * noise( p ); p = m * p * 2.03;
        f += 0.1250 * noise( p ); p = m * p * 2.01;
        f += 0.0625 * noise( p );
        return f / 0.9375;
    }

    float fbm6( vec2 p ) {
        float f = 0.0;
        f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
        f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
        f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
        f += 0.031250*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.015625*(0.5+0.5*noise( p ));
        return f/0.96875;
    }

    float pattern (vec2 p, float time) {
      float vout = fbm4( p + time + fbm6( p + fbm4( p + time )) );
      return abs(vout);
    }

void main (void) {
  vec3 color = vec3(
    1.0 - pattern(vec2(vUv * 5.0 + time * 5.0) +  -offsetModifier.r * cos(time * 0.15), time),
    1.0 - pattern(vec2(vUv * 5.0 + time * 5.0) +  offsetModifier.g * cos(time * 0.15), time),
    1.0 - pattern(vec2(vUv * 5.0 + time * 5.0) +  offsetModifier.b * cos(time * 0.15), time)
  );
  if (length(gl_PointCoord.xy - 0.5) > 0.5) {
    discard;
  } else {

    gl_FragColor = vec4(baseColor * color, color.r);
  }
}

  `;

export const lokvertex = `
    mat3 rotateX (float rad) {
      float c = cos(rad);
      float s = sin(rad);
      return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
      );
    }

    mat3 rotateY (float rad) {
      float c = cos(rad);
      float s = sin(rad);
      return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
      );
    }

    mat3 rotateZ (float rad) {
      float c = cos(rad);
      float s = sin(rad);
      return mat3(
        c, s, 0.0,
        -s, c, 0.0,
        0.0, 0.0, 1.0
      );
    }


    void main(void) {
      vec3 nPos = position;
      
      // nPos.x += sin(nPos.y * 0.1 + time * 10.0) * 10.0;
      
      nPos.xyz *= rotateX(nPos.x * 0.02 * 3.14159265 * 2.0 * twisterX + sin(time * twisterSpeedX));
      nPos.xyz *= rotateY(nPos.y * 0.02 * 3.14159265 * 2.0 * twisterY + sin(time * twisterSpeedY));
      nPos.xyz *= rotateZ(nPos.z * 0.02 * 3.14159265 * 2.0 * twisterZ + sin(time * twisterSpeedZ));
      
      nPos.xyz += normalize(nPos.xyz) * sin(nPos.x * twisterX);
      nPos.xyz += normalize(nPos.xyz) * sin(nPos.y * twisterY);
      nPos.xyz += normalize(nPos.xyz) * sin(nPos.z * twisterZ);

      vUv = uv;
      gl_PointSize = pointSize;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(nPos, 1.0);
    }

  `;
