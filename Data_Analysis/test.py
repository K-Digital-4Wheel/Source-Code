import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

data = pd.read_csv("데이터_전처리_파일_선박명.csv", encoding='cp949')

def recommend_items(df, item):
    # 청구서번호와 청구품목을 합친 새로운 항목을 만듦
    df['번호_품목'] = df['청구서번호'] + " " + df['청구품목']
    # print(df.loc[df['번호_품목'].str.contains('COIL SOLENOID ATOS MRH3800')])
    # CountVectorizer로 벡터화
    count = CountVectorizer()
    count_matrix = count.fit_transform(df['번호_품목'])

    # 코사인 유사도 계산
    cosine_sim = cosine_similarity(count_matrix, count_matrix)

    # 유사한 청구품목 추천
    # idx = df.loc[df['번호_품목'] == item].index[0]
    idx = df.loc[df['번호_품목'].str.contains(item)].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # sim_scores 리스트에서 번호_품목이 추천값과 같은 것은 제외
    sim_scores = [(i, score) for i, score in sim_scores if df.loc[i, '번호_품목'] != item]

    sim_scores = sim_scores[:3]
    item_indices = [i[0] for i in sim_scores]
    print(item_indices)
    similar_items = list(df['청구품목'].iloc[item_indices])

    # 추천 상품 리스트의 길이를 일치시키기 위해 빈 값으로 채움
    similar_items += [""] * (3 - len(similar_items))

    # 결과를 데이터프레임으로 변환하여 반환
    result_df = pd.DataFrame({'추천 1': similar_items[0], '추천 2': similar_items[1], '추천 3': similar_items[2]}, index=[item])
    return result_df
  
result = recommend_items(data, 'OVERRIDE UNIT')
print(result)