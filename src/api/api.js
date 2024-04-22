import axios from 'axios';

const key = '30662426-21982097d0559eebc608a0eec';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${key}&`;

export const fetchPictureWithQuery = async searchQuery => {
  console.log(`searchQuery ${searchQuery}`);
  const response = await axios.get(
    `q=${searchQuery}&image_type=photo&per_page=12`
  );
//   console.log(response.data.hits);
  return response.data.hits;
};
