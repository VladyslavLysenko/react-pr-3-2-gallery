import css from 'styles.module.css';
import { RiFindReplaceLine } from 'react-icons/ri';
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    picture: '',
  };

  handleSubmtit = e => {
    e.preventDefault();
    // console.log(this.props);
    this.props.onSubmit(this.state.picture);
    this.reset();
  };

  handleChange = e => {
    this.setState({ picture: e.target.value });
  };

  reset = () => {
    this.setState({
      picture: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmtit}>
          <button type="submit" className={css.SearchFormButton}>
            <RiFindReplaceLine />

            <span className={css.SearchFormButtonLabel}></span>
          </button>

          <input
            value={this.state.picture}
            className={css.SearchFormInput}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
