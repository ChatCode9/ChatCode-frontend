import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
import { Container } from './styles';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../../services/post.ts';
import { getAvatar } from '../../../services/avatar.ts';

interface Props {
  postId : number;
}

const data = {
  title: '코딩 문제 중 이게 어떻게 어쩌고 저쩌고 하는지 잘 모르겠는데 봐주세요 어쩌고저쩌고',
  timeline: '2024-06-09T12:34:56Z',
  updated : true,
  viewCount: 1230000,
  status : 'wait',
  bookmark: true,
  tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
  content: '&lt;p&gt;내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용&lt;/p&gt;&lt;script&gt;111&lt;/script&gt;',
  likeCount : 10,
  isLiked: null,
  userProfile : {
    userId : 1,
    userName : '가나다라마바사',
    avatar : 'https://placehold.co/60',
    tags : ['FrontEnd', 'BackEnd', 'FullStack', 'UI/UX Engineer', 'Beginner', 'BigData', 'DevOps'],
    comment : '프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다'
  }
};

function Post({postId} : Props) {
  const { data : postData, isLoading: isLoadingPost, isError: isErrorPost} = useQuery({
    queryKey : ["postData", postId],
    queryFn: () => getPost(postId),
  });

  const { data : avatarData, isLoading: isLoadingAvatar, isError: isErrorAvatar} = useQuery({
    queryKey : ["avatarData", postId],
    queryFn: () => getAvatar(postId),
  });


  const isLoading = isLoadingPost || isLoadingAvatar;
  const isError = isErrorPost || isErrorAvatar;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const { title, timeline, updated, viewCount, status, bookmark, tags, content,  likeCount, isLiked } = postData;
  const { userId, userName, avatar, tags:avatarTags, comment } = avatarData;

  return (
    <Container>
      <PostHeader postId={postId} title={title} timeline={timeline} updated={updated} viewCount={viewCount}
                  status={status} bookmark={bookmark} likeCount={likeCount} isLiked={isLiked} />
      <div className="tags">
        {tags.map((tag: string) => (
          <li key={tag}>#{tag}</li>
        ))}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <WriterProfile userId={userId} userName={userName} avatar={avatar} avatarTags={avatarTags} comment={comment} />
    </Container>
  );
}

export default Post;
