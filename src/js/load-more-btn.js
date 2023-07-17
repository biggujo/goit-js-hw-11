const isHiddenClass = "is-hidden";

export default class LoadMoreButton {
  #refs;

  constructor({
    selector,
    isShown,
  }) {
    this.#refs = document.querySelector(selector);

    if (isShown) {
      this.show();
    }
  }

  enable() {
    this.#refs.button.disabled = false;
    this.#refs.button.textContent = "Load more";
  }

  disable() {
    this.#refs.button.disabled = true;
    this.#refs.button.textContent = "Loading";
  }

  hide() {
    this.#refs.button.classList.add(isHiddenClass);
  }

  show() {
    this.#refs.button.classList.remove(isHiddenClass);
  }

  get refs() {
    return this.#refs;
  }
}
