let inputId = document.querySelector('#id');
let inputPassword = document.querySelector('#password');

function validateIdLength(idValue) {
  return 4 <= idValue.length && idValue.length <= 12;
}

function validateIdWords(idValue) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(idValue);
}

function validateStrongPw(pwValue) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pwValue);
}

function validateID() {
  if (inputId.value.length) {
    if (!validateIdLength(inputId.value) && validateIdWords(inputId.value)) {
      Swal.fire({
        title: '아이디 오류',
        text: '아이디는 4~12 글자이어야 합니다',
        icon: 'error',
      });
    }
    if (!validateIdWords(inputId.value) && validateIdLength(inputId.value)) {
      Swal.fire({
        title: '아이디 오류',
        text: '아이디는 영어 또는 숫자만 가능합니다',
        icon: 'error',
      });
    }
    if (validateIdWords(inputId.value) && validateIdLength(inputId.value)) {
      return 1;
    }
  }
  if (!inputId.value.length) {
    Swal.fire({
      title: '아이디 오류',
      text: '아이디를 입력해주세요',
      icon: 'error',
    });
  }
}

function validatePW() {
  if (inputPassword.value.length) {
    if (!validateStrongPw(inputPassword.value)) {
      Swal.fire({
        title: '비밀번호 오류',
        text: '8글자 이상, 영문, 숫자, 특수문자를 사용하세요',
        icon: 'error',
      });
    }
    if (validateStrongPw(inputPassword.value)) return 1;
  }
  if (!inputPassword.value.length) {
    Swal.fire({
      title: '비밀번호 오류',
      text: '비밀번호를 입력하세요',
      icon: 'error',
    });
  }
}

function validateLogin() {
  let idFlag = validateID();
  let pwFlag = validatePW();
  console.log('id ' + idFlag + ' pw ' + pwFlag);
  if (idFlag && pwFlag) {
    Swal.fire({
      title: '로그인 성공',
      icon: 'success',
    });
  }
}
