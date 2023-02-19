import { useState, useEffect } from "react";
import { getBasket } from "../../API/funcAPI";

function BasketList() {
  const [data, setData] = useState();
  const [category, setCategory] = useState();
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    (async () => {
      await getBasket()
        .then((res) => {
          //장바구니 데이터를 datas에 넣기(sort해서 넣기)
          // setdatas(res.sort((a, b) => a.key2 < b.key2 ? -1 : 1));
          setData(res);
          setCategory(res.map((item) => item.key2));
        })
    })();
  }, [])

  const key2 = [...new Set(category)];
  key2.sort()

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

  return (
    <>
      {key2.map((kitem, index) =>
        <div key={index}>
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
              </tr>
            </thead>
            <tbody>
              {data.filter((item) => kitem.includes(item.key2))
                .map((item, index) => (
                  <tr key={index}>
                    <td><input type={'checkbox'} onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                      checked={checkItems.includes(item.id) ? true : false}></input></td>
                    <td>{item.key2}</td>
                    <td>{item.machinery}</td>
                    <td>{item.items}</td>
                    <td>{item.part1}</td>
                    <td>{item.baljucheo}</td>
                    <td>{item.leadtime}</td>
                    <td>{item.gyeonjeokhwapye}</td>
                    <td>{item.gyeonjeokdanga}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div>
            {kitem}
          </div>
        </div>
      )}
    </>
  );
}
export default BasketList