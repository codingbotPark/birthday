import "./App.css";
import { useState, useEffect } from "react";

import test from "./images/test.jpg";

// https://velog.io/@yujuck/Javascript-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8A%A4%EC%99%80-%EC%93%B0%EB%A1%9C%ED%8B%80%EB%A7%81

function App() {
  const [pages, setPages] = useState([
    {
      id: 0,
      comment: "야! 정우재!",
      img: test,
    },
    {
      id: 1,
      comment: "박병관입니다",
      img: test,
    },
    {
      id: 2,
      comment: "생일 선물로 css 하나 알려준듯",
      img: test,
    },{
      id: 3,
      comment: "하나 더 추가",
      img: test,
    },
  ]);

  return (
    <div className="container">
      {
        pages.map((page) => (
          <div 
          key={page.key}
          className="item"
          >
            <img src={page.img} />
            <h1>{page.comment}</h1>
            <div className="id">{page.id+1}</div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
