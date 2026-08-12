const sqButton = document.getElementById("sq");
const enButton = document.getElementById("en");

let currentLanguage = localStorage.getItem("language") || "sq";

function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-sq][data-en]").forEach(element => {

        const translation = element.getAttribute("data-" + language);

        if (translation) {
            element.textContent = translation;
        }

    });

    sqButton.classList.toggle("active", language === "sq");
    enButton.classList.toggle("active", language === "en");

    localStorage.setItem("language", language);
}


sqButton.addEventListener("click", function() {
    changeLanguage("sq");
});


enButton.addEventListener("click", function() {
    changeLanguage("en");
});


function setArtwork(title, price) {

    const message =
        currentLanguage === "sq"
        ? `Përshëndetje Elda! Jam e interesuar për ${title} (${price}).`
        : `Hi Elda! I'm interested in ${title} (${price}).`;

    console.log(message);

    localStorage.setItem("selectedArtwork", message);
}


function openArt(card) {

    const image = card.querySelector("img");

    const title = card.querySelector("h3").textContent;

    const price = card.querySelector(".card-info span").textContent;


    document.getElementById("lightboxImage").src = image.src;

    document.getElementById("lightboxTitle").textContent = title;

    document.getElementById("lightboxPrice").textContent = price;


    const dmButton = document.getElementById("lightboxDM");

    dmButton.onclick = function() {

        setArtwork(title, price);

    };


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


changeLanguage(currentLanguage);
