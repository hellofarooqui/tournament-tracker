const abbrevation = (word) => {
    const short = word.split(' ').map(w => w.charAt(0).toUpperCase()).join('');
    return short;
}

export default abbrevation;