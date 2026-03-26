import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Polyfill for Radix UI components that use ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Polyfill for Radix UI Popover that uses DOMRect
global.DOMRect = class DOMRect {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  top = 0;
  right = 0;
  bottom = 0;
  left = 0;

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.left = x;
  }

  toJSON() {
    return JSON.stringify(this);
  }

  static fromRect(rect?: DOMRectInit) {
    return new DOMRect(rect?.x, rect?.y, rect?.width, rect?.height);
  }
};

// Mock scrollIntoView for cmdk
Element.prototype.scrollIntoView = jest.fn();

// Mock hasPointerCapture for Radix UI
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}
