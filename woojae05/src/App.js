import "./App.css";
import { useState, useEffect,useRef } from "react";

import pbk from "./images/user/pbk.png"

// https://velog.io/@yujuck/Javascript-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4%EC%99%80-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81 

function App() {
  const [pages, setPages] = useState([
    {
      id: 0,
      comment: "음 우재야 들켰지만 생일축하 웹이다",
    },{
      id: 1,
      comment: "생 일 축 하 해",
    },{
      id: 2,
      comment: "별거없어보이지만 어제부터 삽질 오지게함",
    },{
      id: 3,
      comment: "어케했는지 궁금하면 css보고, 생일선물로 css하나 알았다고 생각하셈",
    },{
      id: 4,
      comment: "동현이랑 상은이도 적고싶은 말 적으면 좋았는데",
    },{
      id: 5,
      comment: "연애하는 넘들 귀찮아 보여서 걍 빌드했다",
    },{
      id: 6,
      comment: "암튼 머 하고싶은거 하면서 살자!",
    },{
      id: 7,
      comment: "ㅎㅇㅌ!",
    },{
      id: 8,
      comment: "생일 웹 너무 기대하게했냐? 어땟는지 알려주셈",
    },
  ]);


  const [current,setCurrent] = useState(0)


  // 필요없는 부분 시작
  const [trigger,setTrigger] = useState(true)

  function handleScroll(e){
    if (trigger){
      setTrigger(false)
      setTimeout(() => {
        setTrigger(true)
      },1000)
    }
  }
  // 필요없는 부분 끝

  return (
    <div 
    className="container"
    onScroll={handleScroll}
    >
      {
        pages.map((page) => (
          <div 
          key={page.id}
          className="item"
          onMouseOver={() => setCurrent(page.id)}
          >
            <img src={require(`./images/background/pbk${page.id+1}.jpg`)} className="itemImg"/>
            <h1>{page.comment}</h1>
          </div>
        ))
      }

      <div 
      className="user"
      style={{top:current * (window.innerHeight) + 650}}
      >
        <div>
          {current+1} 페이지
        </div>
        <img src={pbk}/>
      </div>
    </div>
  );
}

export default App;

