import css from 'styles.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid'
// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"

export const ImageGallery = ({ pictures, shareSrcForModal, onImgClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem
          key={nanoid()}
          picture={picture}
          onImgClick={onImgClick}
          shareSrcForModal={shareSrcForModal}
        />
      ))}
    </ul>
  );
};
