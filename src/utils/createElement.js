import { Root, Node } from '../components';

/**
 * Creates an element for a document
 * @param {string} type Element type
 * @param {Object} props Component props
 * @param {Object} root Root instance
 */
export default function createElement(type, props, root) {
  console.log('TYPE: ', type, props, root);
  switch (type) {
    case 'ROOT': {
      return new Root(props);
    }
    default: {
      return new Node(type, props, root);
    }
  }
  return null;
  /*const COMPONENTS = {
    ROOT: () => new WordDocument(),
    TEXT: () => new Text(root, props),
    DOCUMENT: () => new Document(root, props),
    default: undefined,
  };

  return COMPONENTS[type]() || COMPONENTS.default;*/
}

// export { createElement };
