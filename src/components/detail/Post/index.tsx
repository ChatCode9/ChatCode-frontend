import ActionButtons from '../ActionButtons';
import PostHeader from '../PostHeader';
import WriterProfile from '../WriterProfile';
import { Container } from './styles';
import React, { useState } from 'react';
import axios from 'axios';
import VotingComponent from '../PostHeader/VotingComponent.tsx';

interface Props {
  postId : number;
}

interface UserProfile {
  userId: number;
  userName: string;
  avatar: string;
  tags: string[];
  comment: string;
}

interface Data {
  title: string;
  timeline: string;
  updated: boolean;
  viewCount: number;
  bookmark: boolean;
  tags: string[];
  content: string;
  userProfile: UserProfile;
  writer: string;
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
  isLiked: false,
  isDisliked: false,
  userProfile : {
    userId : 1,
    userName : '가나다라마바사',
    avatar : 'https://placehold.co/60',
    tags : ['FrontEnd', 'BackEnd', 'FullStack', 'UI/UX Engineer', 'Beginner', 'BigData', 'DevOps'],
    comment : '프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다 프로필 설명란입니다'
  }
};

function Post({postId} : Props) {
  const { title, timeline, updated, viewCount, status, bookmark, tags, content,  isLiked, isDisliked, userProfile } = data;

  return (
    <Container>
      <PostHeader postId={postId} title={title} timeline={timeline} updated={updated} viewCount={viewCount}
                  status={status} bookmark={bookmark} isLiked={isLiked} isDisliked={isDisliked} />
      <div className="tags">
        {tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <WriterProfile userProfile={userProfile} />
    </Container>
  );
}

export default Post;
