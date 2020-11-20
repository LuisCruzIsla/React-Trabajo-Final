

const initialState = {
    flagExecution: true,
    messageCompany: undefined,
    messageName: undefined,
    messageMovie: undefined,
    messagePhotoUrl: undefined,
}

const validateForm = (state = initialState, heroForm) => {
    if (heroForm.Company === '') {
        state.messageCompany = 'Este campo es obligatorio';
        state.flagExecution = false;
    }
    if (heroForm.Name === '') {
        state.messageName = 'Este campo es obligatorio';
        state.flagExecution = false;
    }
    if (heroForm.Movie === '') {
        state.messageMovie = 'Este campo es obligatorio';
        state.flagExecution = false;
    }
    if (heroForm.PhotoUrl === '') {
        state.messagePhotoUrl = 'Este campo es obligatorio';
        state.flagExecution = false;
    }
    return state;


};

export default validateForm;