export class PageCounter {
  #currentPage;
  #finalPage;

  constructor(finalPage) {
    this.finalPage = finalPage;
  }

  incrementPage() {
    this.currentPage += 1;
  }

  hasReachedTheFinalPage() {
    return this.currentPage >= this.finalPage;
  }

  a() {

  }

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(value) {
    this.#currentPage = value;
  }

  get finalPage() {
    return this.#finalPage;
  }

  set finalPage(value) {
    this.#finalPage = value;
  }
}
