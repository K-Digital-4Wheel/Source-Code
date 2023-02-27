from flask import Flask, request
from flask_cors import CORS
import pickle
from recommend import recommend_items
import pandas as pd
import dbModule


app = Flask(__name__)
cors = CORS(app, resources={r"/data/*": {"origins": "*"}})

# 모델, vectorizer, label encoder 불러오기
with open('./model.pickle', 'rb') as f:
    model = pickle.load(f)
with open('./lr1_leadtime.pickle', 'rb') as f:
    model_lead = pickle.load(f)
with open('./vectorizer.pickle', 'rb') as f:
    vectorizer = pickle.load(f)
with open('./vectorizer_lead.pickle', 'rb') as f:
    vectorizer_lead = pickle.load(f)
with open('./label_encoder.pickle', 'rb') as f:
    le = pickle.load(f)
with open('./label_encoder_lead.pickle', 'rb') as f:
    le_lead = pickle.load(f)

@app.route('/data/classifier', methods=['GET', 'POST'])
def classify():
    if request.method == 'POST':
        params = request.get_json()
        # 예측값 입력 받기
        data1 = params['data1']
        data2 = params['data2']
        data3 = params['data3']
        data4 = params['data4']
        data5 = params['data5']
        data = [data1 + ' ' + data2 + ' ' + data3 + ' ' + data4 + ' ' + data5]
        
        # feature vector 생성
        X = vectorizer.transform(data)
        # 모델 예측
        y_pred = model.predict(X)
        # 예측 결과 label로 변환
        y_pred_label = le.inverse_transform(y_pred)
        # 결과 출력 페이지 렌더링
        # return render_template('result.html', data=data[0], prediction=y_pred_label[0])
        return {"prediction":y_pred_label[0]}
    
@app.route('/data/prediction', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        params = request.get_json()
        print("param: ", params)
        # 예측값 입력 받기
        data1 = params['data1']
        data2 = params['data2']
        data3 = params['data3']
        data4 = params['data4']
        data5 = params['data5']
        data = [data1 + ' ' + data2 + ' ' + data3 + ' ' + data4 + ' ' + data5]
        
        # feature vector 생성
        X = vectorizer_lead.transform(data)
        print("x: ", X)
        # 모델 예측
        y_pred = model_lead.predict(X)
        print("y: ",y_pred)
        # 예측 결과 label로 변환
        y_pred_label = le_lead.inverse_transform(y_pred)
        
        # 결과 출력 페이지 렌더링
        # return render_template('result.html', data=data[0], prediction=y_pred_label[0])
        return {"prediction":y_pred_label[0]}

@app.route('/data/recommendation', methods=['GET', 'POST'])
def recommend():
    if request.method == 'POST':
        db_class = dbModule.Database()
        sql = "SELECT * FROM ship.raw_data"
        row      = db_class.executeAll(sql)
        # data = pd.read_csv("데이터_전처리_파일_선박명.csv", encoding='cp949')
        data = pd.DataFrame(row)
        params = request.get_json()
        # 예측값 입력 받기
        inputItems = params['items']
        print(inputItems)
        
        return recommend_items(data, inputItems)

if __name__ == '__main__':
    app.run(debug=True)

