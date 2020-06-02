import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";
/* 
  Reducer : 데이터를 변환하는 함수

  data modifier(reducer)가 return 하는 데이터가 application의 데이터가 됨
  Action을 이용하여 data modifier(reducer)와 소통할 수 있음(데이터를 수정하라고 명령가능) 
  Action은 Object이어야하며, type 속성을 가지고 있어야함

  data modifier(reducer)에 action을 보내기 위해서 dispatch를 사용

  Store는 4개의 함수를 가짐
  그 중, subscribe은 store안에 있는 변화들을 알게 해줌
  subscribe에 callback함수(ex: onChange함수)를 연결하여, state가 변화되었을 때 해야할 동작을 설정가능
*/
const countModifier = (count = 0, action) => {
  //Reducer의 첫번째 인자는 currentState를 뜻함
  //Reducer의 첫번째 인자인 currentState에 =를 이용하여 state 초기값을 할당가능

  //data modifier(reducer)에서 return하는 값이 현재의 데이터(혹은 state)가 됨
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

//Store : 데이터를 저장하는 장소
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => countStore.dispatch({ type: ADD });
const handleMinus = () => countStore.dispatch({ type: MINUS });

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
