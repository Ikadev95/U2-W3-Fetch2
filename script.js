const imgBtn = document.getElementById('loadImgBtn');
const imgBtn2 = document.getElementById('loadImgBtn2');

const loadImg = function(param){
    let imgUrl = '';
    if(param === 1){
        imgUrl = 'https://api.pexels.com/v1/search?query=hamsters';
    }
    else{
        imgUrl = 'https://api.pexels.com/v1/search?query=tigers';
    }
    fetch(imgUrl,{
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'XZaVATWUj4uAzqhogkQQrrGqvzvhSsbtsWRTUi72XS0ZBOOE7vKjwKqp'
        }
    })
    .then((response) => {
        if (response.ok){
            console.log('ok');
            return response.json();
        }
        else{
                throw new Error ('Errore della pagina');
        }
    })
    .then((page) =>{
        const cardsImg = document.querySelectorAll('.card > img');
        //console.log(cardsImg);
        const photoList = page.photos;
        console.log(photoList)
        for ( let i = 0; cardsImg.length > i; i++){
            let url = photoList[i].src.large;
            cardsImg[i].src = url;
        }
    })
    .catch((err) => {
        console.log('errore', err);
    })
    
}


imgBtn.addEventListener('click', () => loadImg(1));
imgBtn2.addEventListener('click', () => loadImg(2));

