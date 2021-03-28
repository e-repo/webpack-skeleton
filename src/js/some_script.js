import $ from "jquery";

$('.js-title').on('click', (e) => {
    const title = $(e.currentTarget).text()
    window.alert(title)
});