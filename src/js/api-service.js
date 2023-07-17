import axios from "axios";

const BASE_URL = "https://pixabay.com/api";

const API_KEY = "38308184-41247c978e0d2604524b8abfa";

export const PAGE_STEP = 40;

export async function fetchImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: PAGE_STEP,
  };

  const response = await axios.get(`${BASE_URL}`, {
    params,
  });

  return response.data;
}
