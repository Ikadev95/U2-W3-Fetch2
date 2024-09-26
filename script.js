const imgBtn = document.getElementById('loadImgBtn');
const imgBtn2 = document.getElementById('loadImgBtn2');
const HideBtn = document.getElementsByClassName('hide');

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

        /* questo per cambiare il testo dello small con l'id della card */
        const textMuted = document.querySelectorAll('small');
        //console.log(textMuted);

        const photoList = page.photos;
       // console.log(photoList)
        for ( let i = 0; cardsImg.length > i; i++){
            let url = photoList[i].src.large;
            let id = photoList[i].id;
            cardsImg[i].src = url;
            textMuted[i].innerText = id;
        }
    })
    .catch((err) => {
        console.log('errore', err);
    })
    
}

/* questo per nascondere le card con Hide */

imgBtn.addEventListener('click', () => loadImg(1));
imgBtn2.addEventListener('click', () => loadImg(2));

for (let i = 0; HideBtn.length > i ; i++){
    HideBtn[i].addEventListener('click',function(){
        HideBtn[i].closest('.col-md-4').classList.add('d-none');
    })
}
