import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_items(df, item):
    # 청구서번호와 청구품목을 합친 새로운 항목을 만듦
    df['번호_품목'] = df['invoice'] + " " + df['item']

    # CountVectorizer로 벡터화
    count = CountVectorizer()
    count_matrix = count.fit_transform(df['번호_품목'])

    # 코사인 유사도 계산
    cosine_sim = cosine_similarity(count_matrix, count_matrix)

    # 유사한 청구품목 추천
    idx = df.loc[df['번호_품목'].str.contains(item)].index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    
    # sim_scores 리스트에서 번호_품목이 추천값과 같은 것은 제외
    sim_scores = [(i, score) for i, score in sim_scores if df.loc[i, '번호_품목'] != item]

    sim_scores = sim_scores[:3] 
    
    item_indices = [i[0] for i in sim_scores]
    similar_items = list(df['item'].iloc[item_indices])
    #similar_items = list(df.iloc[item_indices, :])
    lt = [] 
    for i in item_indices :
     #print(df[df.index==i][['machinery', 'item']])
      tp = {}
      tp['machinery'] = df[df.index==i]['machinery'].iloc[0]
      tp['Assembly'] = df[df.index==i]['Assembly'].iloc[0]
      tp['item'] = df[df.index==i]['item'].iloc[0]
      tp['part1'] = df[df.index==i]['part1'].iloc[0]
      lt.append(tp)
      
    # 추천 상품 리스트의 길이를 일치시키기 위해 빈 값으로 채움

      
    # 결과를 데이터프레임으로 변환하여 반환
    result_df = [lt[0], lt[1], lt[2]]
    return result_df