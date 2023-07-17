const isInvisibleClass = "is-invisible";

export default class LoadMoreButton {
  #buttonRef;

  constructor({
    selector,
    isShown,
  }) {
    this.buttonRef = document.querySelector(selector);

    if (isShown) {
      this.show();
    } else {
      this.hide();
    }
  }

  hide() {
    this.#buttonRef.classList.add(isInvisibleClass);
  }

  show() {
    this.#buttonRef.classList.remove(isInvisibleClass);
  }

  get buttonRef() {
    return this.#buttonRef;
  }

  set buttonRef(value) {
    this.#buttonRef = value;
  }
}
