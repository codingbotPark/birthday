import Iphone from "./components/Iphone/Iphone"
import chat1 from "./model/chat1"

// class App extends HTMLDivElement {
//     connectedCallback(){
//         this.style.width = "100px";
//         this.style.height = "100px";
//         this.style.backgroundColor = "red";
//     }
// }

// window.customElements.define('app-div',App,{extends:'div'})
// let app = document.createElement('div', {is:"app-div"})
// export default app

// 또한 this.textContext로 들어온 text를 넣을 수 있다

class App extends HTMLElement {
    connectedCallback(){
        let iphone = this.appendChild(Iphone)
        iphone.setAttribute("content",chat1.content)
    }
}

customElements.define('app-div',App)
export default document.createElement('app-div')