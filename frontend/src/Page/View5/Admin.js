import { useState } from "react";
import { addItem, classifier, prediction } from "../../API/funcAPI";

//찬준 DB설계 맞춤
function Admin() {

  const [subject, setSubject] = useState(''); //필수
  const [machinery, setMachinery] = useState(''); //필수
  const [assembly, setAssembly] = useState(''); //필수
  const [items, setitems] = useState(''); //필수
  const [partNo, setPartNo] = useState(''); //필수
  const [partNo2, setPartNo2] = useState('');
  const [price, setPrice] = useState('');
  const [client, setClient] = useState('');
  const [currency, setCurrency] = useState(''); //필수

  const [category, setCategory] = useState('');
  const [leadtime, setLeadtime] = useState('');


  const handleSubject = (e) => {
    setSubject(e.target.value)
  }

  const handleMachinery = (e) => {
    setMachinery(e.target.value)
  }

  const handleAssembly = (e) => {
    setAssembly(e.target.value)
  }

  const handleItems = (e) => {
    setitems(e.target.value)
  }

  const handlePartNo = (e) => {
    setPartNo(e.target.value)
  }

  const handlePartNo2 = (e) => {
    setPartNo2(e.target.value)
  }

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleClient = (e) => {
    setClient(e.target.value)
  }

  const handleCurrency = (e) => {
    setCurrency(e.target.value)
  }



  //통신에 리드타임 추가 하면 좋을듯
  const onClickPredict = () => {
    if (!subject){
      alert("subject를 입력하세요")
      return
    } else if (!machinery){
      alert("machinery를 입력하세요")
      return
    } else if (!assembly){
      alert("assembly를 입력하세요")
      return
    } else if (!items){
      alert("청구품목을 입력하세요")
      return
    } else if (!partNo){
      alert("partNo를 입력하세요")
      return
    } else if (!client){
      alert("발주처를 입력하세요")
      return
    } else if (!currency){
      alert("견적화폐를 입력하세요")
      return
    }
    const classifyData = {
      "data1": subject,
      "data2": machinery,
      "data3": assembly,
      "data4": items,
      "data5": partNo
    };

    (async () => {
      await classifier(classifyData)
        .then((res) => setCategory(res.prediction))
        .catch((error) => console.log(error))
    })();

    // (axios.post('http://localhost:5000/data/classifier', {
    //   "data1": subject,
    //   "data2": machinery,
    //   "data3": assembly,
    //   "data4": items,
    //   "data5": partNo
    // })
    //   .then(function (response) {
    //     setCategory(response.data.prediction)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   }));

    const predictdata = {
      "data1": currency,
      "data2": machinery,
      "data3": subject,
      "data4": "",
      "data5": assembly
    };

    (async () => {
      await prediction(predictdata)
        .then((res) => setLeadtime(res.prediction))
        .catch((error) => console.log(error))
    })();

    // (axios.post('http://localhost:5000/data/prediction', {
    //   "data1": currency,
    //   "data2": machinery,
    //   "data3": subject,
    //   "data4": "",
    //   "data5": assembly
    // })
    //   .then(function (response) {
    //     setLeadtime(response.data.prediction)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   }));
  }

  const onClickSaveItem = (e) => {
    e.preventDefault()
    console.log("db저장")
    const data = {
      "subject": subject,
      "machinery": machinery,
      "assembly": assembly,
      "items": items,
      "part1": partNo,
      "part2": partNo2,
      "esti_unit_price": price,
      "client": client,
      "currency": currency,
      "category": category,
      "leadtime": leadtime
    };
    (async () => {
      await addItem(data)
        .then((res) => res)
    })();
    alert("저장되었습니다.")
  }


  //입력할지 기존 정보에서 선택할지 모르겠음
  return (
    <>
      <div className="categorization">
        <div className="input1">
          <label htmlFor='input1'>(*)Subject : </label>
          <input type='text' name='subject' value={subject} onChange={handleSubject} />
        </div>
        <div className="input2">
          <label htmlFor='input2'>(*)Machinery : </label>
          <input type='text' name='machinery' value={machinery} onChange={handleMachinery} />
        </div>
        <div className="input3">
          <label htmlFor='input3'>(*)Assembly : </label>
          <input type='text' name='assembly' value={assembly} onChange={handleAssembly} />
        </div>
        <div className="input4">
          <label htmlFor='input4'>(*)청구품목 : </label>
          <input type='text' name='items' value={items} onChange={handleItems} />
        </div>
        <div className="input5">
          <label htmlFor='input5'>(*)PartNo1 : </label>
          <input type='text' name='partNo' value={partNo} onChange={handlePartNo} />
        </div>
        <div className="input6">
          <label htmlFor='input6'>PartNo2 : </label>
          <input type='text' name='partNo2' value={partNo2} onChange={handlePartNo2} />
        </div>
        <div className="input7">
          <label htmlFor='input7'>견적단가 : </label>
          <input type='text' name='esti_unit_price' value={price} onChange={handlePrice} />
        </div>
        <div className="input8">
          <label htmlFor='input8'>(*)발주처 : </label>
          <input type='text' name='client' value={client} onChange={handleClient} />
        </div>
        <div className="input9">
          <label htmlFor='input9'>(*)견적화폐 : </label>
          <input type='text' name='currency' value={currency} onChange={handleCurrency} />
        </div>
        {category && <div>예상 카테고리는 {category}입니다.</div>}
        {leadtime && <div>예상 리드타임은 {leadtime}일 입니다.</div>}
        <div>
          <button type='button' onClick={onClickPredict}>예측결과 출력</button>
          <button type='button' onClick={onClickSaveItem}>DB저장</button>
        </div>
      </div>

      {/* 통신해서 결과 받으면 출력 */}
      

    </>
  );
}
export default Admin