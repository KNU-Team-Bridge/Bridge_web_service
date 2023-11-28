import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
//import "./App.css";
import './meetingPage.scss';
import logoImg from '../images/bridge.png';
import {BsCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill, BsFillChatLeftTextFill, BsFillMicMuteFill} from 'react-icons/bs';
import {FaPhoneSlash, FaPhone} from 'react-icons/fa6';
import useSocketManager from '../../socketManager';

function MeetingPage() {
  // FRONT CODE

  const {localVideoRef, remoteVideoRef, startCall} = useSocketManager();

  const [isChatOpen, setChatOpen] = useState(false);
  const [isMicOpen, setMicOpen] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);

  const Navigate = useNavigate();

  const NavigateToMain = () => {
    Navigate('/');
  };

  const toggleChat = () => {
    console.log(isChatOpen);
    setChatOpen(!isChatOpen);
  };

  const toggleVideo = () => {
    setCameraOpen(!isCameraOpen);
  };

  const toggleMic = () => {
    setMicOpen(!isMicOpen);
  };

  // FRONT CODE END

  return (
    /*<div className="meeting-page">
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={startCall}>Start Call</button>
      <input
        value={message} // 여기서 message는 현재 입력된 메시지를 나타내는 상태
        onChange={(e) => setMessage(e.target.value)} // 입력 필드가 변경될 때 상태 업데이트
        type="text"
      />
      <button onClick={sendMessage}>Send Message</button>{" "}
      <div>
        {receivedMessages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === "me" ? "my-message" : "their-message"}
          >
            {msg.sender}: {msg.text}
          </p>
        ))}
      </div>
    </div>*/

    <div className='meetpageBackground'>
      <div className='head-body-functions'>
        <div className='head'>
          <div className='logo'>
            <img className='logoImage' src={logoImg} alt='bridge-logo-img'></img>
          </div>
          <div className='title'>Bridge</div>
        </div>
        <div className='body1'>
          <div className='peer1Video'>
            <video className='video1' ref={localVideoRef} autoPlay playsInline />
          </div>
          <div className='peer2Video'>
            <video className='video2' ref={remoteVideoRef} autoPlay playsInline />
          </div>
        </div>
        <div className='functions'>
          <div className='startCallBtnDiv'>
            <button onClick={startCall} className='startCallBtn'>
              <FaPhone className='startIcon'></FaPhone>
            </button>
          </div>
          <div className='cameraBtnDiv'>
            <button onClick={toggleVideo} className='cameraBtn'>
              {isCameraOpen ? <BsCameraVideoFill className='cameraIcon' /> : <BsFillCameraVideoOffFill className='cameraIcon' />}
            </button>
          </div>
          <div className='micBtnDiv'>
            <button onClick={toggleMic} className='micBtn'>
              {isMicOpen ? <BsFillMicFill className='micIcon' /> : <BsFillMicMuteFill className='micIcon' />}
            </button>
          </div>
          <div className='textBtnDiv'>
            <button onClick={toggleChat} className='textBtn'>
              <BsFillChatLeftTextFill className='textIcon' />
            </button>
          </div>
          <div className='endBtnDiv'>
            <button className='endBtn' onClick={NavigateToMain}>
              <FaPhoneSlash className='endIcon'></FaPhoneSlash>
            </button>
          </div>
        </div>
      </div>
      {isChatOpen && (
        <div className='chatBoxOpen'>
          <div className='chatBoxstyle'>
            <div className='chat-head'>회의메세지</div>
            <div className='chatLine'></div>
            <div className='chat-message'>
              <div className='user1'>
                <div className='user1-name'>user1</div>
                <div className='user1-message'></div>
              </div>
              <div className='user2'>
                <div className='user2-message'></div>
                <div className='user2-name'>user2</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isChatOpen && <div className='chatBox'></div>}
    </div>
  );
}

export default MeetingPage;
