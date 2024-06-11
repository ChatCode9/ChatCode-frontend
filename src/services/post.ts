import client from './client';
import { Question } from '../responseType/postType.ts';
import { useQuery } from '@tanstack/react-query';
import { Filters } from '../requestType/postType.ts';

const fetchPosts = async (filters: Filters): Promise<Question> => {
  const { search, categories, sortBy, pageInfo } = filters;
  let { status } = filters;
  if(status.length == 0){
    // 해결대기, 해결완료 모두 선택 했거나 또는 모두 선택하지 않는다면 API 전송시 데이터를 채워준다
    status = ['wait', 'finish'];
  }
  // console.log('status After:',status);
  const queryParams = new URLSearchParams({
    search,
    categories,
    sortBy,
    status: status.join(','), // Assuming the API expects a comma-separated string for status
    page: pageInfo.page.toString(),
    size: pageInfo.size.toString(),
  }).toString();

  const res = await client.get(`article?${queryParams}`);
  // 응답전체 데이터
  // console.log(res);
  console.log(res.data);
  return res.data;
}

// Search 데이터를 활용한 Question Post List 데이터 호출
export const PostsQuery = (filters: Filters) => {
  return useQuery<Question, Error>({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(filters),
    // 사용자가 다른 창이나 탭으로 이동했다가 다시 돌아왔을 때 데이터를 자동으로 새로고침하지 않습니다
    refetchOnWindowFocus:true,
    // 인터넷 연결이 끊어졌다가 다시 연결되었을 때 데이터를 자동으로 새로고침하지 않습니다
    refetchOnMount:false
  });
};

// 북마크 업데이트
export const updateBookmark = async (data : {postId : number, bookmark : boolean}) => {
  try {
    const response = await client.post('bookmark', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 글 블라인드 업데이트
export const updateBlind = async (data : {postId : number, blind : boolean}) => {
  try {
    const response = await client.post('blind', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 글 해결 대기에서 완료로 업데이트
export const updateStatus = async (data : {postId : number, status : string}) => {
  try {
    const response = await client.post('status', data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getLikesCount = async (postId: number) => {
  const response = await client.get(`articles/${postId}/likesCount`);
  console.log(response.data);
  return response.data;
}

interface UpdateLikeData {
  isLike: boolean;
}

interface UpdateLikeProps {
  data: UpdateLikeData;
  postId: number;
}

export const updateLike = async ({ data, postId }: UpdateLikeProps) => {
  try {
    const response = await client.post(`articles/${postId}/like`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

