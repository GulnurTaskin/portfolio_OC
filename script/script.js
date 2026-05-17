// Fonction qui ajoute une classe sombre à la navbar lors du scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Fonction qui ferme automatiquement le menu navbar sur mobile après un clic
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Fonction qui génère dynamiquement les cartes de compétences à partir du fichier JSON
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Chargement du fichier JSON
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {

            // Parcours des données JSON pour créer les cartes HTML
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");

                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" />
                            <h4 class="card-title mt-3">${item.title}</h4>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Ajout de la carte dans la ligne actuelle
                row.appendChild(card);

                // Création d'une nouvelle ligne toutes les 3 cartes
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);

                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}

// Fonction qui génère dynamiquement les cartes de projets à partir du fichier JSON
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio-container");

    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {

            // Parcours des projets pour créer les cartes HTML
            data.forEach((item) => {
                const card = document.createElement("div");

                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="images/${item.image}" alt="${item.title}">
                        <div class="card-body">
                            <h4 class="card-title">${item.title}</h4>
                            <p class="card-text">${item.text}</p>
                            <div class="text-center">
                                <a href="${item.link}" target="_blank" class="btn btn-success">Voir le projet</a>
                            </div>
                        </div>
                    </div>
                `;

                // Ajout de la carte dans le container portfolio
                container.appendChild(card);
            });
        });
}

// Exécution des fonctions principales au chargement de la page
handleNavbarScroll();
handleNavbarCollapse();
//createSkillsFromJSON();
createPortfolioFromJSON();

const heroBlock = document.getElementById("heroBlock");
const heroResult = document.getElementById("heroResult");

// Animation qui affiche le résultat attendu après un clic sur le bloc principal
if (heroBlock && heroResult) {
    heroBlock.addEventListener("click", () => {
        heroBlock.style.opacity = "0";

        setTimeout(() => {
            heroBlock.style.display = "none";
            heroResult.classList.add("show");
        }, 800);
    });
}

const actionLink = document.getElementById("actionLink");

// Réinitialisation de l'animation du hero lors d'un clic sur le lien Action
if (actionLink) {
    actionLink.addEventListener("click", () => {
        heroResult.classList.remove("show");

        heroBlock.style.display = "block";

        setTimeout(() => {
            heroBlock.style.opacity = "1";
        }, 100);
    });
}

const walkingBug = document.querySelector(".walking-bug");
const homeSection = document.querySelector("#home");

// Affichage du bug animé uniquement après la section d'accueil
window.addEventListener("scroll", () => {
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (window.scrollY < homeBottom - 100) {
        walkingBug.classList.remove("show-bug");
    } else {
        walkingBug.classList.add("show-bug");
    }
});

const navbarToggler = document.querySelector(".navbar-toggler");
const navbarMenu = document.getElementById("navbarSupportedContent");
const heroText = document.querySelector(".hero-text");

// Gestion de l'affichage du texte principal lors de l'ouverture du menu mobile
if (navbarToggler && navbarMenu && heroText) {

    // Masque le hero text lorsque le menu mobile est ouvert
    navbarToggler.addEventListener("click", () => {
        setTimeout(() => {
            if (navbarMenu.classList.contains("show")) {
                heroText.classList.add("hero-hidden");
            } else {
                heroText.classList.remove("hero-hidden");
            }
        }, 250);
    });

    // Réaffiche le hero text après un clic sur un lien du menu
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            heroText.classList.remove("hero-hidden");
        });
    });
}