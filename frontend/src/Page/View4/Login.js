import { useState } from "react";
import { login } from "../../API/funcAPI";

function Login() {

  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value)
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value)
  }

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    const requestBody = {
      "email": inputId,
      "password": inputPw
    };
    (async () => {
      await login(requestBody)
        .then((res) => {
          if (res?.accessToken) {
            localStorage.setItem('accessToken', res?.accessToken);
            localStorage.setItem('refreshToken', res?.refreshToken);
          } else {
            console.log("login false")
          }
        })
    })();
  }

  return (
    <div className="loginView">
      <h2>Login</h2>
      <div className="inputId">
        <label htmlFor='input_id'>ID : </label>
        <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
      </div>
      <div className="inputPs">
        <label htmlFor='input_pw'>PW : </label>
        <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
      </div>
      <div className="Butttons">
        <button type='button' onClick={onClickLogin}>Login</button>
        <button type='button'>Signin</button>
      </div>
    </div>
  )
}
export default Login