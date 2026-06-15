import axios from 'axios';
export const getImagesByQuery = async (query, currentPage) => {
  const requestParams = {
    key: '56220585-56a0c3bb81d566663f8c5eae4',
    q: query,
    image_type: `photo`,
    orientation: `horizontal`,
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };

  const response = await axios.get(
    `https://pixabay.com/api/`,
    { params: requestParams }
  );
  return response.data;
};
