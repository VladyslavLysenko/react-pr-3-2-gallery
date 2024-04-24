import axios from 'axios';

// const key = '30662426-21982097d0559eebc608a0eec';

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchPictureWithQuery = async (searchQuery, page) => {
  console.log(`page ${page} `);
  const response = await axios.get('', {
    params: {
      key: '30662426-21982097d0559eebc608a0eec',
      q: searchQuery,
      per_page: 12,
      image_type: 'photo',
      page: page,
    },
  });

  return response.data;
};
