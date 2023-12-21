const converteDate = (longdate) => {

    const dateString = longdate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate;

}

export default converteDate;