const abbrevation = (word) => {
    //console.log("Word received for abbreviation:", word);
    const short = word.split(' ').map(w => w.charAt(0).toUpperCase()).join('');
    return short;
}

export default abbrevation;