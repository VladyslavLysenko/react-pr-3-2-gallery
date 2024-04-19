import css from 'styles.module.css'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid'
// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"

export const ImageGallery = () => {
    return <ul className={css.ImageGallery}>
        <ImageGalleryItem key={nanoid()}/>
    </ul>;
};
