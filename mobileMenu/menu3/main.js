function toggleMobileMenu() {
    var mobileMenu = $(".mobileMenu");
    mobileMenu.toggleClass("active");
    $(".mobileMenuBackdrop").toggleClass("active");

}

$("body").on("click", "header .openMenu", function (button) {
    toggleMobileMenu();
});

$("body").on("click", ".mobileMenu .closeBtn", function (button) {
    toggleMobileMenu();
});
$("body").on("click", ".mobileMenu .menu1 a", function (button) {
    if ($(this).parent().find(".dropdown-menu").length) {
        var thisText = $(this).text();
        var thisHref = $(this).attr("href");
        var menuHTML = $(this).parent().find(".dropdown-menu ul").html();
        var menu2 = $(".mobileMenu .menu2");
        menu2.find("ul").html(menuHTML);
        var subTitle = menu2.find(".subTitle");
        subTitle.text(thisText);
        subTitle.attr("href", thisHref);
        $(".mobileMenu .backButton").addClass("active");
        $(".mobileMenu .menu1").addClass("deactive");
        menu2.addClass("active");

        return false;
    }
});
$("body").on("click", ".mobileMenu .backButton", function (button) {
    $(".mobileMenu .menu1").removeClass("deactive");
    $(".mobileMenu .menu2").removeClass("active");
    $(this).removeClass("active");
    return false;
});
