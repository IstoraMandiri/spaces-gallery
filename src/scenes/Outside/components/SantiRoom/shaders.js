export const cylinder = `
uniform float time;
uniform vec2 res;

uniform sampler2D tex;

varying vec2 vUv;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
    float uvx = abs( vUv.x - 0.5 ) / ( 0.5 - 0.345327 );
    float uvy = ( vUv.y - ( 1.0 - 0.998506 ) ) / ( 0.998506 - 0.920523 );
    float n = snoise3( vec3( floor( uvx * res.x ), floor( uvy * res.y ), time ) * 100.0 );
    
    float lx = smoothstep( 0.9, 0.901, mod( uvx, 1.0 / res.x ) * res.x );
    float ly = smoothstep( 0.9, 0.901, mod( uvy, 1.0 / res.y ) * res.y );

    vec3 ca = texture2D( tex, vec2( uvx, uvy ) ).rrr * ( 0.7 + 0.2 * n );
    ca -= lx + ly - 0.03;

    gl_FragColor = vec4( ca, 1.0 );
}
`;

export const feedback = `
uniform float time;
uniform sampler2D data;
uniform vec2 size;

const float PI = 3.1415926535897932384626433832795;
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void decode(inout float array[8], float dec ){
    float r = dec;
    array[0] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[1] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[2] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[3] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[4] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[5] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[6] = ceil( mod( r, 2.0 ) );
    r = floor( r / 2.0 );
    array[7] = ceil( mod( r, 2.0 ) );
} 

void main()\t{

    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec2 inc = vec2( 1.0 ) / size;
    float l = uv.x - inc.x;
    float r = uv.x + inc.x;
    float b = uv.y - inc.y;
    float t = uv.y + inc.y;

    vec4 position = texture2D( texturePosition, uv );
    vec3 lt = texture2D( texturePosition, vec2( l, t ) ).rgb;
    vec3 rt = texture2D( texturePosition, vec2( r, t ) ).rgb;
    vec3 ll = texture2D( texturePosition, vec2( l, uv.y ) ).rgb;
    vec3 rr = texture2D( texturePosition, vec2( r, uv.y ) ).rgb;
    vec3 lb = texture2D( texturePosition, vec2( l, b ) ).rgb;
    vec3 rb = texture2D( texturePosition, vec2( r, b ) ).rgb;

    float k = position.r;

    float n = ( snoise2( vec2( uv.x * 10.01, time * 0.1 ) ) + 1.0 ) * 0.5;
    
    if( uv.x < 0.005 ) k = smoothstep( 0.5, 0.5, ( 1.0 + snoise2( vec2( uv.y * 0.10, time * 10.0 ) ) ) * 0.5 );
    else {
        float ttt[8];
        decode( ttt, floor( n * 255.0 )  );
        // if( lb.r == 0.0 && ll.r == 0.0 && lt.r == 0.0 ) k = ttt[0];
        if( lb.r == 0.0 && ll.r == 0.0 && lt.r == 1.0 ) k = ttt[1];
        if( lb.r == 0.0 && ll.r == 1.0 && lt.r == 0.0 ) k = ttt[2];
        // if( lb.r == 1.0 && ll.r == 0.0 && lt.r == 0.0 ) k = ttt[3];
        if( lb.r == 0.0 && ll.r == 0.0 && lt.r == 1.0 ) k = ttt[4];
        if( lb.r == 1.0 && ll.r == 0.0 && lt.r == 1.0 ) k = ttt[5];
        if( lb.r == 1.0 && ll.r == 1.0 && lt.r == 0.0 ) k = ttt[6];
        if( lb.r == 1.0 && ll.r == 1.0 && lt.r == 1.0 ) k = ttt[7];
    }

    gl_FragColor = vec4( k );
}
`;

export const flicker = `
uniform sampler2D lightTex;
uniform float time;
varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
    vec4 l = texture2D( lightTex, vUv );
    float n = ( snoise2( vec2( time * 0.01, 1.0 ) ) + 1.0 ) * 0.5;
    
    // main screen
    float l1 = l.r * ( 0.9 + 0.1 * n );

    // left screen
    float l2 = 0.0;
    float n2 = ( snoise2( vec2( 10.0, time * 0.01 ) ) + 1.0 ) * 0.5;
    if( n2 > 0.8 ) l2 = l.g * 1.0;

    // right screen
    float n3 = ( snoise2( vec2( 100.0, time * 0.01) ) + 1.0 ) * 0.5;
    float l3 = l.b * ( 0.2 + 0.8 * n3 );

    // blend
    vec3 cout = vec3( l1 + l2 + l3 );

    gl_FragColor = vec4( cout, 1.0 );
}
`;

