$(document).ready(function () {
    var fakeWrapper = $(".fakeWrapper");
    var svgWrapper = $(".svgWrapper");
    var svgContainer = $(".svg-container");

    function initializePaths() {
        svgContainer.find(".line").each(function () {
            var path = $(this);
            var pathLength = path[0].getTotalLength();
            var dashArrayPart = Math.round(pathLength / 1.5);
            var dashArrayTotal = Math.round(pathLength);
            var dashOffset = dashArrayPart;

            path.attr({
                "dashOffsetFinal": "-" + Math.round(pathLength),
                "dashArrayTotal": dashArrayTotal,
                "dashArrayPart": dashArrayPart
            });

            path.css({
                'transition': 'none',
                'stroke-dasharray': dashArrayPart + ' ' + dashArrayTotal,
                'stroke-dashoffset': dashOffset
            });
        });
    }

    function calculatePathOffset(path, percent) {
        var thisID = path.index();
        var pathdashArrayTotal = parseFloat(path.attr("dashArrayTotal"));
        var pathdashOffsetFinal = parseFloat(path.attr("dashOffsetFinal"));
        var pathdashArrayPart = parseFloat(path.attr("dashArrayPart"));
        var delay = thisID * 300;

        var pathDashoffset = percentCalc(pathdashArrayPart + delay, pathdashOffsetFinal - delay, percent);

        var duration;

        if ((pathDashoffset * -1) + (pathdashArrayPart - 700) >= pathdashArrayTotal) {
            if (path[0].hasAttribute("finaloffset")) {
                pathDashoffset = parseFloat(path.attr("finaloffset"));
                duration = 0.4;
            } else {
                pathDashoffset = (pathdashArrayTotal - pathdashArrayPart + 700) * -1;
                pathDashoffset = randomUpDown(pathDashoffset, 150)
                duration = 0.5;
                path.attr("finaloffset", pathDashoffset);
            }
        } else {
            duration = 0.3;
            pathDashoffset = randomUpDown(pathDashoffset, 100);
        }

        if (pathDashoffset > pathdashArrayPart) {
            pathDashoffset = pathdashArrayPart;
        }

        path.css({
            'transition': 'stroke-dashoffset ' + duration + 's ease-in-out',
            'stroke-dasharray': pathdashArrayPart + ' ' + pathdashArrayTotal,
            'stroke-dashoffset': pathDashoffset
        });
    }

    function checkPosition() {
        var scrollPosition = $(window).scrollTop();
        var elementPosition = fakeWrapper.offset().top;
        var elementHeight = fakeWrapper.height();
        var windowHeight = $(window).height();
        var wrapperHeight = svgWrapper.height();
        var percent;

        if (scrollPosition > elementPosition - windowHeight + (wrapperHeight / 3)) {
            if (scrollPosition < (elementPosition + elementHeight - (wrapperHeight * 1.2))) {
                percent = percentReverse(elementPosition - windowHeight + (wrapperHeight / 3), elementPosition + elementHeight - (wrapperHeight * 1.2), scrollPosition);
            } else {
                percent = 100;
            }
        } else {
            percent = 0;
        }

        svgContainer.find(".line").each(function () {
            if (percent > 0) {
                calculatePathOffset($(this), percent);
            }
        });
    }

    checkPosition();
    $(window).scroll(function () {
        checkPosition();
    });

    initializePaths();
});

function percentReverse(start, end, current) {
    var ratio = (current - start) / (end - start);
    return ratio * 100;
}

function percentCalc(start, end, percentage) {
    return parseFloat(start) + (parseFloat(end) - parseFloat(start)) * (percentage / 100);
}

function randomUpDown(centerValue, range) {
    var random = Math.random() * (2 * range) - range;
    return centerValue + random;
}
