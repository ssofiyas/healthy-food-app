const hakuNappi = document.querySelector('#haku-nappi');
const hakusanaKentta = document.querySelector('#hakusana');
const tulosAlue = document.querySelector('#tulokset');

// tapahtumankuuntelija, joka reagoi napin klikkaukseen
hakuNappi.addEventListener('click', () => {
    const hakusana = hakusanaKentta.value.trim();
    
    if (hakusana === "") {
        alert("Ole hyvä ja kirjoita hakusana!");
        return;
    }

    haeReseptit(hakusana);
});

// AJAX funktio, joka hakee reseptit API:sta
async function haeReseptit(haku) {
    tulosAlue.innerHTML = "<p class='info-text'>Etsitään reseptejä...</p>";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${haku}`;

    try {
        const vastaus = await fetch(url);
        const data = await vastaus.json();

        console.log("Data saatu:", data); // Voit katsoa tätä selaimen konsolissa (F12)
        naytaTulokset(data.meals);

    } catch (virhe) {
        console.error("Virhe haussa:", virhe);
        tulosAlue.innerHTML = "<p class='info-text'>Yhteysvirhe. Yritä uudelleen.</p>";
    }
}

// funktio, joka vaihtaa tulosalueen sisällön reseptikorteiksi
function naytaTulokset(reseptit) {
    tulosAlue.innerHTML = ""; // Tyhjennetään edellinen haku

    if (!reseptit) {
        tulosAlue.innerHTML = "<p class='info-text'>Ei tuloksia. Kokeile toista hakusanaa (esim. pasta).</p>";
        return;
    }

    // oma kortti jokaiselle reseptille
    reseptit.forEach(resepti => {
        const kortti = document.createElement('div');
        kortti.className = 'recipe-card';

        kortti.innerHTML = `
            <img src="${resepti.strMealThumb}" alt="${resepti.strMeal}">
            <div class="card-info">
                <h3>${resepti.strMeal}</h3>
                <p>Kategoria: ${resepti.strCategory}</p>
                <p>Alue: ${resepti.strArea}</p>
            </div>
        `;

        tulosAlue.appendChild(kortti);
    });
}