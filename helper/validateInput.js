const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidInput = (input) => {
    const isValid = input.trim() === '' || !input ? false : true;

    return isValid;
};

export const isValidEmail = (input) => {
    const isValid = regex.test(input);

    return isValid;
};
