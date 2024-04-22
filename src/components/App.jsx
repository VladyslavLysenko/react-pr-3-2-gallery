import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api/?q=cat&page=1&key=30662426-21982097d0559eebc608a0eec&`;

export class App extends Component {
  state = {
    pictures: [],
    picture: '',
  };

  async componentDidMount() {
    const response = await axios.get(
      `image_type=${this.state.picture}&per_page=12`
    );
    this.setState({ pictures: response.data.hits });
  }

  searchPicture = value => {
    this.setState({ picture: value });
  };

  render() {
    const { pictures } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.searchPicture} />
        {pictures.length > 0 ? <ImageGallery pictures={pictures} /> : null};
      </>
    );
  }
}
