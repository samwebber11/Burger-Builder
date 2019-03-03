export const inputValidity = (value,rules) => {
    let valid = true;

    if(rules.required)
    {
        valid = value.trim() !== '' && valid;
    }
    if(rules.minLength)
    {
        valid = value.length >= rules.minLength && valid;
    }
    if(rules.maxLength)
    {
        valid = value.length <= rules.maxLength && valid;
    }
    if(rules.isEmail)
    {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        valid = pattern.test(value) && valid;
    }
    if(rules.isNumeric)
    {
        const pattern = /^\d+$/;
        valid = pattern.test(value) && valid;
    }

    return valid;
}
