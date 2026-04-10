// Haetaan elementit HTML:stä
const nappi = document.querySelector('#haku-nappi');
const tulosAlue = document.querySelector('#tulokset');
const syote = document.querySelector('#hakusana');

// Tapahtuman kasittely 
nappi.addEventListener('click', function() {
    const haku = syote.value;
    
    // Napin testaminen onnistuu, jos alla oleva teksti näkyy konsolissa
    console.log("Haetaan: " + haku);

    tulosAlue.innerHTML = `<h3>Haetaan tietoa kohteelle: ${haku}...</h3>`;
});