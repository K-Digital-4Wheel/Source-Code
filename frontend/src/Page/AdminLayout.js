import React, { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminLayout = () => {
  const decode = jwtDecode(sessionStorage.getItem('accessToken'))
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  useEffect(()=>{
    if (!sessionStorage.getItem('accessToken')) {
      alert('로그인 정보가 없습니다.')
      navigate("/", { state: pathname });
    } else if (!decode.auth === "ROLE_ADMIN"){
      alert('접근 권한이 없습니다.');
      //토큰에서 권한이 없으면 admin화면으로 접근 못하고 /view1으로 이동
      navigate("/view1", { state: pathname });
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;