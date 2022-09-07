// Smooth scroll functionality
window.addEventListener('load', () => {
    // get stuff
    var elementsToShow = [...document.querySelectorAll('.show-on-scroll')];
    console.log(elementsToShow)

    // if scroll event unavilable use timeout
    var scroll = window.requestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 1000 / 60) };

    // check viewport bounding box with elements'
    function isElementInViewport(el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0
                && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
    }

    // main loop
    function loop() {
        elementsToShow.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            } else {
                element.classList.remove('is-visible');
            }
        });
        scroll(loop);
    }

    // start
    loop();
});

function toggleHamburgerMenu() {
    let nav = document.getElementById("navbar");
    let nav2 = document.getElementById("navbar-list");
    if (nav.classList.contains("expanded")) {
        nav.classList.remove("expanded-show-bg");
        nav2.classList.remove("expanded-show-bg");
        // allow transition to run
        setTimeout(() => nav.classList.remove("expanded"), 400); 
    } else {
        nav.classList.add("expanded");
        nav.classList.add("expanded-show-bg");
        nav2.classList.add("expanded-show-bg");
    }
}