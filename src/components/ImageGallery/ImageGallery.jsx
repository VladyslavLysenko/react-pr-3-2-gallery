import css from 'styles.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures, shareSrcForModal, onImgClick }) => {
    console.log(pictures)
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={picture.id}
          picture={picture}
          onImgClick={onImgClick}
          shareSrcForModal={shareSrcForModal}
        />
      ))}
    </ul>
  );
};
