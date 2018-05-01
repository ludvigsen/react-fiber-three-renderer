import Reconciler from 'react-reconciler';
import emptyObject from 'fbjs/lib/emptyObject';

import createElement from '../utils/createElement';

export const ReactFiberThreeRenderer = Reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
    }
  },

  createInstance(type, props, internalInstanceHandle) {
    // console.info('createInstance: ', type, props, internalInstanceHandle);
    return createElement(type, props, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // console.info('createTextInstance: ', text, rootContainerInstance, internalInstanceHandle);
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    // console.info('finalizeInitializeChildren: ', wordElement, type, props);
    return false;
  },

  getPublicInstance(inst) {
    // console.info('getPublicInstance: ', inst);
    return inst;
  },

  prepareForCommit() {
    // console.info('prepareForCommit');
    // noop
  },

  prepareUpdate(node, type, oldProps, newProps) {
    // console.info('prepareUpdate: ', node, type, oldProps, newProps);
    if (oldProps !== newProps) {
      return true;
    } else {
      return false;
    }
  },

  resetAfterCommit() {
    // console.info('resetAfterCommit');
    // noop
  },

  resetTextContent(wordElement) {
    // console.info('resetTextContent: ', wordElement);
    // noop
  },

  getRootHostContext(rootInstance) {
    // console.info('getRootHostContext: ', rootInstance);
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    // console.info('getChildHostContext');
    return emptyObject;
  },

  shouldSetTextContent(type, props) {
    // console.info('shouldSetTextContent: ', type, props);
    return false;
  },

  now: () => performance.now(),

  mutation: {
    appendChild(parentInstance, child) {
      // console.info('mutation.appendChild: ', parentInstance, child);
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        console.warn('Not possible to append child ', child, ' to ', parentInstance);
      }
    },

    appendChildToContainer(parentInstance, child) {
      // console.info('mutation.appendChildToContainer: ', parentInstance, child);
      if (parentInstance.appendChild) {
        parentInstance.appendChild(child);
      } else {
        console.warn('Not possible to append child ', child, ' to ', parentInstance);
      }
    },

    removeChild(parentInstance, child) {
      // console.info('mutation.removeChild: ', parentInstance, child);
      parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      // console.info('mutation.removeChildFromContainer: ', parentInstance, child);
      parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      // console.info('mutation.insertBefore: ', parentInstance, child, beforeChild);
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // console.info('mutation.commitUpdate: ', instance, updatePayload, type, oldProps, newProps);
      if (instance.componentWillReceiveProps && oldProps !== newProps) {
        instance.componentWillReceiveProps(newProps);
      }
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // console.info('mutation.commitMount: ', instance, updatePayload, type, oldProps, newProps);
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      // console.info('mutation.commitTextUpdate: ', textInstance, oldText, newText);
      textInstance.children = newText;
    },
  },
});
