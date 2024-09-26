const addressBarContent = new URLSearchParams(location.search);

// Recupera l'id dalla barra degli indirizzi
const cardId = addressBarContent.get('imgId');

console.log(cardId); 


const getDetails = function(){
    fetch(imgURL + '/' + cardId, {
        headers: {
            'Authorization': 'XZaVATWUj4uAzqhogkQQrrGqvzvhSsbtsWRTUi72XS0ZBOOE7vKjwKqp'
        }
    })
    .then((response) => {
        if (response.ok){
            console-log(ok);
            return response.json();
        }
        else{
            throw new Error ('err')
        }
    })
    .catch((err)=>{
        console.log('errore',err);
    })
}
getDetails()