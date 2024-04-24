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
    picture: '',
    isLoading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImgData: { src: '', alt: '' },
  };

  async componentDidUpdate(_, prevState) {
    let currentPictures = prevState.pictures;
    console.log('out,', prevState.picture, this.state.picture);
    if (prevState.picture !== this.state.picture) {
      console.log('in', prevState.picture, this.state.picture);
      currentPictures = [];
    }

    if (
      prevState.page !== this.state.page ||
      prevState.picture !== this.state.picture
    ) {
      try {
        this.setState({ isLoading: true });
        const addPictures = await fetchPictureWithQuery(
          this.state.picture,
          this.state.page
        );

        console.log(addPictures.totalHits);

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
          console.log(arrPhotos);

          
          this.setState({
            pictures: [...currentPictures, ...arrPhotos],
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
      // pictures:[],
      picture: value,
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
    const { pictures, isLoading, error, showModal, largeImgData } = this.state;

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
            <Button onClick={this.loadMore} />
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
