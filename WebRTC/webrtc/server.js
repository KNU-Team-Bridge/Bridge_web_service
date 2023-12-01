const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const db = require("./src/components/db");
const saltRounds = 10;
const app = express();
const http = require("http");

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["https://bridgepeople.site"],
    methods: ["GET", "POST"],
    credentials: true, // CORS 요청 시 인증 정보를 허용
  },
});
const cors = require("cors");

// CORS 미들웨어 설정
app.use(
  cors({
    origin: "https://bridgepeople.site", // 클라이언트 주소를 여기에 명시
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json()); // JSON 파싱을 위한 미들웨어 추가
app.use(
  session({
    secret: "your_secret_key", // 비밀키 설정
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.post("/join", async (req, res) => {
  const { username, userid, password, isHearingImpaired } = req.body;

  // 입력 유효성 검사
  if (!username || !userid || !password) {
    return res.status(400).send("모든 필드를 채워주세요.");
  }

  // 비밀번호 길이 검사
  if (password.length < 6) {
    return res.status(400).send("비밀번호는 6자 이상이어야 합니다.");
  }

  // UserID 중복 검사
  db.query(
    "SELECT * FROM Users WHERE userid = ?",
    [userid],
    async (error, results) => {
      if (error) {
        return res.status(500).send("데이터베이스 오류 발생");
      }
      if (results.length > 0) {
        return res.status(409).send("이미 존재하는 아이디입니다.");
      }

      // 중복이 없으면 비밀번호 해싱 및 새 사용자 추가
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      db.query(
        "INSERT INTO Users (username, userid, password, is_hearing_impaired) VALUES (?, ?, ?, ?)",
        [username, userid, hashedPassword, isHearingImpaired],
        (insertError, insertResults) => {
          if (insertError) {
            console.error("회원가입 중 에러 발생", insertError);
            res.status(500).send("서버 에러 발생");
          } else {
            res.status(200).send("회원가입 완료");
          }
        }
      );
    }
  );
});

app.post("/login", async (req, res) => {
  const { userid, password } = req.body;

  // 입력 유효성 검사
  if (!userid || !password) {
    return res.status(400).send("아이디와 비밀번호를 입력해주세요.");
  }

  // 데이터베이스에서 사용자 조회
  db.query(
    "SELECT * FROM Users WHERE userid = ?",
    [userid],
    async (error, results) => {
      if (error) {
        return res.status(500).send("데이터베이스 오류 발생");
      }
      if (results.length === 0) {
        return res.status(404).send("사용자를 찾을 수 없습니다.");
      }

      // 비밀번호 비교
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.userid = userid; // 세션에 사용자 ID 저장
        console.log(`User login: ${user.username}`);
        res.status(200).send("로그인 성공");
      } else {
        res.status(401).send("비밀번호가 일치하지 않습니다.");
      }
    }
  );
});

// 로그인 상태 확인 라우트
app.get("/api/auth/status", (req, res) => {
  if (req.session.userid) {
    // 세션에 userid가 있으면 로그인 상태로 간주
    db.query(
      "SELECT username FROM Users WHERE userid = ?",
      [req.session.userid],
      (error, results) => {
        if (error) {
          // 데이터베이스 조회 중 오류 처리
          console.error("Error fetching user:", error);
          res.status(500).send("서버 에러 발생");
        } else if (results.length > 0) {
          // 성공적으로 사용자 이름을 가져왔다면
          const user = results[0];
          res.json({ isLoggedIn: true, username: user.username });
        } else {
          // 세션 ID에 해당하는 사용자가 없으면
          res.json({ isLoggedIn: false });
        }
      }
    );
  } else {
    // 세션에 userid가 없으면 로그인 상태가 아님
    res.json({ isLoggedIn: false });
  }
});

// 로그아웃 라우트
app.get("/api/auth/logout", (req, res) => {
  const userId = req.session.userid;

  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      res.status(500).send("로그아웃 처리 중 오류가 발생했습니다.");
    } else {
      // 세션이 성공적으로 파괴된 후, 로그아웃 이벤트를 로그로 기록합니다.
      console.log(`User logout: ${userId}`);
      res.send("로그아웃 되었습니다.");
    }
  });
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });

  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate);
  });

  // socket.on("chatMessage", (msg) => {
  //   socket.broadcast.emit("chatMessage", msg);
  // });
  socket.on("cameraStatusChanged", (newCameraState) => {
    socket.broadcast.emit("cameraStatusChanged", newCameraState);
  });
  socket.on("micStatusChanged", (newMicState) => {
    socket.broadcast.emit("micStatusChanged", newMicState);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
