document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector(".videoArea video");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        let delta = scrollY - lastScrollY;

        if (Math.abs(delta) > 1) { // Küçük kaydırmaları filtrele
            let step = 0.0001; // Milisaniye seviyesinde kaydırma (1ms = 0.001s)
            video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + (delta * step)));
        }

        lastScrollY = scrollY;
    });
});
