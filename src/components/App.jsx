import { fetchPictureWithQuery } from 'api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import React, { Component } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

export class App extends Component {
  state = {
    pictures: [],
    picture: null,
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const pictures = await fetchPictureWithQuery(this.state.picture);
      this.setState({
        pictures,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  searchPicture = value => {
    // console.log(`search bar`);
    this.setState({ picture: value });
  };

  render() {
    const { pictures, isLoading, error } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <SearchBar onSubmit={this.searchPicture} />
        {isLoading && (
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {pictures.length > 0 ? <ImageGallery pictures={pictures} /> : null};
      </>
    );
  }
}
