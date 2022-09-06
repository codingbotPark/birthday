import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100vh;
  background-image: linear-gradient(45deg, #D198c5ff, #e0c568ff);
`

export const Frame = styled.div`
  position: relative;
  width:360px;
  height:540px;
`

export const Card = styled.div`
 
  > img {
    position: absolute;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center; 
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.5);;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  user-select: none;
  /* 모바일을 위해 */
  touch-action: none;
  }

`

// .card{
  // position: absolute;
  // width:100%;
  // height:100%;
  // display: flex;
  // align-items: center;
  // justify-content: center; 
  // border-radius: 10px;
  // box-shadow: 0 5px 10px rgba(0,0,0,0.5);;
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-position: center;
  // cursor: pointer;
  // user-select: none;
  // /* 모바일을 위해 */
  // touch-action: none; 
// }