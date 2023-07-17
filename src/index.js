import { refs } from "./js/refs";
import { PixabayApiService } from "./js/pixabay-api-service";
import CardService from "./js/card-service";

const pixabayApiService = new PixabayApiService();

refs.form.addEventListener("submit", handleFormSubmit);
refs.loadMoreBtn.buttonRef.addEventListener("click", handleLoadMore);

async function handleFormSubmit(event) {
  event.preventDefault();

  CardService.clearCardsGallery();
  pixabayApiService.resetPageCount();

  pixabayApiService.query = event.currentTarget.elements.searchQuery.value;
  await loadData();
}

async function handleLoadMore() {
  await loadData();
}

async function loadData() {
  refs.loadMoreBtn.hide();

  try {
    const {
      totalHits,
      hits,
    } = await pixabayApiService.fetchImagesByQuery();

    if (totalHits === 0) {
      throw new Error(
        "Sorry, there are no images matching your search query. Please try again.");
    }

    setMaxPage(totalHits);

    CardService.renderCardsMarkup(CardService.createCardsMarkup(hits));

    console.log({
      totalHits,
      hits,
    });

    pixabayApiService.incrementPage();

    if (pixabayApiService.hasExceededMaxPage()) {
      // TODO: Add Notiflix
      console.log("");
      return;
    }

    refs.loadMoreBtn.show();
  } catch (error) {
    console.log(error.message); // TODO: Do not remove
  }
}

function setMaxPage(totalHits) {
  pixabayApiService.maxPage = Math.ceil(totalHits / PixabayApiService.PAGE_STEP);
}
