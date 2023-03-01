import "./View3.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BsCartCheck, BsCalendarEvent } from "react-icons/bs"
import { getBasketRD } from "../../Component/Store/Store"
import { getBasket } from "../../API/funcAPI";
import BasketList from "./BasketList";
import BasketDate from "./BasketDate";
import OrdDel from "./OrdDel";
// 장바구니 리스트 출력 화면

function View3Main() {

  let dispatch = useDispatch();
  const [component, setComponent] = useState(sessionStorage.getItem('basketView'));

  useEffect(() => {
    (async () => {
      await getBasket()
        .then((res) => {
          dispatch(getBasketRD(res));
        })
        .catch(() => console.log("데이터가져오기 실패"))
    })();
  }, [])

  const clickBasket = () => {
    sessionStorage.setItem('basketView', "a");
    setComponent("a")
  }

  const clickDate = () => {
    sessionStorage.setItem('basketView', "b");
    setComponent("b")
  }

  return (
    <>
      <div className="view3">
        <div className="view3Main">
          <div className="orderNav">
            <button className="basket" onClick={clickBasket}><BsCartCheck className="icon" /></button>
            <button className="basket" onClick={clickDate}><BsCalendarEvent className="icon" /></button>
          </div>
          {component === "a" ? <BasketList /> : <BasketDate />}
          <OrdDel />
        </div>
      </div>
    </>
  );
}
export default View3Main