(() => {
  const imagePath = (value) =>
    typeof value === "string" && value.startsWith("/images/") ? `.${value}` : value;

  const backgroundPath = (value) =>
    typeof value === "string"
      ? value.replace(/url\((['"]?)\/images\//g, "url($1./images/")
      : value;

  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    const attribute = name.toLowerCase();
    if (attribute === "src" && this instanceof HTMLImageElement) {
      value = imagePath(value);
    } else if (attribute === "style") {
      value = backgroundPath(value);
    }
    return originalSetAttribute.call(this, name, value);
  };

  const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");
  Object.defineProperty(HTMLImageElement.prototype, "src", {
    ...srcDescriptor,
    set(value) {
      srcDescriptor.set.call(this, imagePath(value));
    },
  });

  const setProperty = CSSStyleDeclaration.prototype.setProperty;
  CSSStyleDeclaration.prototype.setProperty = function (name, value, priority) {
    if (name.toLowerCase() === "background-image") {
      value = backgroundPath(value);
    }
    return setProperty.call(this, name, value, priority);
  };

  Object.defineProperty(CSSStyleDeclaration.prototype, "backgroundImage", {
    configurable: true,
    enumerable: true,
    get() {
      return this.getPropertyValue("background-image");
    },
    set(value) {
      setProperty.call(this, "background-image", backgroundPath(value));
    },
  });
})();
