import queryString from "query-string";
import { useLocation } from "react-router-dom";

import { Navbar } from "components/common";

import {
  VideoChart,
  AbilityChart,
  ResultsTable,
  VideoResult,
} from "components/statistics";
import styled from "styled-components";

const StatisticsPage = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  return (
    <TemplateBox>
      <MainTitleContainer>나의 통계</MainTitleContainer>
      <Divider />
      <TitleContainer>결과보기</TitleContainer>
      <BoardBox>
        <ResultsTable gameId={parsed.gameid?.toString()} />
      </BoardBox>
      <Divider />
      <TitleContainer>
        &nbsp;당신은 사랑받기 위<br />해 태어난사람
      </TitleContainer>
      <AbilityChart gameId={parsed.gameid?.toString()} />
      <Divider />
      <TitleContainer>영상 분석 결과</TitleContainer>
      <VideoResult gameId={parsed.gameid?.toString()} />
      {/* <TitleContainer>나의 영상 확인</TitleContainer> */}
      <VideoChart gameId={parsed.gameid?.toString()} />
    </TemplateBox>
  );
};
const TemplateBox = styled.div({
  margin: "2% auto",
  display: "flex",
  flexDirection: "column",
  // justifyContent: "center",
  // alignItems: "center",
  borderRadius: 10,
  width: "90%",
  // height: "100%",
  background: "#E0F6F4",
});

const BoardBox = styled.div({
  position: "relative",
  margin: "1rem auto",
  display: "flex",
  flexDirection: "row",
  padding: "1rem 0",

  justifyContent: "center",
  alignItems: "flex-start",

  width: "90%",
  height: "70%",
  background: "white",
  borderRadius: 10,
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
});

// const TableBox = styled.div({
//   position: "relative",
//   margin: "1rem auto",
//   display: "inline-flex",
//   flexDirection: "row",
//   padding: "1rem 0",

//   justifyContent: "center",
//   alignItems: "flex-start",

//   // width: "90%",
//   // height: "70%",
//   background: "white",
//   // borderRadius: 10,
//   boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)",
// });

const TitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "2rem",
  marginTop: "0.5rem",
  marginBottom: "0.5rem",
  marginLeft: "5%",
});

const MainTitleContainer = styled.div({
  fontWeight: "bold",
  fontSize: "4rem",
  margin: "2rem",
  marginLeft: "5%",
});

const Divider = styled.hr`
  width: 90%;
  border: none;
  border-top: 1.5px solid black;
`;

export default StatisticsPage;
