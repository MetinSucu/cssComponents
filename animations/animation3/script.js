$(document).ready(function () {
    const $header = $("header");
    function getBackgroundColor(element) {
        while (element.length) {
            const bgColor = element.css("background-color");
            if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
                return bgColor;
            }
            element = element.parent();
        }
        return "rgb(255, 255, 255)";
    }

    function updateTextColor() {
        const rect = $header[0].getBoundingClientRect();
        const elementBelow = $(document.elementFromPoint(rect.left + rect.width / 2, rect.bottom + 1));

        if (!elementBelow.length) return;

        const bgColor = getBackgroundColor(elementBelow);
        const rgbValues = bgColor.match(/\d+/g);

        if (!rgbValues) return;
        const brightness = (parseInt(rgbValues[0]) * 0.299) +
            (parseInt(rgbValues[1]) * 0.587) +
            (parseInt(rgbValues[2]) * 0.114);

        changeHeaderColor(brightness >= 128);
    }

    $(window).on("scroll", updateTextColor);
    updateTextColor(); // Initial check on page load

    function changeHeaderColor(isLightBackground) {
        const $svgPaths = $header.find('.logo svg path');

        if (isLightBackground) {
            $header.removeClass("whiteHeader");
        } else {
            $header.addClass("whiteHeader");
            $svgPaths.each(function () {
                const $path = $(this);
                const randomDelay = Math.random() * 0.5;

                $path.css({
                    'transition-delay': `${randomDelay}s`,
                });
            });
        }
    }
});
