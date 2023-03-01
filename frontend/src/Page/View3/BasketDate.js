import "./View3.css"
import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBasketListRD } from "../../Component/Store/Store";
import moment from 'moment';
import Calendar from 'react-calendar';


function BasketDate() {

  let dispatch = useDispatch();
  let { Basket } = useSelector((state) => { return state })
  const [checkItems, setCheckItems] = useState([]);
  const [data, setData] = useState();
  const [orderDue, setOrderDue] = useState();
  const [value, onChange] = useState(new Date());

  //main에서 통신 호출된 장바구니를 state에 담기
  useEffect(() => {
    setData(Basket);
  }, [Basket])

  //체크박스 선택한 아이템을 redux에 입력
  useEffect(() => {
    dispatch(getBasketListRD(checkItems));
  }, [checkItems])

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  }

  //체크박스 선택한 행 삭제
  const removeRow = () => {
    setData(data.filter((item) =>
      !checkItems.includes(item.id)
    ))
  }

  //날짜 선택용 ref(임시)
  // const refDateIn = useRef();

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   // console.log(refDateIn.current.value)
  //   setOrder(refDateIn.current.value)
  //   //달력으로 입력받은 날짜값(refDateIn)를 url에 입력될 viewDay로 변경
  // }

  useEffect(()=>{
    const possible = [];
    const impossible = [];
    const urgent = [];
    Basket.map((i)=>{
      if(ramainTime - i.items.leadtime > 7){
        possible.push(i.items.id)
      } else if(ramainTime - i.items.leadtime > 0){
        urgent.push(i.items.id)
      } else {
        impossible.push(i.items.id)
      }
    })
    setOrderDue(
      <ul>
      <li>주문 가능 : {possible.length}</li>
      <li>주문 임박 : {urgent.length}</li>
      <li>주문 불가 : {impossible.length}</li>
      </ul>
    )
  },[value])

  //남은 날짜 계산(목표 날짜 - 오늘 날짜)
  //아래 테이블에서 (위의 남은 날짜 - 리드타임)해서 몇일 안에 발주해야하는지 계산
  const today = moment(new Date());
  const selectDate = moment(value);
  const ramainTime = Math.ceil(moment.duration(selectDate.diff(today)).asDays());

  return (
    <>
      {/* <input type='date' className="input" ref={refDateIn} onChange={handleChange} /> */}
      <div className="View3Main">
        <div className="calender">
          <Calendar className="calendar" locale="en-EN" onChange={onChange} value={value} />
          {orderDue}
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>카테고리</th>
              <th>Machinery</th>
              <th>청구품목</th>
              <th>Part.No</th>
              <th>발주처</th>
              <th>리드타임(일)</th>
              <th>견적화폐</th>
              <th>견적단가</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Basket.map((item, index) => (
              <tr key={index}>
                <td><input type={'checkbox'} onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                  checked={checkItems.includes(item.id) ? true : false}></input></td>
                <td>{item.items.category}</td>
                <td>{item.items.machinery}</td>
                <td>{item.items.items}</td>
                <td>{item.items.part1}</td>
                <td>{item.items.client}</td>
                <td>{item.items.leadtime}</td>
                <td>{item.items.currency}</td>
                <td>{item.items.esti_unit_price}</td>
                {/* 3일 이내면 "~일 이내 주문 필요", 날짜가 지나면 "주문불가능"으로 띄움  */}
                <td>{ramainTime - item.items.leadtime > 7 ? "" :
                  ramainTime - item.items.leadtime > 0 ? `${ramainTime - item.items.leadtime}일이내 주문 필요` : "주문불가능"}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}
export default BasketDate
