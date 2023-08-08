function toggleMobileMenu() {
    var mobileMenu = $(".mobileMenu");
    mobileMenu.toggleClass("active");

}

$("body").on("click", "header .openMenu", function (button) {
    toggleMobileMenu();
});

$("body").on("click", ".mobileMenu .closeBtn", function (button) {
    toggleMobileMenu();
});
