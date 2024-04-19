import css from 'styles.module.css'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = () => {
    return <ul className={css.ImageGallery}>
        <ImageGalleryItem/>
    </ul>;
};
