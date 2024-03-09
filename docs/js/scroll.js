// Smooth scroll functionality
window.addEventListener('load', () => {
    var elementsToShow = [...document.querySelectorAll('.show-on-scroll')];

    var observer = new IntersectionObserver(entries => {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    });

    elementsToShow.forEach(el => observer.observe(el));

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