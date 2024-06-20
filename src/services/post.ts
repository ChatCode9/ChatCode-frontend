import client from './client';
import { Question } from '../responseType/postType.ts';
import { useQuery } from '@tanstack/react-query';
import { Filters, RequestFilters } from '../requestType/postType.ts';

// 게시글 생성
export const createNewArticle = async (newArticle: {
      category: string | undefined;
      title: string;
      tagList: string[];
      contentText: string;
    }) => {
    try {
      // console.log(`Request : newArticle => ${newArticle.category} \n ${newArticle.title} \n ${newArticle.tagList} \n ${newArticle.contentText} `)
      const response = await client.post('articles', newArticle);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);

      throw error;
    }
};

// 게시글 수정
export const updateArticle = async (postId: number, updateArticle: {
      category: string | undefined;
      title: string;
      tagList: string[];
      contentText: string;
    }) => {
    try {
      const response = await client.put(`articles/${postId}`, updateArticle);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
};

// 게시글 리스트 불러오기
const fetchPosts = async (filters: RequestFilters): Promise<Question> => {
  const { search, categories, sortBy, pageInfo } = filters;
  let { status } = filters;
  if(status === '' || status === 'wait,finish' || status === 'finish,wait'){
    // 해결대기, 해결완료 모두 선택 했거나 또는 모두 선택하지 않는다면 API 전송시 데이터를 채워준다
    status = 'emptyString';
  }
  // console.log('status After:',status);
  const queryParams = new URLSearchParams({
    search,
    categories,
    sortBy,
    status,
    page: pageInfo.page.toString(),
    size: pageInfo.size.toString(),
  }).toString();

  const res = await client.get(`article?${queryParams}`);
  // 응답전체 데이터
  // console.log(res);
  console.log(res.data);
  return res.data;
}

// Filters -> RequestFilters 변환 함수
const transformFilters = (filters: Filters): RequestFilters => {
  return {
    ...filters,
    status: filters.status.join(','), // 배열을 문자열로 변환
  };
};

// Search 데이터를 활용한 Question Post List 데이터 호출
export const PostsQuery = (filters: Filters) => {
  const requestFilters = transformFilters(filters);

  return useQuery<Question, Error>({
    queryKey: ['posts', filters],
    queryFn: () => fetchPosts(requestFilters),
    // 사용자가 다른 창이나 탭으로 이동했다가 다시 돌아왔을 때 데이터를 자동으로 새로고침하지 않습니다
    refetchOnWindowFocus:true,
    // 인터넷 연결이 끊어졌다가 다시 연결되었을 때 데이터를 자동으로 새로고침하지 않습니다
    refetchOnMount:false
  });
};

// 게시글 상세 내용 불러오기
export const getPost = async (postId: number) => {
  const response = await client.get(`articles/${postId}`);
  console.log(response.data);
  return response.data;
}

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

interface UpdateStatusData {
  status: string;
}

// 글 해결 대기에서 완료로 업데이트
const updateStatus = async (postId: number, data: UpdateStatusData) => {
  try {
    const response = await client.post(`articles/${postId}/status`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const updateStatusWrapper = ({ postId, data }: { postId: number, data: UpdateStatusData }) => {
  return updateStatus(postId, data);
}

// 좋아요 갯수 불러오기
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

// 게시글 좋아요 업데이트
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

