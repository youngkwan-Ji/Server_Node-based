// index.js

/*
  Node.js 서버의 설정(환경변수)을 받아오기 위한 dotenv 모듈 불러오기
  ***꼭 맨위에 작성해야한다*** (설정이 적용된 후에, 나머지 코드들이 실행되기 위해서)
*/

require('dotenv').config();

/*
  .env 파일에서 변수 불러오기
  노출되서는 안되는 중요한 정보를 .env 파일에 넣고, 이를 꺼내오는 방식으로 사용해 보안을 높일 수 있다.
*/
module.exports.port = process.env.PORT
module.exports.host = process.env.HOST
module.exports.BINANCE_API_KEY = process.env.BINANCE_API_KEY
module.exports.BINANCE_SECRET_KEY = process.env.BINANCE_SECRET_KEY
module.exports.HBASE_HOST = process.env.HBASE_HOST
module.exports.HBASE_PORT = process.env.HBASE_PORT

// module.exports = {
//     port : process.env.PORT
//     , host : process.env.HOST
//     , username : process.env.USER
//     , password : process.env.PASSWORD
// }
// const host = process.env.HOST
// const username = process.env.USER
// const password = process.env.PASSWORD