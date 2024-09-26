const imgBtn = document.getElementById('loadImgBtn');
const imgBtn2 = document.getElementById('loadImgBtn2');
const HideBtn = document.getElementsByClassName('hide');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const imgs = document.querySelectorAll('.card > img');

const loadImg = function(param) {
    let imgUrl = '';

    // Se il parametro è una stringa fai la ricerca personalizzata
    if (typeof param === 'string') {
        imgUrl = `https://api.pexels.com/v1/search?query=${param}`;
    }
    // altrimenti sceglie tra i due : tigre e criceto

    else if (param === 1) {
        imgUrl = 'https://api.pexels.com/v1/search?query=hamsters';
    } else {
        imgUrl = 'https://api.pexels.com/v1/search?query=tigers';
    }

    fetch(imgUrl, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'XZaVATWUj4uAzqhogkQQrrGqvzvhSsbtsWRTUi72XS0ZBOOE7vKjwKqp'
        }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Errore della pagina');
        }
    })
    .then((page) =>{
        const cardsImg = document.querySelectorAll('.card > img');
        const cardsTitle = document.querySelectorAll('.card-body > h5');
        /* questo per cambiare il testo dello small con l'id della card */
        const textMuted = document.querySelectorAll('small');
        //console.log(textMuted);

        const photoList = page.photos;
       //console.log(photoList)
        for ( let i = 0; cardsImg.length > i; i++){
            let url = photoList[i].src.large;
            let id = photoList[i].id;
            let title = photoList[i].alt;
            //console.log(cardsTitle[i]);
            cardsImg[i].src = url;
            textMuted[i].innerText = id;
            cardsTitle[i].innerText = title;
        }
    })
    .catch((err) => {
        console.log('errore', err);
    })
    
};

// Event listeners per i pulsanti di caricamento immagini
imgBtn.addEventListener('click', () => loadImg(1));
imgBtn2.addEventListener('click', () => loadImg(2));

// Event listener per nascondere le card
for (let i = 0; i < HideBtn.length; i++) {
    HideBtn[i].addEventListener('click', function() {
        this.closest('.col-md-4').classList.add('d-none');
    });
}

// Event listener per la ricerca
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchString = searchInput.value.trim();
    if (searchString) {
        loadImg(searchString);
    } else {
        alert("Inserisci un termine di ricerca valido.");
    }
});

const getDetails = function(img){
    const card = img.closest('.card');
    const id = card.querySelector('small').innerText;
    console.log(id);
    location.href = `./detail.html?imgId=${id}`;
}

for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function() {
        getDetails(this);  
    });
}