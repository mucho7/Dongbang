import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navbar, FooterBar } from "components/common";
import { UserInfo } from "components/profile";
import { TotalAbilityChart } from "components/statistics";
import { useNavigate } from "react-router-dom";
import { auth } from "service";
import PrivateRoute from "components/common/PrivateRoute";

function MyProfile() {
  const navigate = useNavigate();

  const handlePage = () => {
    navigate("/statistics/total");
  };

  return (
    <div>
      <PrivateRoute />
      <Navbar />
      <UserInfo />
      {/* <div style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "2rem"}}> */}
      <AbilityBox onClick={handlePage}>
        <Typo>전체 통계 보기</Typo>
        <TotalAbilityChart userId={"19"} />
      </AbilityBox>
      <InfoBox>
        <Typo>알림 사항</Typo>
        <Typo>알림 사항</Typo>
      </InfoBox>
      {/* </div> */}
      {/* <FooterBar/> */}
    </div>
  );
}
const AbilityBox = styled.button({
  backgroundColor: "#D9F7F3",
  width: "37vw",
  display: "flex",
  marginTop: "4rem",
  marginLeft: "11vw",
  // marginRight: "1rem",
  borderRadius: "1rem",
  justifyContent: "center",
  position: "fixed",
  cursor: "pointer",
  transition: "all 0.8s, color 0.3",
  "&:hover": {
    color: "#fff",
    boxShadow:
      "inset 50vw 0 0 0 rgba(0,0,0,0.25), inset -50vw 0 0 0 rgba(0,0,0,0.25)",
  },
});
const InfoBox = styled.div({
  backgroundColor: "#D9F7F3",
  width: "37vw",
  height: "47%",
  // border: "solid",
  display: "flex",
  flexDirection: "column",
  marginTop: "4rem",
  marginLeft: "52vw",
  // marginLeft: "1rem",
  borderRadius: "1rem",
  // justifyContent: "center",
  position: "fixed",
});

const Info = styled.div({
  borderRadius: "1rem",
  backgroundColor: "#FFB4B4",
  color: "black",
  width: "20rem",
  height: "5rem",
});

const Typo = styled.p`
  font-size: 1.5rem;
  text-decoration: none;
  margin-left: 2rem;
  font-weight: bold;
`;

export default MyProfile;
