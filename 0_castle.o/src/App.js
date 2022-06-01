import "./App.css";
import ReactTypingEffect from "react-typing-effect";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import img from "./myimg.png"
import box from "./box.png"

function App() {

  const [isClick,setIsClick] = useState(false);

  return (
    <div className="wrapper">
      <div className="container"  onClick={() => setIsClick(true)}>
        <ReactTypingEffect
          text={isClick ? ["김영성", "생일축하해","희귀짤이다"] : "택배왔어요"}
          speed={100}
          eraseSpeed={100}
          eraseDelay={2000}
          typingDelay={2000}
          cursorRenderer={(cursor) => <h1>{cursor}</h1>}
          // text는 출력할 문자열 모두
          displayTextRenderer={(text, i) => {
            return (
              <h1>
                {text.split("").map((char, i) => {
                  const key = `${i}`;
                  return <span key={key}>{char}</span>;
                })}
              </h1>
            );
          }}
        />
        <img src={isClick ? img : box}/>
      </div>

      <Canvas className="canvas">
        <Stars />
      </Canvas>
    </div>
  );
}

export default App;
