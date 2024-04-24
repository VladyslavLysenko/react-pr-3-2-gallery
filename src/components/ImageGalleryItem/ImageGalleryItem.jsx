import { Component } from 'react';
import css from 'styles.module.css';

export class ImageGalleryItem extends Component {
  render() {
    return this.props.items.map(item => (
      <>
        <li
          key={item.id}
          onClick={this.toogleModal}
          className={css.ImageGalleryItem}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
      </>
    ));
  }
}
