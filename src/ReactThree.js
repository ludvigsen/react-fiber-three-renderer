import React, { Component } from 'react';
import * as THREE from 'three';
import createElement from './utils/createElement';
import { ReactFiberThreeRenderer } from './renderer';

class ReactThree extends Component {
  constructor(props, context) {
    super(props, context);
    this._domRef = this._domRef.bind(this);
    if (props.renderer) {
      this._renderer = props.renderer;
    } else {
      this._renderer = new THREE.WebGLRenderer({ antialias: true });
    }
    this.loop = this.loop.bind(this);
    this.last = this.timestamp();
    if (props.fps) {
      this.fpsInterval = 1000 / props.fps;
      this.loop();
    }
  }
  timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }
  loop() {
    requestAnimationFrame(this.loop);

    const now = this.timestamp();
    const elapsed = now - this.last;

    if (this._container && elapsed > this.fpsInterval) {
      this.last = now - elapsed % this.fpsInterval;
      this._container.render();
    }
  }
  componentDidUpdate() {
    ReactFiberThreeRenderer.updateContainer(this.props.children, this._node, null);
    if (!this.props.fps) {
      this._container.render();
    }
  }
  componentWillReceiveProps(props) {
    if (props.fps && !this.running) {
      this.fpsInterval = 1000 / props.fps;
      this.loop();
    }
  }
  _render() {
    ReactFiberThreeRenderer.updateContainer(this.props.children, this._node, null);
    this._container.render();
  }
  _domRef(d) {
    this._domNode = d;
    this._domNode.appendChild(this._renderer.domElement);
    this._container = createElement('ROOT', { renderer: this._renderer });
    this._node = ReactFiberThreeRenderer.createContainer(this._container);
    this._render();
  }
  render() {
    return React.createElement('div', { ref: this._domRef });
  }
}

export default ReactThree;
