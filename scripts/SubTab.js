document.addEventListener('DOMContentLoaded', () => { 
    if (window.self === window.top) {
        document.body.innerHTML = "<p> Sorry! This site is not meant to be shown independently. </p>";
    }
});