import { useState } from "react";
import * as A from "./App.style";

import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";

function App() {
  const [imgs, setImgs] = useState([img1, img2, img3, img4, img5]);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const [isSwiping, setIsSwiping] = useState(false);

  // 마지막 요소를 그냥 배열에서 빼야함

  function onPointerDown(e) {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsSwiping(true);
  }

  let moveX = 0;
  let moveY = 0;
  function onPointerMove(e) {
    if (isSwiping) {
      moveX = e.clientX - startX;
      moveY = e.clientY - startY;

      // console.log(e.clientX);
      // console.log(e.clientY);
      // console.log("moveX", moveX);
      // console.log("moveY", moveY);

      
    }
  }

  function onPointerUp() {
    setIsSwiping(false);
  }

  function stopSwipping(){
    setIsSwiping(false)
  }



  return (
    <A.Wrapper>
      <A.Frame>
        {imgs.map((img, idx) => (
          <A.Card
            key={idx}
            onPointerDown={(e) => onPointerDown(e)}
            onPointerMove={(e) => onPointerMove(e)}
            onPointerUp={(e) => {onPointerUp(e)}}
            // onPointerLeave={(e) => onPointerLeave}
            // onDragEnd={stopSwipping}
          >
            <img src={img} />

          </A.Card>
        ))}
      </A.Frame>
    </A.Wrapper>
  );
}

export default App;
