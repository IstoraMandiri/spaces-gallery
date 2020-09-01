import {
  Group,
  Mesh,
  AnimationMixer,
  Vector2,
  Clock,
  MeshNormalMaterial,
} from "three";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as Shaders from "./shaders";

import {
  FlickerMaterial,
  CylinderMaterial,
  ScreenLeftMaterial,
  ScreenRightMaterial,
  GalleryMaterial,
  SpinnerMaterial,
  RoomMaterial,
} from "./materials";

class Room extends Group {
  constructor(gltf, renderer) {
    super();

    console.log("gltf: ");
    console.log(gltf);

    this.add(gltf.scene);
    this.clock = new Clock();

    this.mixer = new AnimationMixer(gltf.scene);
    var action = this.mixer.clipAction(gltf.animations[0]);
    action.loop = true;
    action.play();

    this.frame = 0;

    // setup GPUcompute
    this.computeSize = new Vector2(512, 256);
    this.gpuCompute = new GPUComputationRenderer(
      this.computeSize.x,
      this.computeSize.y,
      renderer
    );
    this.dtPosition = this.gpuCompute.createTexture();
    var ps = [];
    for (var i = 0; i < this.computeSize.x * this.computeSize.y; i++)
      ps.push(0, 0, 0, 1);
    this.positionVariable = this.gpuCompute.addVariable(
      "texturePosition",
      Shaders.feedback,
      this.dtPosition
    );
    this.gpuCompute.setVariableDependencies(this.positionVariable, [
      this.positionVariable,
    ]);
    this.positionUniforms = this.positionVariable.material.uniforms;
    this.gpuCompute.init();
    this.positionUniforms["time"] = { value: 0.0 };
    this.positionUniforms["size"] = {
      value: new Vector2(this.computeSize.x, this.computeSize.y),
    };

    // this.scale.set( 10, 10, 10 )

    this.objs = {};

    this.traverse((child) => {
      if (child instanceof Mesh) {
        this.objs[child.name] = child;
        if (child.name == "New_screen") {
          child.material = new CylinderMaterial(this.computeSize);
        } else if (child.name == "screen_l") {
          child.material = new ScreenLeftMaterial({
            x1: 0.006829,
            x2: 0.063423,
            y1: 0.998413,
            y2: 0.898428,
          });
        } else if (child.name == "screen_r") {
          child.material = new ScreenRightMaterial({
            x1: 0.105298,
            x2: 0.161892,
            y1: 0.998033,
            y2: 0.898048,
          });
        } else if (child.name == "Human_mesh") {
          child.material = new MeshNormalMaterial({ skinning: true });
        } else if (child.name == "Spinner") {
          child.material = new SpinnerMaterial({
            x1: 0.673123,
            x2: 0.993553,
            y1: 0.995739,
            y2: 0.942228,
          });
        } else if (child.name == "Room") {
          child.material = new RoomMaterial(child.material);
        } else if (child.name == "Gallery_cut") {
          child.material = new GalleryMaterial();
        } else {
          child.material = new FlickerMaterial(child.material);
        }
      }
    });
  }

  step(time) {
    this.positionUniforms["time"].value += 0.1;
    if (this.frame++ % 1 == 0) {
      this.gpuCompute.compute();
      this.objs.New_screen.material.uniforms.tex.value = this.gpuCompute.getCurrentRenderTarget(
        this.positionVariable
      ).texture;

      this.objs.screen_r.material.uniforms.tex.value = this.gpuCompute.getCurrentRenderTarget(
        this.positionVariable
      ).texture;
    }

    this.mixer && this.mixer.update(this.clock.getDelta());

    Object.values(this.objs).forEach(
      (m) => m.material.step && m.material.step(time)
    );
  }
}

export { Room as default };
