import css from 'styles.module.css';
import { RiFindReplaceLine } from 'react-icons/ri';

// Your API key: 30662426-21982097d0559eebc608a0eec
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
// Приходить масив обєктів id - унікальний ідентифікатор
// webformatURL - посилання на маленьке зображення для списку карток
// largeImageURL - посилання на велике зображення для модального вікна

export const SearchBar = () => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <RiFindReplaceLine/>

          <span className={css.SearchFormButtonLabel}></span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
