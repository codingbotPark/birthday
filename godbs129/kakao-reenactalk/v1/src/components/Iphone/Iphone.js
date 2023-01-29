import I from "./Iphone.style.scss";
import chat1 from "../../model/chat1";
import directEffect from "../../logic/effect/directEffect";
import ui from "./ui";

// innerHtml은 이전 내용을 없앤다
class Iphone extends HTMLElement {
  displayElement = null;
  scrollBarElement = null;

  customScrollIsOpaciting = false
  scrollBarFn = null;

  connectedCallback() {
    this.addInnerHtmlToThis(ui.addDisplay());
    this.addInnerHtmlToThis(ui.addButtons());
    this.addInnerHtmlToThis(ui.addMarks());
    this.addInnerHtmlToThis(ui.addDynamicIsland());
    this.addInnerHtmlToThis(ui.addHomeIndicator());

    this.addInnerHtmlToThis(ui.addChattingBar(), `.${I.bezel}`);
    this.addInnerHtmlToThis(ui.addCustomScrollBar(), `.${I.bezel}`);
    this.addInnerHtmlToThis(ui.addDisplayContent(), `.${I.display}`);


    this.setCustomAttributes();
    this.setSCrollBar();

    this.controllContent();
  }

  static get observedAttributes() {
    return ["content"];
  }
  attributeChangedCallback() {}

  setCustomAttributes() {
    this.displayElement = document.querySelector(`.${I.display}`);
    this.scrollBarElement = document.querySelector(`.${I.scrollGaugeThumb}`);
  }
  setSCrollBar() {
    const customSCrollBarWrapper = document.querySelector(`.${I.customScrollBarWrapper}`);

    this.scrollBarElement.style.height = `${Math.round(
      (this.displayElement.clientHeight * customSCrollBarWrapper.clientHeight) /
        this.displayElement.scrollHeight
    )}px`;

    // this.displayElement.scrollY : this.displayElement.clientHeight = 스크롤의 전체 크기(576) : scrollBarElement.height

    this.scrollBarFn = (e) => {
      this.moveCustomScroll()
      if (!this.customScrollIsOpaciting){
        this.customScrollIsOpaciting = true
        this.scrollBarElement.style.transition = ""
        this.scrollBarElement.style.opacity = 1
        setTimeout(() => {
            this.customScrollIsOpaciting = false
            this.scrollBarElement.style.transition = "opacity 0.5s"
            this.scrollBarElement.style.opacity = 0
        },1500)
      }

      this.scrollBarElement
    }
  }
  
  freeViewMode() {
    // 1. 채팅방에 스크롤이 생기게 한다
    this.displayElement.style.overflowY = "auto";
    // 2. 눈에보이는 customScrollBar를 생기게 한다
    this.scrollBarElement.style.opacity = "1";
    // 3. customScrollBar의 위치 초기화
    this.moveCustomScroll()
    // 4. eventListener를 붙여서 customScrollBar를 움직인다
    this.displayElement.addEventListener("scroll", this.scrollBarFn);
  }
  staticViewMode() {
    // 1. 채팅방 스크롤 삭제
    this.displayElement.style.overflowY = "hidden";
    // 2. customScrollBar를 보이지 않게 한다
    this.scrollBarElement.style.opacity = "0";
    // 3. removeEventListener
    const result = this.displayElement.removeEventListener("scroll", this.scrollBarFn);
  }

  /** 변경 후 가장 마지막 opacity가 1인 요소를 인자로 받는다 */
  repositionScroll({ contents, lastVisibleElementIdx }) {
    if (lastVisibleElementIdx < 0) return;

    const displayHeightWOChattingBar = this.displayElement.offsetHeight - 100;
    const contentOffsetBottom =
      contents[lastVisibleElementIdx].offsetTop +
      contents[lastVisibleElementIdx].clientHeight;

    // 스크롤 이동
    this.displayElement.scrollTop =
      contentOffsetBottom - displayHeightWOChattingBar;
  }
  moveCustomScroll(){
    const customSCrollBarWrapper = document.querySelector(`.${I.customScrollBarWrapper}`);
    const DSEMaxScrollTop = this.displayElement.scrollHeight - this.displayElement.clientHeight
    const CSBMaxScrollTop = customSCrollBarWrapper.clientHeight - this.scrollBarElement.offsetHeight  

    this.scrollBarElement.style.top = `${Math.round((this.displayElement.scrollTop * CSBMaxScrollTop) / DSEMaxScrollTop)}px`

    // DE의 최대 scrollTop : 현재 스크롤 Top =
    // CS의 전체 세로 - CS의 세로 : CS의 position top
  }

  controllContent() {
    // nodeList가 리턴된다
    let comments = document.querySelectorAll(`.${I.content}`);

    let scroll = window.scrollY;
    let windowSide = window.innerHeight;
    let scrollToIdx = Math.floor(scroll / windowSide);
    let freeViewWorked = false;

    // --------- dom 초기화
    comments.forEach((comment) => (comment.style.opacity = "0"));


    window.addEventListener("scroll", () => {
      // 계속 사이즈(스크롤 등?) 을 세팅해준다
      scroll = window.scrollY;
      windowSide = window.innerHeight;
      scrollToIdx = Math.floor(scroll / windowSide);

      comments.forEach((comment, idx) => {
        
        if (idx < scrollToIdx && comment.style.opacity === "0") {
          directEffect(
            chat1.content[idx].effectMode,
            chat1.content[idx].effect.in,
            comment
          );
          freeViewWorked = false;
          this.staticViewMode();
          this.repositionScroll({
            contents: comments,
            lastVisibleElementIdx: idx,
          });
        } else if (idx >= scrollToIdx && comment.style.opacity === "1") {
          directEffect(
            chat1.content[idx].effectMode,
            chat1.content[idx].effect.out,
            comment
          );
          freeViewWorked = false;
          this.staticViewMode();
          this.repositionScroll({
            contents: comments,
            lastVisibleElementIdx: idx - 1,
          });
        }

        
        // 만약 끝까지 스크롤을 내렸다면
        else if (
          document.body.clientHeight ===
            Math.round(window.scrollY + window.innerHeight) &&
          !freeViewWorked
        ) { 
          freeViewWorked = true;
          this.freeViewMode();
          // 스크롤이 생기면 width가 밀리기 때문에 heigth가 늘어난다,
          // 따라서 reposition을 해준다
          this.repositionScroll({
            contents: comments,
            lastVisibleElementIdx: comments.length - 1, // 무조건 마지막 요소
          });
        } 


      });
    });
  }

  /** targetDom은 있으면 targetDom으로 간다 */
  addInnerHtmlToThis(html, querySelectValue) {
    if (querySelectValue) {
      let targetDom = document.querySelector(querySelectValue);
      targetDom.innerHTML = `
              ${targetDom.innerHTML}
              ${html}
          `;
    } else {
      this.innerHTML = `
          ${this.innerHTML}
          ${html}
      `;
    }
  }

  getNumbersFromString(str){
    const regex = /[^0-9]/g;
    return Number(str.replace(regex, ""));
  }
}

customElements.define("iphone-div", Iphone);
export default document.createElement("iphone-div");
