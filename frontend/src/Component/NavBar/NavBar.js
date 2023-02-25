import './NavBar.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Nav = () => {

  //어드민일때 admin 아이콘 생성
  const [checkAdmin, setCheckAdmin] = useState(false)
  const [checkLogin, setCheckLogin] = useState(false)
  const [decode, setDecode] = useState('')
  
  //토큰을 decoding
  useEffect(()=>{    
    try{
      setDecode(jwtDecode(localStorage.getItem('accessToken')))    
    } catch(error){
      console.log("토큰 없음", error)
    }
      
  },[])

  useEffect(()=>{
    if (localStorage.getItem('accessToken')){
      setCheckLogin(true)
    }
    //decoding된 토큰에서 권한 정보 확인
    if (decode.auth === "ROLE_ADMIN"){
      setCheckAdmin(true)
    }
  }, [decode])

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
      {/* <div><Link to='/'>login</Link></div> 토큰이 있으면 로그인 못하게 막았음*/}
      <div><Link to='/view1'>품목검색</Link></div>
      <div><Link to='/view3'>장바구니</Link></div>

      {/* 관리자 권한이 없으면 출력 안됨 */}
      {checkAdmin && <div><Link to='/admin'>관리자</Link></div>}
      
      {/* 토큰이 있으면 로그인 되어있다고 판단하기 때문에 로그인 정보를 출력 */}
      {checkLogin && <div onClick={onClickLogout}>로그인: {decode.sub}</div>} 
    </nav>
  );
};

export default Nav;
