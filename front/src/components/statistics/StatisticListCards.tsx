// import { Grid } from '@mui/material';

// interface GameScore {
//   type: string;
//   gameId: number;
//   score: number;
//   endurance: number;
//   resilience: number;
// }

// interface CardDataProps {
//   gameScoreList: GameScore[];
// }

// const StatisticListCards = (props: CardDataProps) => {
//   // 데이터를 3열씩 자른 배열을 생성합니다.

//   return (
//     <Grid container spacing={2}>

//     </Grid>
//   );
// };

// export default StatisticListCards;

import { Height } from "@mui/icons-material";
import { CardContent, Grid, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router";
import styled from "styled-components";

interface GameScore {
  type: string;
  gameId: number;
  score: number;
  endurance: number;
  resilience: number;
}

interface CardDataProps {
  cardList: GameScore[];
}

const StatisticListCards = (props: CardDataProps) => {
  const navigate = useNavigate();
  const { cardList } = props;

  // 데이터를 3열씩 자른 배열을 생성합니다.
  const rows = cardList.reduce((acc, item, index) => {
    const rowIndex = Math.floor(index / 3);
    acc[rowIndex] = [...(acc[rowIndex] || []), item];
    return acc;
  }, [] as GameScore[][]);

  if (cardList.length !== 0) {
    return (
      <BoardBox>
        <Grid container spacing={2}>
          {rows.map((row, rowIndex) => (
            <Grid key={rowIndex} container item xs={12} spacing={4}>
              {row.map((data, dataIndex) => (
                <Grid key={dataIndex} item xs={4}>
                  <Card sx={{ width: "100%", height: "100%" }}>
                    <CardActionArea
                      onClick={() =>
                        navigate(`/statistics/?gameid=${data.gameId}`)
                      }
                    >
                      <CardContent>
                        <DongBang>동방역검</DongBang>
                        <TitleContainer>
                          {/* {" "} */}
                          {data.type === "cat" && "고양이 술래잡기"}
                          {data.type === "rps" && "가위바위보"}
                          {data.type === "road" && "길 만들기"}
                          {data.type === "rotate" && "도형 회전하기"}
                        </TitleContainer>
                        <DateContainer>2023.05.11</DateContainer>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </BoardBox>
    );
  } else {
    return (
      <>
        <BoardBox>
          <EmptyBox>응시 기록이 없습니다.</EmptyBox>
        </BoardBox>
      </>
    );
  }
};

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",
  padding: "1rem 0",

  justifyContent: "center",
  // alignItems: "center",

  width: "80%",
  height: "70%",
});

const DongBang = styled.div`
  margin-top: 0.3rem;
  background-color: #194702;
  border-radius: 3px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
  width: 4rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin-top: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DateContainer = styled.div`
  margin-top: 0.3rem;
  margin-left: 0.2rem;
  font-size: 0.9rem;
  font-weight: bold;
`;

const EmptyBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",

  justifyContent: "center",

  color: "#555",
  fontSize: "2rem",
  height: "5.5rem",
  fontWeight: "bold",
});

export default StatisticListCards;
