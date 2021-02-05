import React, { useEffect, useState } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState([]);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch('http://restcountries.eu/rest/v2/all');
      const json = await res.json();

      const allCountries = json.map(
        ({ name, numericCode, flag, population }) => {
          return {
            id: numericCode,
            name,
            filterName: name.toLowerCase(),
            flag,
            population,
          };
        }
      );

      setAllCountries(allCountries);
      setFilteredCountries(Object.assign([], allCountries));
    };
    getCountries();
  }, []);

  const calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((acc, cur) => {
      return acc + cur.population;
    }, 0);
    return totalPopulation;
  };

  const handleChangeFilter = (newText) => {
    setUserFilter(newText);

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation = calculateTotalPopulation(filteredCountries);

    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  };

  return (
    <div>
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Header
        filter={userFilter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
        onChangeFilter={handleChangeFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
};
