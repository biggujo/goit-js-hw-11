const isHiddenClass = "is-hidden";

export default class LoadMoreButton {
  #buttonRef;

  constructor({
    selector,
    isShown,
  }) {
    this.buttonRef = document.querySelector(selector);

    console.log(this.buttonRef);

    console.log();

    if (isShown) {
      this.show();
    } else {
      this.hide();
    }
  }

  hide() {
    this.#buttonRef.classList.add(isHiddenClass);
  }

  show() {
    this.#buttonRef.classList.remove(isHiddenClass);
  }

  get buttonRef() {
    return this.#buttonRef;
  }

  set buttonRef(value) {
    this.#buttonRef = value;
  }
}
