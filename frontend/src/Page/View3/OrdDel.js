import { useSelector } from 'react-redux';
import { delBasket } from '../../API/funcAPI';

//데이터 삭제 후 리렌더링 안되서 삭제 안된것처럼 보임
function OrdDel(){
  let { BasketList } = useSelector((state) => { return state })

  //리덕스로 체크박스 선택한 항목들을 장바구니 테이블에서 삭제
  const deleteBasket = () => {
    (async () => {
      await delBasket(BasketList)
        .then((res) => res)
        .catch(() => console.log("데이터가져오기 실패"))
    })();
  }

  return (
    <>
      <button onClick={deleteBasket}>목록 삭제</button>
      <button>주문하기</button>
    </>
  );
}
export default OrdDel