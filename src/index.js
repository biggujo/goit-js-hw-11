import { fetchImagesByQuery } from "./js/api-service";

// fetchImagesByQuery("ukraine")
// .then(console.log)
// .catch((reason) => console.log(reason));

const refs = {
  form: document.getElementById("search-form"),
  gallery: document.querySelector(".gallery"),
};

refs.form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();

  const { searchQuery } = event.currentTarget.elements;
  const searchValue = searchQuery.value;

  try {
    const queryResults = (await fetchImagesByQuery(searchValue));

    if (queryResults.total === 0) {
      throw new Error(
        "Sorry, there are no images matching your search query. Please try again.");
    }

    const markup = createCardsMarkup(queryResults.hits);
    renderCardsMarkup(markup);
  } catch (error) {
    console.log(error.message);
    // console.log("No results found");
  }
}

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
          </div>`;
  }).join("");
}

function renderCardsMarkup(markup) {
  refs.gallery.innerHTML = markup;
}
