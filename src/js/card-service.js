import { refs } from "./refs";

function createCardsMarkup(queryResultsArray) {
  return queryResultsArray.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => {
    return `<div class="photo-card">
              <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                <div class="info">
                  <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                  </p>
                  <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                  </p>
                  <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                  </p>
                  <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                  </p>
                </div>
              </a>
          </div>`;
  }).join("");
}

function renderCardsMarkup(markup) {
  refs.gallery.insertAdjacentHTML("beforeend", markup);
}

function clearCardsGallery() {
  refs.gallery.innerHTML = "";
}

export default {
  createCardsMarkup,
  renderCardsMarkup,
  clearCardsGallery,
};
