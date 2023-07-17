import LoadMoreButton from "./load-more-btn";

export const refs = {
  form: document.getElementById("search-form"),
  gallery: document.querySelector(".gallery"),
  loadMoreBtn: new LoadMoreButton({
    selector: ".load-more",
    isShown: false,
  }),
};
