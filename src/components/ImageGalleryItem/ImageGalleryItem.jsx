import css from 'styles.module.css';

export const ImageGalleryItem = ({
  onImgClick,
  shareSrcForModal,
  picture: { webformatURL, largeImageURL, tags },
}) => {
  return (
    <li
      onClick={() => {
        onImgClick();
        shareSrcForModal(largeImageURL, tags);
      }}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};
