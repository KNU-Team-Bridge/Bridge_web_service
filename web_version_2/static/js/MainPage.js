const isLoggedin = true;
const userLogin = document.getElementById('user-login');
const logoutJoin = document.getElementById('logout-join');

if (isLoggedin) {
  // 내 이름 빼고 여기에 사용자 이름 넣기
  userLogin.innerHTML = '문소정 ';
  userLogin.style.fontWeight = 800;
  logoutJoin.innerHTML = '로그아웃';
}
if (!isLoggedin) {
  userLogin.innerHTML = '로그인';
  logoutJoin.innerHTML = '회원가입';
}
