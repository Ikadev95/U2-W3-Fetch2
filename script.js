const imgBtn = document.getElementById('loadImgBtn');
const imgBtn2 = document.getElementById('loadImgBtn2');
const HideBtn = document.getElementsByClassName('hide');
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchInput');

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
            console.log('ok');
            return response.json();
        } else {
            throw new Error('Errore della pagina');
        }
    })
    .then((page) => {
        const cardsImg = document.querySelectorAll('.card > img');
        const textMuted = document.querySelectorAll('small');
        const photoList = page.photos;

        for (let i = 0; i < Math.min(cardsImg.length, photoList.length); i++) {
            let url = photoList[i].src.large;
            let id = photoList[i].id;
            cardsImg[i].src = url;
            textMuted[i].innerText = id;
        }
    })
    .catch((err) => {
        console.log('errore', err);
    });
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
    const searchString = searchInput.value;
    if (searchString) {
        loadImg(searchString);
    } else {
        alert("Inserisci un termine di ricerca valido.");
    }
});
