export const required = value => {
    if(value) return undefined;

    return 'Field is reauired';
}


export const maxLengthCreator= (maxLength) => (value) => {
    if(value.length > maxLength) return `max length ${maxLength} symbols`;

    return undefined;
}