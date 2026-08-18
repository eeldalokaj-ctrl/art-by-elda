/* =========================
   ART BY ELDA — MAIN JS
========================= */


/* =========================
   LANGUAGE
========================= */

const sqButton = document.getElementById("sq");
const enButton = document.getElementById("en");

let currentLanguage =
    localStorage.getItem("language") || "sq";


function changeLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-sq][data-en]").forEach(element => {

        const translation =
            element.getAttribute("data-" + language);

        if (translation) {
            element.textContent = translation;
        }

    });

    sqButton.classList.toggle(
        "active",
        language === "sq"
    );

    enButton.classList.toggle(
        "active",
        language === "en"
    );

    localStorage.setItem(
        "language",
        language
    );
}


sqButton.addEventListener(
    "click",
    () => changeLanguage("sq")
);

enButton.addEventListener(
    "click",
    () => changeLanguage("en")
);


/* =========================
   ARTWORK MESSAGE
========================= */

function setArtwork(title, price) {

    const message =
        currentLanguage === "sq"
        ? `Përshëndetje Elda! Jam e interesuar për ${title} (${price}).`
        : `Hi Elda! I'm interested in ${title} (${price}).`;

    const instagramURL =
        `https://ig.me/m/artbyelda?text=${encodeURIComponent(message)}`;

    window.open(
        instagramURL,
        "_blank"
    );
}


/* =========================
   LIGHTBOX
========================= */

function openArt(card) {

    const image =
        card.querySelector("img");

    const title =
        card.querySelector("h3").textContent;

    const price =
        card.querySelector(".sale-price").textContent;


    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxPrice =
        document.getElementById("lightboxPrice");


    lightboxImage.src = image.src;

    lightboxTitle.textContent = title;

    lightboxPrice.textContent = price;


    const dmButton =
        document.getElementById("lightboxDM");

    dmButton.onclick = function(event) {

        event.preventDefault();

        setArtwork(
            title,
            price
        );

    };


    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";
}


function closeArt() {

    const lightbox =
        document.getElementById("lightbox");

    lightbox.classList.remove("show");

    document.body.style.overflow =
        "";
}


/* close by clicking background */

document
    .getElementById("lightbox")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeArt();
        }

    });


/* escape key */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {
            closeArt();
        }

    }
);


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".section-reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => revealObserver.observe(element)
);


/* =========================
   MAGNETIC BUTTONS
========================= */

if (window.innerWidth > 700) {

    document
        .querySelectorAll(".magnetic")
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * .08}px, ${y * .08}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

}


/* =========================
   ART IMAGE TILT
========================= */

if (window.innerWidth > 700) {

    document
        .querySelectorAll(".image-wrap")
        .forEach(art => {

            art.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        art.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height;

                    const rotateY =
                        (x - .5) * 2;

                    const rotateX =
                        (y - .5) * -2;

                    art.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            art.addEventListener(
                "mouseleave",
                () => {

                    art.style.transform =
                        "";

                }
            );

        });

}


/* =========================
   CURSOR PAINT DUST
========================= */

if (window.innerWidth > 900) {

    let lastX = 0;
    let lastY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            const distance =
                Math.hypot(
                    event.clientX - lastX,
                    event.clientY - lastY
                );


            if (distance < 55) {
                return;
            }


            lastX = event.clientX;
            lastY = event.clientY;


            const dot =
                document.createElement("span");

            dot.style.position =
                "fixed";

            dot.style.left =
                `${event.clientX}px`;

            dot.style.top =
                `${event.clientY}px`;

            dot.style.width =
                `${Math.random() * 3 + 2}px`;

            dot.style.height =
                dot.style.width;

            dot.style.borderRadius =
                "50%";

            dot.style.background =
                "rgba(49,92,114,.18)";

            dot.style.pointerEvents =
                "none";

            dot.style.zIndex =
                "9997";

            dot.style.transform =
                "translate(-50%,-50%)";

            dot.style.transition =
                "all .7s ease";


            document.body.appendChild(dot);


            requestAnimationFrame(() => {

                dot.style.opacity = "0";

                dot.style.transform =
                    "translate(-50%,-50%) scale(3)";

            });


            setTimeout(
                () => dot.remove(),
                750
            );

        }
    );

}


/* =========================
   HERO PARALLAX
========================= */

const heroContent =
    document.querySelector(".hero-content");


window.addEventListener(
    "scroll",
    () => {

        if (!heroContent) return;

        const scroll =
            window.scrollY;

        if (scroll <
            window.innerHeight) {

            heroContent.style.transform =
                `translateY(${scroll * .12}px)`;

            heroContent.style.opacity =
                Math.max(
                    0,
                    1 -
                    scroll /
                    (window.innerHeight * .9)
                );

        }

    },
    {
        passive: true
    }
);


/* =========================
   PAGE LOADER
========================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "artLoader"
                    );

                if (loader) {
                    loader.style.pointerEvents =
                        "none";
                }

            },
            2500
        );

    }
);


/* =========================
   INITIAL LANGUAGE
========================= */

changeLanguage(
    currentLanguage
);
