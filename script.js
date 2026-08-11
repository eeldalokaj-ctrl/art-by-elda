const sqButton = document.getElementById("sqBtn");
const enButton = document.getElementById("enBtn");

function setLanguage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-sq]").forEach(element => {
        element.textContent = element.dataset[language];
    });

    sqButton.classList.toggle("active", language === "sq");
    enButton.classList.toggle("active", language === "en");

    localStorage.setItem("language", language);
}

sqButton.addEventListener("click", () => {
    setLanguage("sq");
});

enButton.addEventListener("click", () => {
    setLanguage("en");
});

const savedLanguage = localStorage.getItem("language") || "sq";

setLanguage(savedLanguage);
