let isChatOpen = false;
let isMicOpen = false;
let isCameraOpen = false;

const openChatBox = (isChatOpen) => {
  const chatBox = document.getElementById('chatBoxId');
  const chatHeader = document.getElementById('chatHead');
  const chatUser1 = document.getElementById('user1Name');
  const chatUser2 = document.getElementById('user2Name');

  if (isChatOpen) {
    chatBox.classList.remove('hidden');
    chatBox.classList.add('chatBoxOpen');
    chatHeader.innerHTML = '회의메세지';
    chatUser1.innerHTML = 'user1';
    chatUser2.innerHTML = 'user2';
  }
  if (!isChatOpen) {
    if (openChatBox !== null) {
      chatBox.classList.remove('chatBoxOpen');
      chatBox.classList.add('hidden');
      chatHeader.innerHTML = '';
      chatUser1.innerHTML = '';
      chatUser2.innerHTML = '';
    }
  }
};

const setChatOpen = (value) => {
  isChatOpen = value;
};

const setMicOpen = (value) => {
  isMicOpen = value;
};

const setCameraOpen = (value) => {
  isCameraOpen = value;
};

const toggleChat = () => {
  console.log(isChatOpen);
  openChatBox(!isChatOpen);
  console.log('전 ' + isChatOpen + '후 ' + !isChatOpen);
  setChatOpen(!isChatOpen);
};

const toggleVideo = () => {
  console.log(isCameraOpen);
  setCameraOpen(!isCameraOpen);
  // newCameraState = !isCameraOpen;
  //.emit('cameraStatusChanged', newCameraState);
};

const toggleMic = () => {
  console.log(isMicOpen);
  setMicOpen(!isMicOpen);
  //const newMicState = !isMicOpen;
  //setMicOpen(newMicState);
  //socket.emit('micStatusChanged', newMicState);
};

const NavigateToMain = () => {
  Swal.fire({
    title: '통화 종료 하시겠습니까 ?',
    showCancelButton: true,
    icon: 'question',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      console.log('main으로...');
    }
  });
};