export const passThrough = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const room = `
uniform sampler2D lightTex;
uniform sampler2D roomTex;
uniform float time;
varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
    vec4 l = texture2D( lightTex, vUv );
    vec4 r = texture2D( roomTex, vUv );
    float n = ( snoise2( vec2( time * 0.01, 1.0 ) ) + 1.0 ) * 0.5;
    
    // main screen
    float l1 = l.r * ( 0.9 + 0.1 * n );

    // left screen
    float l2 = 0.0;
    float n2 = ( snoise2( vec2( 10.0, time * 0.01 ) ) + 1.0 ) * 0.5;
    if( n2 > 0.8 ) l2 = l.g * 1.0;

    // right screen
    float n3 = ( snoise2( vec2( 100.0, time * 0.01) ) + 1.0 ) * 0.5;
    float l3 = l.b * ( 0.2 + 0.8 * n3 );

    // blend
    vec3 cout = r.rgb + vec3( l1 + l2 + l3 ) * smoothstep( 0.0, 0.8, ( 1.0 - r.r ) );

    

    gl_FragColor = vec4( cout, 1.0 );
}
`;

export const screenLeft = `
uniform float time;
uniform vec4 coords;
uniform vec2 letterPosition;
uniform sampler2D letterTex;

varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {

    float uvx = 1.0 - ( vUv.x - coords.x ) / ( coords.y - coords.x );
    float uvy = 1.0 - ( vUv.y - ( 1.0 - coords.z ) ) / ( coords.z - coords.w );
    
    float n2 = ( snoise2( vec2( 10.0, time * 0.01 ) ) + 1.0 ) * 0.5;

    vec2 offset = vec2( 0.1320800781, 0.2333984375 );

    float n = ( snoise3( vec3( uvx * offset.x * 1000.0, uvy * offset.y * 1000.0, time ) ) + 1.0 ) * 0.5;

    float c = texture2D( letterTex, vec2( uvx * offset.x + offset.x * letterPosition.x , uvy * offset.y + offset.y * letterPosition.y ) ).r;
    
    if( n2 > 0.8 ) c = 1.0 - c;
    c += n * 0.2;
    c *= 0.85;

    gl_FragColor = vec4( vec3( c ), 1.0 );
}
`;

export const screenRight = `
uniform float time;
uniform vec4 coords;
uniform sampler2D tex;

varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {

    float uvx = 1.0 - ( vUv.x - coords.x ) / ( coords.y - coords.x );
    float uvy = 1.0 - ( vUv.y - ( 1.0 - coords.z ) ) / ( coords.z - coords.w );
    
    float n2 = ( snoise2( vec2( 10.0, time * 0.01 ) ) + 1.0 ) * 0.5;

    vec2 offset = vec2( 0.1320800781, 0.2333984375 );

    float n = ( snoise3( vec3( uvx * offset.x * 1000.0, uvy * offset.y * 1000.0, time ) ) + 1.0 ) * 0.5;

    float c = texture2D( tex, vec2( uvx * offset.x * 0.5 , uvy * offset.y ) ).r;
    
    // if( n2 > 0.8 ) c = 1.0 - c;
    c += n * 0.2;
    c *= 0.85;

    gl_FragColor = vec4( vec3( c ), 1.0 );
}
`;

export const spinner = `
uniform sampler2D lightTex;
uniform float time;
uniform vec4 coords;
varying vec2 vUv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {
    vec4 l = texture2D( lightTex, vUv );
    float n = ( snoise2( vec2( time * 0.01, 1.0 ) ) + 1.0 ) * 0.5;
    
    float uvx = 1.0 - ( vUv.x - coords.x ) / ( coords.y - coords.x );
    float uvy = 1.0 - ( vUv.y - ( 1.0 - coords.z ) ) / ( coords.z - coords.w );

    // main screen
    float l1 = l.r * ( 0.9 + 0.1 * n );

    // left screen
    float l2 = 0.0;
    float n2 = ( snoise2( vec2( 10.0, time * 0.01 ) ) + 1.0 ) * 0.5;
    if( n2 > 0.8 ) l2 = l.g * 1.0;

    // right screen
    float n3 = ( snoise2( vec2( 100.0, time * 0.01) ) + 1.0 ) * 0.5;
    float l3 = l.b * ( 0.2 + 0.8 * n3 );

    // blend
    float cout = l1 + l2 + l3;
    cout *= 0.4;
    cout += 0.3 * smoothstep( 0.96, 0.9601, mod( uvx + time * 0.00035, 0.1 ) * 10.0 );

    gl_FragColor = vec4( vec3( cout ), 1.0 );
}
`;
