import * as THREE from 'three';

function merge(instance, props) {
  if (!instance || !props || Object.keys(props).length === 0) {
    return;
  }
  Object.keys(props).forEach(k => {
    if (k === 'children') {
      return;
    }
    try {
      instance[k] = props[k];
    } catch (e) {
      merge(instance[k], props[k]);
    }
  });
}

class Node {
  constructor(type, props, root) {
    const children = props.children;
    this.type = type;
    this.props = props;
    this.children = [];

    let key;
    Object.keys(THREE).forEach(k => {
      if (k.toLowerCase() === type.toLowerCase()) {
        key = k;
      }
    });
    const func = THREE[key].bind(THREE[key]);
    this.instance = new func();
    merge(this.instance, props);
  }

  componentWillReceiveProps(props) {
    merge(this.instance, props);
  }

  // Add children
  appendChild(child) {
    if (this.children && this.children.push) {
      child.parent = this;
      this.children.push(child);
    }
    if (this.instance && this.instance.add) {
      try {
        this.instance.add(child.instance);
      } catch (e) {
        console.error('Cannot add ', child.instance, ' to ', this.instance);
        console.error(e);
      }
    }
  }

  // Remove children
  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
    if (this.instance && this.instance.remove) {
      this.instance.remove(child.instance);
    }
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'string') {
        // No op
      } else if (typeof this.children[i] === 'object') {
        // We know it's a component so just call the render() method
        this.children[i].render();
      }
    }
  }

  render() {
    this.renderChildren();
  }
}

export default Node;
