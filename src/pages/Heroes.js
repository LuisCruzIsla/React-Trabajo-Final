
import React, { useState, useEffect } from 'react';
import HeroeList from '../components/Heroe/HeroeList';
import MessageWarning from '../components/Messages/MessageWarning';
import ButtonNewHero from '../components/Button/ButtonNewHero';
import LoaderHeroes from '../components/Loader/LoaderHeroes';
import api from '../utils/api';

const Heroes = () => {

  const [objHeroe, setHeroe] = useState({
    heroes: undefined,
  });
  const [component, setComponent] = useState({
    loading: true,
    error: null,
  });


  useEffect(() => {
    const getDataHeroes = async () => {
      try {
        const dataHeroes = await api.heroes.listHeroes();
        setHeroe({ heroes: dataHeroes, });
        setComponent({ ...component, loading: false });
      } catch (error) {
        setComponent({ ...component, error: error });
      }
    };
    getDataHeroes();
  }, []);

  if (component.loading) {
    return (
      <React.Fragment>
        <ButtonNewHero />
        <br />
        <LoaderHeroes />
      </React.Fragment>
    );
  }

  if (component.error) {
    return <MessageWarning message={component.error.message} />;
  }

  if (!objHeroe.heroes || objHeroe.length === 0) {
    return (
      <div>
        <ButtonNewHero />
        <br />
        <MessageWarning message="No existe información." />;
      </div>
    );
  }

  return (
    <div>
      <ButtonNewHero />
      <br />
      <HeroeList heroes={objHeroe.heroes} />
    </div>
  );
}

export default Heroes;
