import { createSlice, current } from "@reduxjs/toolkit";
import {
  button_a,
  button_b,
  button_c,
  button_d,
} from "assets/images/turnFigure";

type Answer = {
  gameType: "turn";
  choices: number[];
};

type State = {
  target: number;
  tempAnswer: Answer;
  answerList: Answer[];
  images: string[];
};

const initialState: State = {
  target: 0,
  tempAnswer: { gameType: "turn", choices: Array(8).fill(-1) },
  answerList: [],
  images: [button_a, button_b, button_c, button_d],
};

const turnFigureSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    addAnswer: (state) => {
      /*현재 tempAnswer를 answerList에 추가합니다.*/
      state.answerList.push(state.tempAnswer);
    },
    pushChoice: (state, action) => {
      const { tempAnswer, target } = state;
      tempAnswer.choices[target] = action.payload;
      state.target = target + 1;
    },
    popChoice: (state) => {
      const { tempAnswer, target } = state;
      tempAnswer.choices[target] = -1;
      state.target = target - 1;
    },
    clearChoice: (state) => {
      state.tempAnswer.choices = Array(8).fill(-1);
    },
    checkAnswer: (state) => {
      console.log(current(state.answerList));
    },
  },
});

export const { addAnswer, pushChoice, popChoice, clearChoice, checkAnswer } =
  turnFigureSlice.actions;
export default turnFigureSlice.reducer;
