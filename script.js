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

    const instagramURL =
        `https://ig.me/m/artbyelda?text=${encodeURIComponent(message)}`;

    window.open(instagramURL, "_blank");
}


function openArt(card) {

    const image = card.querySelector("img");

    const title = card.querySelector("h3").textContent;

    const price = card.querySelector(".sale-price").textContent;


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
/* ================================
   ART BY ELDA — GALLERY ANIMATIONS
================================ */

// PAGE LOADER
document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("page-loaded");

    // Reveal elements when they enter the screen
    const revealElements = document.querySelectorAll(
        ".custom-inner, .works-heading, .art-card, .gallery-link, .about, .contact"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

});


/* ================================
   ARTWORK HOVER — PAINT EFFECT
================================ */

document.querySelectorAll(".image-wrap").forEach((art) => {

    art.addEventListener("mousemove", (e) => {

        const rect = art.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        art.style.setProperty("--mouse-x", `${x}%`);
        art.style.setProperty("--mouse-y", `${y}%`);

    });

});


/* ================================
   SMOOTH PAGE TRANSITION
================================ */

document.querySelectorAll("a[href]").forEach((link) => {

    const href = link.getAttribute("href");

    if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("https") ||
        href.startsWith("http") ||
        href.startsWith("mailto:")
    ) {
        return;
    }

    link.addEventListener("click", (event) => {

        event.preventDefault();

        document.body.classList.add("page-exit");

        setTimeout(() => {
            window.location.href = href;
        }, 450);

    });

});


/* ================================
   PARALLAX HERO
================================ */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero-content");

    if (!hero) return;

    const scroll = window.scrollY;

    if (scroll < window.innerHeight) {

        hero.style.transform =
            `translateY(${scroll * 0.18}px)`;

        hero.style.opacity =
            `${1 - scroll / (window.innerHeight * 1.2)}`;

    }

});


/* ================================
   CURSOR PAINT TRAIL — DESKTOP
================================ */

if (window.innerWidth > 700) {

    let lastX = 0;
    let lastY = 0;

    document.addEventListener("mousemove", (e) => {

        const distance = Math.hypot(
            e.clientX - lastX,
            e.clientY - lastY
        );

        if (distance < 35) return;

        lastX = e.clientX;
        lastY = e.clientY;

        const brush = document.createElement("span");

        brush.className = "paint-dot";

        brush.style.left = `${e.clientX}px`;
        brush.style.top = `${e.clientY}px`;

        brush.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(brush);

        setTimeout(() => {
            brush.remove();
        }, 700);

    });

}


/* ================================
   MAGNETIC BUTTONS
================================ */

document.querySelectorAll(
    ".discover, .instagram-button, .gallery-button, .inquire"
).forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});
