import { fetchPictureLoadmore, fetchPictureWithQuery } from 'api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import React, { Component } from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    pictures: [],
    picture: '',
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImgData: { src: '', alt: '' },
  };

  async componentDidUpdate(_, prevState) {
    // 1 запит
    if (prevState.picture !== this.state.picture) {
      console.log(prevState.pictures);
      try {
        this.setState({ isLoading: true });

        const pictures = await fetchPictureWithQuery(this.state.picture);
        // console.log(pictures);
        const arrPhotos = [];
        pictures.map(item =>
          arrPhotos.push({
            id: item.id,
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
            tags: item.tags,
          })
        );
        console.log(arrPhotos);

        this.setState({
          pictures: [...arrPhotos],
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
    // Кнопка Loadmore запит
    if (prevState.page !== this.state.page ) {
      try {
        this.setState({ isLoading: true });
        const addPictures = await fetchPictureLoadmore(
          this.state.picture,
          this.state.page
        );

        const arrPhotos = [];
        addPictures.map(item =>
          arrPhotos.push({
            id: item.id,
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
            tags: item.tags,
          })
        );
        console.log(arrPhotos);
        this.setState({
          pictures: [...prevState.pictures, ...arrPhotos],
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
        {pictures.length > 0 ? (
          <>
            <ImageGallery pictures={pictures} />
            <Button onClick={this.loadMore} />
          </>
        ) : null}
      </>
    );
  }
}
