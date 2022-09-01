
// Validations to apply to data entries

const evalEmail = (st) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(st);
}

const evalNaturalNumber = (st) => {
    return /^\d+$/.test(st);
}

const evalPhone = (st) => {
    return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/.test(st);
}

const evalUUID = (st) => {
    return /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(st);
}

const evalName = (st) => {
    return /^[a-zA-Z\u00C0-\u00FF ]+$/.test(st);
}

const evalTitle = (st) => {
    return /^[a-zA-Z\u00C0-\u00FF \d.,?!:@%&+'\$*\-]+$/.test(st);
}

const evalAddress = (st) => {
    return /^[a-zA-Z\u00C0-\u00FF ,-\d]+$/.test(st);
}

const evalDate = (st) => {
    return /^[\d]{4}[-]{1}[\d]{2}[-]{1}[\d]{2}$/.test(st);
}

const evalPassword = (st) => {
    // It must have at least 8 characters, 1 lower case letter, 1 upper case letter, 1 number and 1 special character
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\+\-_=\?/])(?=.{8,})/.test(st);
}

const evalMark = (st) => {
    return ((/^[\d]{2}$/.test(st)) && (+st <= 10) && (+st >= 0));
}

const evalField = (key, value) => {
    switch (key) {
        case 'last_name': return evalName(value);
        case 'first_name': return evalName(value);
        case 'email': return evalEmail(value);
        case 'phone': return evalPhone(value);
        case 'address': return evalAddress(value);
        case 'password': return evalPassword(value);
        case 'title': return evalTitle(value);
        case 'id': return evalUUID(value);
        case 'description': return true;
        case 'mark': return evalMark(value);
        case 'date': return evalDate(value);
        default: return false;
    }
}

const validateAll = (obj) => {
    return Object.entries(obj).every(evalField);
}

export {evalField, validateAll};