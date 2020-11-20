import React, { useReducer, useState } from 'react';
import HeroeForm from '../components/Heroe/HeroeForm';
import HeroePreview from '../components/Heroe/HeroePreview';
import LoaderPage from '../components/Loader/LoaderPage';
import { navigate } from "@reach/router";
import api from '../utils/api';
import HeroReducer from '../reducer/HeroeReducer';
import validateForm from '../Validations/ValidateFormHero';

const HeroeNew = () => {

  const [heroForm, setHeroForm] = useState({
    Company: '',
    Name: '',
    Movie: '',
    PhotoUrl: '',
  });

  const [component, setComponent] = useState({
    loading: false,
    error: null,
    modalIsOpen: false
  });

  const [messages, setMessages] = useState({
    Company: undefined,
    Name: undefined,
    Movie: undefined,
    PhotoUrl: undefined,
  });

  const [estadoHeroe, dispatchHeroe] = useReducer(HeroReducer, heroForm);

  const handleCreateHeroe = async () => {
    setComponent({ ...component, loading: true, error: null });
    try {
      await api.heroes.createHeroe(estadoHeroe);
      setComponent({ ...component, loading: false, modalIsOpen: true, error: null });
    } catch (error) {
      setComponent({ ...component, loading: false, error: error });
    }
  };

  const handleChange = (e) => {
    setHeroForm({
      ...heroForm,
      [e.target.name]: e.target.value
    });
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const onCloseModal = () => {
    navigate(`/`)
  };

  const onRedirectToHeroes = () => {
    navigate(`/`)
  };

  const handleValidateForm = () => {
    const state = {
      flagExecution: true,
      messageCompany: undefined,
      messageName: undefined,
      messageMovie: undefined,
      messagePhotoUrl: undefined,
    }
    validateForm(state, heroForm);

    if (state.flagExecution) {
      dispatchHeroe({
        type: 'ADD_HERO'
      })
      estadoHeroe.Company = heroForm.Company;
      estadoHeroe.Name = heroForm.Name;
      estadoHeroe.Movie = heroForm.Movie;
      estadoHeroe.PhotoUrl = heroForm.PhotoUrl;

      handleCreateHeroe();
    } else {
      setMessages({
        ...messages,
        Company: state.messageCompany,
        Name: state.messageName,
        Movie: state.messageMovie,
        PhotoUrl: state.messagePhotoUrl
      });
    }
  };

  if (component.loading) {
    return <LoaderPage />
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <HeroeForm
            onChangeInput={handleChange}
            formValues={heroForm}
            onBack={handleGoBack}
            onSave={handleValidateForm}
            errorForm={component.error}
            validationMessage={messages}
            modalIsOpen={component.modalIsOpen}
            onCloseModal={onCloseModal}
            onRedirectToHeroes={onRedirectToHeroes}
          />
          <HeroePreview
            company={heroForm.Company || 'COMPANY NAME'}
            name={heroForm.Name || 'HEROE NAME'}
            movie={heroForm.Movie || 'MOVIE NAME'}
            photoUrl={
              heroForm.PhotoUrl ||
              'https://i.pinimg.com/originals/b5/34/df/b534df05c4b06ebd32159b2f9325d83f.jpg'
            }
          />
        </div>
      </div>
    </>
  );
}

export default HeroeNew;