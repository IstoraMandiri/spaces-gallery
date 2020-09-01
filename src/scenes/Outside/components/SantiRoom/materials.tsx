import {
  TextureLoader,
  ShaderMaterial,
  Vector2,
  DoubleSide,
  Vector4,
  NearestFilter,
  MeshBasicMaterial,
} from "three";

import * as Shaders from "./shaders";

const tex =
  "https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/santi/assets/lights_a.png";
const letter =
  "https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/santi/assets/letters.png";
const diffuse =
  "https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/santi/assets/Diffuse_bake.jpg";
const BaseColor =
  "https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/content/opening/santi/assets/gallery_diffuse.png";

class FlickerMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: Shaders.passThrough,
      fragmentShader: Shaders.flicker,
    });

    const tLoader = new TextureLoader();
    const t = tLoader.load(tex);
    t.flipY = false;
    this.uniforms.lightTex = { value: t };

    this.side = DoubleSide;
  }

  step(time: number) {
    this.uniforms.time = { value: time };
  }
}

class RoomMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: Shaders.passThrough,
      fragmentShader: Shaders.room,
    });

    const tLoader = new TextureLoader();
    const t = tLoader.load(tex);
    t.flipY = false;
    const t2 = tLoader.load(diffuse);
    t2.flipY = false;

    this.uniforms.lightTex = { value: t };
    this.uniforms.roomTex = { value: t2 };

    this.side = DoubleSide;
  }

  step(time: number) {
    this.uniforms.time = { value: time };
  }
}

class CylinderMaterial extends ShaderMaterial {
  constructor(res: number) {
    super({
      vertexShader: Shaders.passThrough,
      fragmentShader: Shaders.cylinder,
    });
    this.side = DoubleSide;
    this.uniforms.tex = { value: null };
    this.uniforms.res = { value: res };
  }

  step(time: number) {
    this.uniforms.time = { value: time };
  }
}

type coord = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

class ScreenLeftMaterial extends ShaderMaterial {
  constructor(coords: coord) {
    super({
      vertexShader: Shaders.passThrough,
      fragmentShader: Shaders.screenLeft,
    });
    this.uniforms.coords = {
      value: new Vector4(coords.x1, coords.x2, coords.y1, coords.y2),
    };

    const tLoader = new TextureLoader();
    const t = tLoader.load(letter);
    t.flipY = false;

    t.minFilter = NearestFilter;
    t.magFilter = NearestFilter;

    this.uniforms.letterTex = { value: t };
    this.uniforms.letterPosition = { value: new Vector2() };
    this.currentLetter = 0;

    setTimeout(() => this.switchLetter(), 500);
  }

  switchLetter() {
    if (this.currentLetter < 19) this.currentLetter++;
    else this.currentLetter = 0;
    this.uniforms.letterPosition = {
      value: new Vector2(
        this.currentLetter % 7,
        Math.floor(this.currentLetter / 7)
      ),
    };
    setTimeout(() => this.switchLetter(), 200 + Math.random() * 400);
  }

  step(time: number) {
    this.uniforms.time = { value: time };
  }
}

class ScreenRightMaterial extends ShaderMaterial {
  constructor(coords: coord) {
    super({
      vertexShader: Shaders.passThrough,
      fragmentShader: Shaders.screenRight,
    });
    this.uniforms.coords = {
      value: new Vector4(coords.x1, coords.x2, coords.y1, coords.y2),
    };

    const tLoader = new TextureLoader();
    const t = tLoader.load(letter);
    t.flipY = false;

    t.minFilter = NearestFilter;
    t.magFilter = NearestFilter;

    this.uniforms.tex = { value: t };
  }

  step(time: number) {
    this.uniforms.time = { value: time };
  }
}

class GalleryMaterial extends MeshBasicMaterial {
  constructor() {
    super();

    this.side = DoubleSide;

    const tLoader = new TextureLoader();
    const t = tLoader.load(BaseColor);
    t.flipY = false;

    this.map = t;
  }
}

class SpinnerMaterial extends ShaderMaterial {
  constructor(coords: coord) {
    super({
      vertexShader: Shaders.passThrough,
      fragmentShader: Shaders.spinner,
    });

    const tLoader = new TextureLoader();
    const t = tLoader.load(tex);
    t.flipY = false;
    this.uniforms.lightTex = { value: t };
    this.uniforms.coords = {
      value: new Vector4(coords.x1, coords.x2, coords.y1, coords.y2),
    };

    this.side = DoubleSide;
  }

  step(time: number) {
    this.uniforms.time = { value: time };
  }
}

export {
  FlickerMaterial,
  CylinderMaterial,
  ScreenLeftMaterial,
  ScreenRightMaterial,
  GalleryMaterial,
  SpinnerMaterial,
  RoomMaterial,
};
