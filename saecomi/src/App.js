import "./App.css";
import { useState, useEffect,useRef } from "react";

import me from "./images/user/me.png"
import gift from "./images/user/giftBox.png"

// https://velog.io/@yujuck/Javascript-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4%EC%99%80-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81 

function App() {
  const [pages, setPages] = useState([
    {
      id: 0,
      comment: "쌤 뭔가 싶겠지만",
    },{
      id: 1,
      comment: "아는사람은 아는",
    },{
      id: 2,
      comment: "박병관의 생일축하 웹입니다",
    },{
      id: 3,
      comment: "나르샤 때문에 바빠서 쫌 대충 만든거처럼 보이지만",
    },{
      id: 4,
      comment: "선생님한테 만드는건 처음입니다, 감동이죠?",
    },{
      id: 5,
      comment: "생일축하합니다^^",
    },{
      id: 6,
      comment: "학교에 young한 느낌을 만들어 주셔서 감사합니다",
    },{
      id: 7,
      comment: "참고로 몇몇 사진은 1학년이랑, 쌤 인스타에서 들고왔어요 괜..찮..죠?",
    },{
      id: 8,
      comment: "휴대폰에서 잘 작동했을지 모르겠네요ㅋㅋ",
    },
  ]);

  const [isClick,setIsClick] = useState()

  return (
    <div 
    className="container"
    >
      {
        pages.map((page) => (
          <div 
          key={page.id}
          className="item"
          >
            <img src={require(`./images/background/luj${page.id+1}.jpg`)} className="itemImg"/>
            <h1>{page.comment}</h1>
          </div>
        ))
      }
      <div className="lastC item">
        <h1 className="lastH">{ isClick ? "선물은 바로 접니다 허허 생일축하해요 선생님" : "마지막은 선물 가겠습니다"}</h1>
        <div className="gift">
          <img src={isClick ? me : gift} onClick={() => setIsClick(true)} />
        </div>
      </div>
    </div>
  );
}

export default App;

