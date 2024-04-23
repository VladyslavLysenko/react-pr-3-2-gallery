import { fetchPictureWithQuery } from 'api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import React, { Component } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    pictures: [],
    picture: '',
    isLoading: false,
    error: null,
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.loadImages();
    }

    if (prevState.picture !== this.state.picture) {
      console.log(prevState.pictures);
      try {
        this.setState({ isLoading: true });

        const pictures = await fetchPictureWithQuery(
          this.state.picture,
          this.state.page
        );
        this.setState({
          pictures: pictures,
          // picture: null,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  searchPicture = value => {
    this.setState({ picture: value });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
        {pictures.length > 0 ? <ImageGallery pictures={pictures} /> : null}
        <Button onClick={this.loadMore} />
      </>
    );
  }
}
