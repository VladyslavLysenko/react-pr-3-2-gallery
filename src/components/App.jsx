import React, { Component } from 'react';

import { fetchPictureWithQuery } from 'api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './SearchBar/SearchBar';
import { CirclesWithBar } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    pictures: [],
    q: '',
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImgData: { src: '', alt: '' },
    totalPages: null,
  };

  async componentDidUpdate(_, prevState) {
    let currentPictures = prevState.pictures;
    if (prevState.q !== this.state.q) {
      currentPictures = [];
    }

    if (prevState.page !== this.state.page || prevState.q !== this.state.q) {
      try {
        this.setState({ isLoading: true });
        const addPictures = await fetchPictureWithQuery(
          this.state.q,
          this.state.page
        );

        let totalPages = Math.ceil(addPictures.totalHits / 12);

        if (addPictures.hits.length === 0) {
          toast.error('Sorry,we did not find...');
        } else {
          const arrPhotos = [];
          addPictures.hits.map(item =>
            arrPhotos.push({
              id: item.id,
              webformatURL: item.webformatURL,
              largeImageURL: item.largeImageURL,
              tags: item.tags,
            })
          );

          this.setState({
            pictures: [...currentPictures, ...arrPhotos],
            totalPages: totalPages,
          });
        }
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
    this.setState({
      q: value,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  shareSrcForModal = (srcLarge, altLarge) => {
    this.setState({ largeImgData: { src: srcLarge, alt: altLarge } });
  };

  render() {
    const {
      pictures,
      isLoading,
      error,
      showModal,
      largeImgData,
      page,
      totalPages,
    } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <Toaster />
        <SearchBar onSubmit={this.searchPicture} pictures={pictures} />
        {isLoading && (
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            visible={true}
          />
        )}
        {pictures.length > 0 ? (
          <>
            <ImageGallery
              pictures={pictures}
              onImgClick={this.toggleModal}
              shareSrcForModal={this.shareSrcForModal}
            />
            {page < totalPages ? <Button onClick={this.loadMore} /> : null}
          </>
        ) : null}

        {showModal && (
          <Modal
            src={largeImgData.src}
            alt={largeImgData.alt}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}
