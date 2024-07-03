import client from '../client';

// 게시글 생성
export const postNewArticle = async (newArticle: {
  category: string | undefined;
  title: string;
  tagList: string[];
  contentText: string;
}) => {
  try {
    // console.log(`Request : newArticle => ${newArticle.category} \n ${newArticle.title} \n ${newArticle.tagList} \n ${newArticle.contentText} `)
    const response = await client.post('/articles', newArticle);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
