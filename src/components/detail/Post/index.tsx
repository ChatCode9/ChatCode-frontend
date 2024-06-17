import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
import { Container } from './styles';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../../../services/post.ts';
import { getAvatar } from '../../../services/avatar.ts';

interface Props {
  postId : number;
}

function Post({postId} : Props) {
  // 게시글 데이터 호출
  const { data : postData, isLoading: isLoadingPost, isError: isErrorPost} = useQuery({
    queryKey : ["postData", postId],
    queryFn: () => getPost(postId),
  });

  // 프로필 데이터 호출
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

  const { title, timeline, updated, viewCount, status, bookmark, tags, content,  likeCount, isLiked } = postData.data;
  const { userId, userName, avatar, tags:avatarTags, comment } = avatarData.data;

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
