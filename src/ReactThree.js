import React, { Component } from 'react';
import * as THREE from 'three';
import createElement from './utils/createElement';
import { ReactFiberThreeRenderer } from './renderer';

class ReactThree extends Component {
  constructor(props, context) {
    super(props, context);
    console.log('PROPS: ', props);
    console.log('CONTEXT: ', context);
    this._domRef = this._domRef.bind(this);
  }
  componentDidUpdate() {
    this._render();
  }
  _render() {
    console.log('RENDER: ', this._domNode);
    ReactFiberThreeRenderer.updateContainer(this.props.children, this._node, null);
    this._container.render();
  }
  _domRef(d) {
    this._domNode = d;
    this._renderer = new THREE.WebGLRenderer({ antialias: true });
    window.renderer = this._renderer;
    this._renderer.setClearColor('#FFFFFF');
    this._renderer.setSize(window.innerWidth, window.innerHeight);
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
