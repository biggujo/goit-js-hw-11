import axios from "axios";

const BASE_URL = "https://pixabay.com/api";

axios.defaults.params = {
  key: "38308184-41247c978e0d2604524b8abfa",
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
};

export class PixabayApiService {
  static PAGE_STEP = 40;

  #query;
  #maxPage;
  #currentPage;

  constructor() {
    this.query = "";
    this.currentPage = 1;
  }

  async fetchImagesByQuery() {
    const params = {
      q: this.query,
      page: this.currentPage,
      per_page: PixabayApiService.PAGE_STEP,
    };

    const response = await axios.get(`${BASE_URL}`, {
      params,
    });

    console.log(response);

    return response.data;
  }

  incrementPage() {
    this.currentPage += 1;
  }

  resetPageCount() {
    this.currentPage = 1;
  }

  hasExceededMaxPage() {
    return this.currentPage > this.maxPage;
  }

  get query() {
    return this.#query;
  }

  set query(value) {
    this.#query = value;
  }

  get maxPage() {
    return this.#maxPage;
  }

  set maxPage(value) {
    this.#maxPage = value;
  }

  get currentPage() {
    return this.#currentPage;
  }

  set currentPage(value) {
    this.#currentPage = value;
  }
}
