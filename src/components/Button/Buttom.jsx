import React from 'react';
import css from '../Button/Button.module.css';

const Button = ({ loadMore, isLoading }) => {
  return (
    <button
      type="button"
      className={css.loadMore}
      onClick={loadMore}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  );
};

export default Button;
