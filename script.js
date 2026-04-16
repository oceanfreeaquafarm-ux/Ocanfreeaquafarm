document.addEventListener('DOMContentLoaded', () => {

    // Scroll animation
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // ✅ Load header & footer
    loadComponent("header.html", "header");
    loadComponent("footer.html", "footer");
    loadComponent("whatsapp.html", "whatsapp");
    initBuyButtons();
});


// 🔥 Navbar init function (IMPORTANT)
function initNavbar() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    } else {
        console.log("Navbar elements not found ❌");
    }
}


// 🔥 Load header/footer + trigger navbar
function loadComponent(file, id) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // ✅ VERY IMPORTANT
            if (id === "header") {
                initNavbar(); // 👉 header load kazhinjittu run cheyyum
            }
        })
        .catch(err => console.log("Error loading:", err));
}

document.addEventListener("click", function (e) {
    if (e.target.closest(".buy-btn")) {
        e.preventDefault();

        const btn = e.target.closest(".buy-btn");
        const product = btn.getAttribute("data-product");

        const message = `Hi, I'm interested in ${product} Guppy.`;
        const url = `https://wa.me/+919847528357?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }
});