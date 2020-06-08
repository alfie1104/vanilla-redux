import { createStore } from "redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";

/*
  //===createAction을 쓰면 type : xxxx, payload : xxx의 값을 리턴해주는 action생성자를 만들 수 있음
  //createAction으로 생성한 함수를 호출할 때, (아래의 경우 addToDo("ㅁㅇㅁㄹ")) 인자를 넘기면, 해당 인자가 action의 payload로 설정됨
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");
*/
/* 
  //===createReducer를 이용하면 아래와 같이 switch case를 안 써도 됨 ===/

  const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== action.payload);
    default:
      return state;
  }
}; */

/*
  뭔가를 return해야하면 new state를 리턴하고,
  return 하지 않고 그냥 state를 mutate할 수도 있음
  state를 mutate하면 내부적으로 immer가 new state를 리턴함
*/
/*
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter((toDo) => toDo.id !== action.payload),
});
*/

//====createSlice를 사용하면 Reducer뿐만 아니라 action도 생성해줌
const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: toDos.reducer });

export const { add, remove } = toDos.actions;

export default store;
