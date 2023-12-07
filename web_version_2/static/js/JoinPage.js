let inputUserName = document.querySelector('#name');
let nameMessage = document.getElementById('nameMessageDiv');

let inputId = document.querySelector('#id');
let idMessage = document.getElementById('idMessageDiv');

let inputPassword = document.querySelector('#password');
let pwMessage = document.getElementById('pwMessageDiv');

function validateUserNameLength(nameValue) {
  return 1 <= nameValue.length && nameValue.length <= 4;
}

function validateUserNameKorean(nameValue) {
  return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(nameValue);
}

function validateIdLength(idValue) {
  return 4 <= idValue.length && idValue.length <= 12;
}

function validateIdWords(idValue) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(idValue);
}

function validateStrongPw(pwValue) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pwValue);
}

inputUserName.onkeyup = () => {
  console.log('onkeyup');
  if (inputUserName.value.length) {
    if (!validateUserNameLength(inputUserName.value) && validateUserNameKorean(inputUserName.value)) {
      // 사용자 이름이 1~4글자가 아닐 경우
      nameMessage.innerHTML = '1~4 글자이어야 합니다';
      nameMessage.style.color = '#D62D20';
    } else if (!validateUserNameKorean(inputUserName.value) && validateUserNameLength(inputUserName.value)) {
      // 사용자의 이름이 한글이 아닐 때
      nameMessage.innerHTML = '한글로 입력해주세요';
      nameMessage.style.color = '#D62D20';
    } else if (!validateUserNameKorean(inputUserName.value) && !validateUserNameLength(inputUserName.value)) {
      // 한글도 아니고 1~4글자도 아닌 경우
      nameMessage.innerHTML = '한글로 1~4 글자이어야 합니다';
      nameMessage.style.color = '#D62D20';
    } else if (validateUserNameKorean(inputUserName.value) && validateUserNameLength(inputUserName.value)) {
      nameMessage.innerHTML = '사용할 수 있는 이름입니다';
      nameMessage.style.color = '#008744';
    }
  }
  if (!inputUserName.value.length) {
    nameMessage.innerHTML = '';
  }
};

inputId.onkeyup = () => {
  console.log('onkeyup');
  if (inputId.value.length) {
    if (!validateIdWords(inputId.value) && validateIdLength(inputId.value)) {
      idMessage.innerHTML = '영어 또는 숫자만 가능합니다';
      idMessage.style.color = '#D62D20';
    } else if (!validateIdLength(inputId.value) && validateIdWords(inputId.value)) {
      // 만약 길이를 4이상 12이하를 안했을 경우
      idMessage.innerHTML = '4~12 글자이어야 합니다';
      idMessage.style.color = '#D62D20';
    } else if (!validateIdLength(inputId.value) && !validateIdWords(inputId.value)) {
      idMessage.innerHTML = '영어, 숫자로 이루어진 4~12글자이어야 합니다';
      idMessage.style.color = '#D62D20';
    } else if (validateIdLength(inputId.value) && validateIdWords(inputId.value)) {
      // 모두 만족을 했을 경우
      idMessage.innerHTML = '사용할 수 있는 아이디입니다';
      idMessage.style.color = '#008744';
    }
  }
  if (!inputId.value.length) {
    // 아무것도 입력 안했을 때, 지웠을 때
    idMessage.innerHTML = '';
  }
};

inputPassword.onkeyup = () => {
  if (inputPassword.value.length) {
    if (!validateStrongPw(inputPassword.value)) {
      pwMessage.innerHTML = '8글자 이상, 영문, 숫자, 특수문자를 사용하세요';
      pwMessage.style.color = '#D62D20';
    }
    if (validateStrongPw(inputPassword.value)) {
      pwMessage.innerHTML = '사용할 수 있는 비밀번호입니다';
      pwMessage.style.color = '#008744';
    }
  }
  if (!inputPassword.value.length) {
    pwMessage.innerHTML = '';
  }
};
