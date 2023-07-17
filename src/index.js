import { fetchImagesByQuery } from "./js/api-service";
import { createCardsMarkup, renderCardsMarkup } from "./js/card-service";

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
  }
}
