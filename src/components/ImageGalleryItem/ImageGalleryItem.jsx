import css from 'styles.module.css';

export const ImageGalleryItem = ({ items }) => {
  return items.map(item => (
    <li key={item.id} className={css.ImageGalleryItem}>
      <img src={item.webformatURL} alt={item.tags} />
    </li>
  ));
};
