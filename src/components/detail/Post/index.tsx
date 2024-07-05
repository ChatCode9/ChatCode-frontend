import { useEffect, useRef } from 'react';
// import { useQuery } from '@tanstack/react-query';

import { Container } from './styles';
import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
// import { getAvatar } from '../../../services/user/getAvatar.ts';
// import { getPost } from '../../../services/post/getPost.ts';
import { usePostQuery } from '../../../hooks/api/usePostQuery.ts';
import { useAvatarQuery } from '../../../hooks/api/useAvatarQuery.ts';

interface Props {
  postId: number;
}

function Post({ postId }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  // 게시글 데이터 호출
  const { postData, isLoadingPost, isErrorPost } = usePostQuery({ postId });

  // 프로필 데이터 호출
  const { avatarData, isLoadingAvatar, isErrorAvatar } = useAvatarQuery({ postId });

  const isLoading = isLoadingPost || isLoadingAvatar;
  const isError = isErrorPost || isErrorAvatar;

  useEffect(() => {
    if (contentRef.current && postData) {
      contentRef.current.innerHTML = postData.data.content;
      const images = contentRef.current.getElementsByTagName('img');
      // for (const img of images) {
      //   img.src = img.src; // force reload the image
      // }
      console.log(images);
    }
  }, [postData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const { title, timeline, updated, viewCount, status, bookmark, tags, content, likeCount, isLiked } = postData.data;
  console.log(content);
  const { userId, userName, avatar, tags: avatarTags, comment } = avatarData.data;

  return (
    <Container>
      <PostHeader
        postId={postId}
        title={title}
        timeline={timeline}
        updated={updated}
        viewCount={viewCount}
        status={status}
        bookmark={bookmark}
        likeCount={likeCount}
        isLiked={isLiked}
      />
      <div className="tags">
        {tags.map((tag: string) => (
          <li key={tag}>#{tag}</li>
        ))}
      </div>
      <div ref={contentRef} />
      {/*<div*/}
      {/*  dangerouslySetInnerHTML={{*/}
      {/*    __html: content,*/}
      {/*  }}*/}
      {/*/>*/}
      <WriterProfile userId={userId} userName={userName} avatar={avatar} avatarTags={avatarTags} comment={comment} />
    </Container>
  );
}

export default Post;
