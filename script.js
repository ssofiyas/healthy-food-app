const searchBtn = document.querySelector('#search-btn');
const userInput = document.querySelector('#user-input');
const resultsArea = document.querySelector('#results');
const categoryBtns = document.querySelectorAll('.category-btn');

// Ladataan Pasta-reseptit heti alussa, jotta sivu ei ole tyhjä
window.addEventListener('DOMContentLoaded', () => {
    fetchRecipes('Pasta');
});

// Hakunapin toiminta
searchBtn.addEventListener('click', () => {
    const query = userInput.value.trim();
    if (query !== "") {
        fetchRecipes(query);
    }
});

// Kategoria nappien toiminta
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        fetchRecipes(category); 
    });
});

// Pääfunktio datan hakuun
async function fetchRecipes(query) {
    resultsArea.innerHTML = "<p class='info-text'>Searching for " + query + "...</p>";
    
    // search.php osoite hakee reseptejä nimen perusteella 
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.meals);
    } catch (error) {
        console.error("Haku epäonnistui:", error);
        resultsArea.innerHTML = "<p class='info-text'>Connection error. Please try again.</p>";
    }
}

// Tulosten näyttäminen sivulla
function displayResults(meals) {
    resultsArea.innerHTML = ""; // Tyhjennetään edelliset

    if (!meals) {
        resultsArea.innerHTML = "<p class='info-text'>No recipes found. Try another word!</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        // Valitaan ensisijaisesti Source-linkki, sitten YouTube, ja lopulta Google-haku
        const recipeLink = meal.strSource || meal.strYoutube || `https://www.google.com/search?q=${meal.strMeal}+recipe`;

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="card-info">
                <h3>${meal.strMeal}</h3>
                <p><strong>Category:</strong> ${meal.strCategory || 'Various'}</p>
                <a href="${recipeLink}" target="_blank" class="recipe-link">View Recipe</a>
            </div>
        `;
        resultsArea.appendChild(card);
    });
}