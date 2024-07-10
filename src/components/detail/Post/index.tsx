// import { useEffect, useRef } from 'react';

import { Container } from './styles';
import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
import { usePostQuery } from '../../../hooks/api/usePostQuery.ts';
import { useAvatarQuery } from '../../../hooks/api/useAvatarQuery.ts';

interface Props {
  postId: number;
}

function Post({ postId }: Props) {
  // const contentRef = useRef<HTMLDivElement>(null);
  const { postData, isLoadingPost, isErrorPost } = usePostQuery({ postId });
  const { avatarData, isLoadingAvatar, isErrorAvatar } = useAvatarQuery({ postId });

  const isLoading = isLoadingPost || isLoadingAvatar;
  const isError = isErrorPost || isErrorAvatar;
  const isData = !!postData?.data && !!avatarData?.data;

  // useEffect(() => {
  //   if (contentRef.current && postData?.data) {
  //     contentRef.current.innerHTML = postData?.data?.content;
  //     const images = contentRef.current.getElementsByTagName('img');
  //     // for (const img of images) {
  //     //   img.src = img.src; // force reload the image
  //     // }
  //     console.log(images);
  //   }
  // }, [postData]);

  console.log(postData, postData?.data);
  console.log(avatarData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isData) {
    const {
      title,
      timeline,
      viewCount,
      status,
      bookmark,
      tags,
      content: postContent,
      likeCount,
      isLiked,
    } = postData?.data;

    const { id, nickname, activityPoint, picture, content: avatarContent } = avatarData?.data;

    return (
      <Container>
        <PostHeader
          postId={postId}
          title={title}
          timeline={timeline}
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
        {/* <div ref={contentRef} /> */}
        <div
          dangerouslySetInnerHTML={{
            __html: postContent,
          }}
        />
        <WriterProfile
          id={id}
          nickname={nickname}
          avatar={picture}
          activityPoint={activityPoint}
          content={avatarContent}
        />
      </Container>
    );
  }

  return null;
}

export default Post;
