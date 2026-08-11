const sqButton = document.getElementById("sq");
const enButton = document.getElementById("en");

function changeLanguage(language) {

    document.documentElement.lang = language;

    document.querySelectorAll("[data-sq]").forEach(element => {
        element.textContent = element.dataset[language];
    });

    sqButton.classList.toggle("active", language === "sq");
    enButton.classList.toggle("active", language === "en");

    localStorage.setItem("language", language);
}

sqButton.addEventListener("click", () => {
    changeLanguage("sq");
});

enButton.addEventListener("click", () => {
    changeLanguage("en");
});


function openArt(card) {

    const image = card.querySelector("img");
    const title = card.querySelector("h3");
    const price = card.querySelector(".card-info span");

    document.getElementById("lightboxImage").src = image.src;
    document.getElementById("lightboxTitle").textContent = title.textContent;
    document.getElementById("lightboxPrice").textContent = price.textContent;

    document.getElementById("lightbox").classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeArt() {

    document.getElementById("lightbox").classList.remove("show");

    document.body.style.overflow = "";
}


document.getElementById("lightbox").addEventListener("click", function(event) {

    if (event.target === this) {
        closeArt();
    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeArt();
    }

});


const savedLanguage = localStorage.getItem("language") || "sq";

changeLanguage(savedLanguage);
