import './NavBar.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Nav = () => {

  //어드민일때 admin 아이콘 생성
  const [checkAdmin, setCheckAdmin] = useState(true)
  const [checkLogin, setCheckLogin] = useState(false)

  

  const decode = () => {
    try{
      jwtDecode(localStorage.getItem('accessToken'))
    } catch(error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    if (localStorage.getItem('accessToken')){
      setCheckLogin(true)
    }
    if (!decode.auth === "ROLE_ADMIN"){ //임시로 ! 넣어서 user일때도 사용 가능
      setCheckAdmin(false)
    }
  },[])

  const onClickLogout = () => {
    try{
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('logout success');
    } catch(error){
      console.log(error);
      alert('logout false')
    }    
  }
  

  return (
    <nav className="wrapper">
      <div>Logo</div> 
      <div><Link to='/'>login</Link></div>
      <div><Link to='/view1'>품목검색</Link></div>
      <div><Link to='/view3'>장바구니</Link></div>
      {checkAdmin && <div><Link to='/admin'>관리자</Link></div>}
      {/* 토큰이 있으면 로그인 되어있다고 판단하기 때문에 로그아웃 활성화 */}
      {checkLogin && <div onClick={onClickLogout}>logout</div>} 
    </nav>
  );
};

export default Nav;