import { Notify } from "notiflix";

import { refs } from "./js/refs";
import { PixabayApiService } from "./js/pixabay-api-service";
import CardService from "./js/card-service";

let isFirstPage = true;

const pixabayApiService = new PixabayApiService();

refs.form.addEventListener("submit", handleFormSubmit);
refs.loadMoreBtn.buttonRef.addEventListener("click", handleLoadMore);

async function handleFormSubmit(event) {
  event.preventDefault();

  CardService.clearCardsGallery();
  pixabayApiService.resetPageCount();

  isFirstPage = true;

  pixabayApiService.query = event.currentTarget.elements.searchQuery.value;
  await loadData();
}

async function handleLoadMore() {
  await loadData();
}

async function loadData() {
  refs.loadMoreBtn.hide();

  try {
    if (pixabayApiService.hasExceededMaxPage()) {
      throw new Error(
        "We're sorry, but you've reached the end of search results.");
    }

    const {
      totalHits,
      hits,
    } = await pixabayApiService.fetchImagesByQuery();

    if (totalHits === 0) {
      throw new Error(
        "Sorry, there are no images matching your search query. Please try again.");
    }

    if (isFirstPage) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    isFirstPage = false;

    setMaxPage(totalHits);

    CardService.renderCardsMarkup(CardService.createCardsMarkup(hits));

    console.log({
      totalHits,
      hits,
    });

    pixabayApiService.incrementPage();

    refs.loadMoreBtn.show();
  } catch (error) {
    Notify.failure(error.message);
  }
}

function setMaxPage(totalHits) {
  pixabayApiService.maxPage = Math.ceil(totalHits / PixabayApiService.PAGE_STEP);
}
