import css from 'styles.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem items={pictures} />
    </ul>
  );
};
