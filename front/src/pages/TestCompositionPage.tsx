import { useState, useEffect } from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { resetGameState } from "store/testControlSlice";

import FindRoadPage from "./FindRoadPage";
import { GameSelect, GameTemplate, NotEnough } from "components/game";

import styled from "styled-components";
import { Button } from "@mui/material";
import CatchCatGamePage from "./CatchCatGamePage";
import TurnPicGamePage from "./TurnPicGamePage";
import RpsGamePage from "./RpsGamePage";
import RpsPreparePage from "./RpsPreparePage";
import { FaceDectection } from "components/faceDetect";

function TestCompositionPage() {
  const dispatch = useDispatch();
  const { face, game, isEnough, isGaming } = useSelector(
    (state: RootState) => state.testControl
  );
  const [thisComponent, setThisComponent] = useState(<FaceDectection />);

  useEffect(() => {
    if (face < 2) {
      console.log(face);
      setThisComponent(<FaceDectection />);
    } else if (!isEnough) {
      setThisComponent(<NotEnough />);
    } else {
      console.log("Game State is just changed");
      switch (game) {
        case undefined:
          setThisComponent(<GameSelect />);
          break;
        case "road":
          setThisComponent(<FindRoadPage />);
          break;
        case "rps":
          if (isGaming) {
            setThisComponent(<RpsGamePage />);
          } else {
            setThisComponent(<RpsPreparePage />);
          }
          break;
        case "rotate":
          setThisComponent(<TurnPicGamePage />);
          break;
        case "cat":
          setThisComponent(<CatchCatGamePage />);
          break;
      }
    }
  }, [game, isEnough, isGaming, face]);

  const onResetForDev = () => {
    dispatch(resetGameState());
  };

  return (
    <>
      <TempControlButton variant='contained' onClick={onResetForDev}>
        선택 페이지로 가쉴?
      </TempControlButton>
      <GameTemplate>{thisComponent}</GameTemplate>
    </>
  );
}

const TempControlButton = styled(Button)({
  position: "absolute",
});

export default TestCompositionPage;
