import * as THREE from 'three';

class Root {
  // Store all the children here
  constructor({ renderer }) {
    this.renderer = renderer;
    this.children = [];
  }

  // Add children
  appendChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  // Remove children
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  renderChildren() {}

  render() {
    let scene, camera;
    this.children.forEach(c => {
      if (c.type === 'scene') {
        scene = c;
        window.scene = scene;
      }
      if (c.type.toLowerCase().indexOf('camera') !== -1) {
        camera = c;
        camera.instance.position.z;
        window.camera = camera;
      }
    });
    if (!camera) {
      camera = {
        instance: new THREE.Camera(),
      };
    }
    if (scene && camera) {
      this.renderer.render(scene.instance, camera.instance);
    }
  }
}

export default Root;
