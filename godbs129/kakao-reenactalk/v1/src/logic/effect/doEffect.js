export default {
    fadeIn:(dom) => {
        dom.style.transition="opacity 1s"
        dom.style.opacity = "1"
    },
    fadeOut:(dom) => {
        dom.style.transition="opacity 1s"
        dom.style.opacity = "0"
    }
}