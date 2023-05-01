import { useState, useMemo, MouseEvent } from "react";

import RoadSingleBox from "./RoadSingleBox";
import ProblemInfo from "./ProblemInfo";
import { getFindRoadProblems, putFindRoadProblems } from "api/test";

import styled from "styled-components";
import { Button } from "@mui/material";

type GameBoardProps = {
  ascProblemNum: () => void;
};

type Problem = {
  problem_id: number;
  problem: number[][];
  correct?: number;
};

type TempProblem = {
  problemId: number;
  problem?: number[][];
  correct?: number;
  problem_id?: number;
};

type Answer = {
  gameType: string;
  problemId: number;
  answer: number[][];
  timestamp: string[];
  clicks: number;
};

const GameBoard = (props: GameBoardProps) => {
  const { ascProblemNum } = props;
  const initialProblem: Problem = {
    problem_id: 0,
    problem: [
      [-1, 1, -1, 3, 2, -1, -1],
      [-1, 0, 0, 0, 0, 0, 1],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, 2],
      [-1, 0, 0, 0, 0, 0, -1],
      [-1, 0, 0, 0, 0, 0, 3],
      [-1, -1, -1, -1, -1, -1, -1],
    ],
    correct: 0,
  };
  const [clickCount, setClickCount] = useState(20);
  const [easyProblems, setEasyProblems] = useState<Array<Problem>>([]);
  const [hardProblems, setHardProblems] = useState<Array<Problem>>([]);
  const [boardState, setBoardState] = useState(initialProblem);
  const [answerList, setAnswerList] = useState<Array<Answer>>([]);
  const [timestamp, setTimestamp] = useState([new Date().toISOString()]);

  const cleanBoard = (): void => {
    const newProblem: Problem | undefined = easyProblems.pop();
    if (newProblem !== undefined) {
      setBoardState(newProblem);
      console.log(newProblem);
    }
  };

  const saveAnswer = () => {
    const newBoardState: TempProblem = {
      ...boardState,
      problemId: boardState.problem_id,
    };
    delete newBoardState.correct;
    delete newBoardState.problem;
    delete newBoardState.problem_id;

    const newAnswer: Answer = {
      ...newBoardState,
      gameType: "road",
      answer: boardState.problem,
      timestamp: [...timestamp, new Date().toISOString()].slice(-2),
      clicks: clickCount,
    };

    const newAnswerList: Array<Answer> = [...answerList, newAnswer];
    ascProblemNum();
    setTimestamp([new Date().toISOString()]);
    setAnswerList(newAnswerList);
  };

  const onBoxClickHandler = (
    event: MouseEvent,
    xIndex: number,
    yIndex: number,
    rotate: number
  ) => {
    event.preventDefault();
    if (clickCount < 1) {
      alert("더 이상 클릭할 수 없어요. 제출해주세요.");
      return;
    } else setClickCount((clickCount) => clickCount - 1);
    const itemValue = boardState.problem[yIndex][xIndex];
    if (
      itemValue === -1 ||
      itemValue === 1 ||
      itemValue === 2 ||
      itemValue === 3
    )
      return;
    const newBoardState = boardState.problem.map((row, rowIndex) =>
      rowIndex === yIndex
        ? row.map((value, columnIndex) =>
            columnIndex === xIndex ? (itemValue === 0 ? rotate : 0) : value
          )
        : row
    );
    setBoardState({ ...boardState, problem: newBoardState });
  };

  const onNextHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    saveAnswer();
    cleanBoard();
    setClickCount(20);
  };

  const onSubmitHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const roadProps = {
      userId: 0,
      gameId: 0,
      date: new Date().toISOString(),
      gameType: "road",
      problems: answerList,
    };
    putFindRoadProblems(roadProps);
  };

  useMemo(async () => {
    const fetchProblems = async () => {
      const newProblems: { easy: Problem[]; hard: Problem[] } =
        await getFindRoadProblems();
      const tempProblem = newProblems.easy.pop();
      if (tempProblem !== undefined) setBoardState(tempProblem);
      setEasyProblems(newProblems["easy"]);
      setHardProblems(newProblems["hard"]);
    };

    fetchProblems();
  }, []);

  return (
    <RowFlexBox>
      <ProblemInfo clickCount={clickCount} leastWall={boardState.correct} />
      <ColFlexBox>
        {boardState.problem.map((item, yIndex) => {
          return (
            <RowFlexBox key={yIndex}>
              {item.map((rowValue, xIndex) => {
                return (
                  <RoadSingleBox
                    key={xIndex}
                    rowValue={rowValue}
                    xIndex={xIndex}
                    yIndex={yIndex}
                    onClickHandler={onBoxClickHandler}
                  />
                );
              })}
            </RowFlexBox>
          );
        })}
        <SubmitButton variant='contained' onClick={onNextHandler}>
          제출
        </SubmitButton>
      </ColFlexBox>
      <ColFlexBox style={{ position: "absolute", right: 0, bottom: 0 }}>
        <button style={{ height: "3rem" }} onClick={onSubmitHandler}>
          테스트용 최종 제출 버튼
        </button>
      </ColFlexBox>
    </RowFlexBox>
  );
};

const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColFlexBox = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SubmitButton = styled(Button)({
  width: "15rem",
  height: "3rem",

  color: "white",
  fontWeight: 1000,
  background: "blue",
  border: "none",
  borderRadius: "20px",

  margin: "3rem",
  cursor: "pointer",
});

export default GameBoard;
