import React from 'react';
import css from './countries.module.css';

export default function Country({ country }) {
  const { name, flag } = country;
  return (
    <div className={`${css.country} ${css.border}`}>
      <img className={css.flag} src={flag} alt={name}></img>
      <span className={css.countryName}>{country.name}</span>
    </div>
  );
}
