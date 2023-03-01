import './NavBar.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiShipWheel } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5"
import { BsPerson } from "react-icons/bs"
import jwtDecode from "jwt-decode";
import img from "../../Img/MPS.png" 

const Nav = () => {

  //어드민일때 admin 아이콘 생성
  const [checkAdmin, setCheckAdmin] = useState(false)
  const [checkLogin, setCheckLogin] = useState(false)
  const [decode, setDecode] = useState('')
  
  //토큰을 decoding
  useEffect(()=>{    
    try{
      setDecode(jwtDecode(sessionStorage.getItem('accessToken')))    
    } catch(error){
      console.log("토큰 없음", error)
    }      
  },[])

  useEffect(()=>{
    if (sessionStorage.getItem('accessToken')){
      setCheckLogin(true)
    }
    //decoding된 토큰에서 권한 정보 확인
    if (decode.auth === "ROLE_ADMIN"){
      setCheckAdmin(true)
    }
  }, [decode])

  const onClickLogout = () => {
    try{
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('basketView');
      alert('logout success');
    } catch(error){
      console.log(error);
      alert('logout false')
    }    
  }
  
  return (
    <nav className="wrapper">
      <div className='logo'><img src={img}/></div>
      <div><Link to='/view1'>품목검색</Link></div>
      <div><Link to='/view3'>장바구니</Link></div>
      {/* 관리자 권한이 없으면 출력 안됨 */}
      {checkAdmin && <div><Link to='/admin'>관리자</Link></div>}
      {/* 토큰이 있으면 로그인 되어있다고 판단하기 때문에 로그인 정보를 출력 */}
      {checkLogin && <div onClick={onClickLogout}>로그아웃: {decode.sub}</div>} 
      <button className='personal'>
        <IoCartOutline className='navIcon'/>
        <BsPerson className='navIcon'/>
      </button>
    </nav>
  );
};

export default Nav;
