// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BiBookmark } from 'react-icons/bi';
import { BiShare } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';
import More from '../components/board/More';
import Divider from '../components/board/Divider';
import Comments from '../components/board/Comments';

const postData = {
  title: '코딩 문제 중 이게 어떻게 어쩌고 저쩌고 하는지 잘 모르겠는데 봐주세요 어쩌고저쩌고',
  tags: ['coding', 'react', 'spring', 'html', 'vscode', 'css', 'js', 'study'],
  userName: '가나다라마바사',
};

function PostDetailPage() {
  // const { postId } = useParams();
  const { title, tags, userName } = postData;

  return (
    <>
      <Container>
        <Header>
          <h1 className="title">{title}</h1>
          <div className="sub">
            <span>1시간 전 작성</span>
            <span>24.04.23. 14:52 수정</span>
            <span>조회수 12.3M</span>
          </div>
          <div className="more">
            <More
              options={[
                { label: '이 글 더 이상 그만보기', callback: () => {} },
                { label: '수정하기', callback: () => {} },
                { label: '삭제하기', callback: () => {} },
              ]}
            />
          </div>
          <div className="actions">
            <button>
              <BiBookmark className="icon ico-bookmark" />
            </button>
            <button>
              <BiShare className="icon ico-share" />
            </button>
          </div>

          <Divider />
        </Header>
        <Tags>
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </Tags>

        <div
          dangerouslySetInnerHTML={{
            __html: '<p>내용</p>',
          }}
        />

        <UserProfile>
          <div className="inner">
            <div className="avatar">
              <img src="https://placehold.co/60" alt="프로필 이미지" />
            </div>
            <div className="info">
              <div className="username">{userName}</div>

              <ul className="tags">
                <li>frontend</li>
                <li>backend</li>
                <li>ui/ux engineer</li>
                <li>beginner</li>
              </ul>

              <p className="desc">This is test user profile</p>
            </div>
          </div>
        </UserProfile>

        <LikeDisLinkButton>
          <div className="inner">
            <button className="btn-like">
              <BiLike />
            </button>
            <button className="btn-dislike">
              <BiDislike />
            </button>
          </div>
        </LikeDisLinkButton>
      </Container>

      <Comments />
    </>
  );
}

export default PostDetailPage;

const Container = styled.div`
  width: 856px;
  margin: 0 auto;
  padding-top: 100px;
`;

const Header = styled.div`
  position: relative;

  .title {
    width: 80%;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .sub {
    font-size: 13px;

    span + span {
      &:before {
        content: '';
        display: inline-block;
        width: 2px;
        height: 2px;
        background-color: #000;
        border-radius: 100%;
        padding: 1px;
        margin: 0px 5px 3px;
      }
    }
  }

  .more {
    position: absolute;
    right: -10px;
    top: -10px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    button {
      border: none;
      outline: none;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon {
      font-size: 25px;
    }
  }

  .ico-share {
    transform: scaleX(-1);
  }
`;

const Tags = styled.ul`
  display: flex;
  color: #586bae;
  margin-bottom: 20px;

  li + li {
    margin-left: 5px;
  }
`;

const UserProfile = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;

  img {
    border-radius: 100%;
    overflow: hidden;
  }

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #bcbacd;
    border-radius: 15px;
    width: 478px;
    padding: 35px 0;
  }

  .info {
    margin-left: 20px;

    .username {
      font-size: 18px;
      font-weight: 700;
    }

    .tags {
      margin-top: 5px;
      display: flex;

      li {
        background-color: #d9d9d9;
        padding: 5px;
        font-size: 12px;
      }

      li + li {
        margin-left: 10px;
      }
    }

    .desc {
      margin-top: 8px;
    }
  }
`;

const LikeDisLinkButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  .inner {
    width: 395px;
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 128px;
    height: 128px;
    border: 2px solid #8d8ba7;
    font-size: 70px;
    color: #8d8ba7;
    outline: none;
    background-color: transparent;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-dislike {
    transform: scaleX(-1);
  }
`;
