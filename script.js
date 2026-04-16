// Haetaan elementit muuttujiin
const searchBtn = document.querySelector('#search-btn');
const userInput = document.querySelector('#user-input');
const resultsArea = document.querySelector('#results');

// Ladataan automaattisesti reseptejä, kun sivu avataan
window.addEventListener('DOMContentLoaded', () => {
    fetchRecipes('Pasta');
});

// Hakunapin toiminnallisuus
searchBtn.addEventListener('click', () => {
    const query = userInput.value.trim();
    if (query !== "") {
        fetchRecipes(query);
    } else {
        alert("Kirjoita jotain hakukenttään!");
    }
});

// Haku enter-näppäimellä
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Haetaan data API:sta
async function fetchRecipes(query) {
    resultsArea.innerHTML = "<p class='info-text'>Etsitään reseptejä...</p>";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Lähetetään saatu data näytettäväksi
        displayResults(data.meals);
    } catch (error) {
        console.error("Virhe:", error);
        resultsArea.innerHTML = "<p class='info-text'>Yhteysvirhe, yritä uudelleen.</p>";
    }
}

// Luodaan reseptikortit sivulle
function displayResults(meals) {
    resultsArea.innerHTML = ""; // Tyhjennetään vanhat tulokset

    if (!meals) {
        resultsArea.innerHTML = "<p class='info-text'>Ei tuloksia. Kokeile toista sanaa.</p>";
        return;
    }

    // Käydään lista läpi ja rakennetaan kortit
    meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-info">
                <div>
                    <h3>${meal.strMeal}</h3>
                    <p><strong>Kategoria:</strong> ${meal.strCategory}</p>
                    <p><strong>Maa:</strong> ${meal.strArea}</p>
                </div>
                <a href="${meal.strSource || meal.strYoutube}" target="_blank" class="recipe-link">Katso resepti</a>
            </div>
        `;

        resultsArea.appendChild(card);
    });
}
