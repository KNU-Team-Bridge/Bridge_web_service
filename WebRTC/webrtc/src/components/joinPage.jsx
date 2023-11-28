import "./joinPage.scss";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../images/bridge.png";
import Swal from "sweetalert2";

function JoinPage() {
  // id, password 정의
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const realId = "demo";
  const realPw = "demo";

  const Navigate = useNavigate();

  const goToMain = () => {
    Navigate("/");
  };
  return (
    <div className="background">
      <div className="Components">
        <div className="logo">
          <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
        </div>
        <div className="title">Bridge</div>
        <div className="nameComponents">
          <input
            id="name"
            className="nameInput"
            placeholder="이름을 입력하세요."
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="idComponents">
          <input
            id="id"
            className="idInput"
            placeholder="아이디를 입력하세요."
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
        </div>
        <div className="pwComponents">
          <input
            id="pw"
            className="pwInput"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="cbComponents">
          <div className="questionText">나는 청각장애인이다</div>
          <div className="cbDiv1">
            <div className="cbtext">Yes</div>
            <input
              id="Yes"
              className="cb"
              type="checkbox"
              name="deaf"
              value="yes"
            ></input>
          </div>
          <div className="cbDiv2">
            <div className="cbtext">No</div>
            <input
              id="No"
              className="cb"
              type="checkbox"
              name="deaf"
              value="no"
            ></input>
          </div>
        </div>
        <div className="buttonComponent">
          <button
            type="button"
            className="loginButton"
            onClick={(e) => {
              if (realId === id && realPw === password && name === "호반우") {
                Swal.fire({
                  title: "회원가입 완료",
                  text: "",
                  icon: "success",
                });
                setTimeout(3000);
                e.stopPropagation();
                goToMain();
              } else {
                console.log("?");
              }
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
