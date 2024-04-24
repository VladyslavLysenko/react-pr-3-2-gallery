import css from 'styles.module.css';

export const Button = ({onClick}) => {
  return (
    <>
      <button type="button"  onClick={onClick} className={css.Button}>
        Load more
      </button>
    </>
  );
};
