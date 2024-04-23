import axios from 'axios';

// const key = '30662426-21982097d0559eebc608a0eec';

axios.defaults.baseURL = `https://pixabay.com/api/?key=30662426-21982097d0559eebc608a0eec`;

export const fetchPictureWithQuery = async (searchQuery, page) => {
  console.log(`page ${page} `);
  const response = await axios.get('', {
    params: {
      q: searchQuery,
      per_page: 12,
      image_type: 'photo',
      page: page,
    },
  });
  // console.log(response);
  // console.log(response.data.hits);
  return response.data.hits;
};
