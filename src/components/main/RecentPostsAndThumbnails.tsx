import { useState } from 'react';
import styled from 'styled-components';

const BESTS = [
  {
    id: 1,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 2,
    category: '자유',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 3,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 4,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 5,
    category: 'TOPIC',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 6,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 7,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 8,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 9,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
  {
    id: 10,
    category: 'Q&A',
    title: 'ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㅁㅁㅁ?',
  },
];

function RecentPostsAndThumbnails() {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const itVideoIds = ['8dFDRWCQ3Hs', 'Ncl9VfjRyZg'];
  const handleThumbnailClick = (id: string) => {
    setPlayingVideoId(id);
  };
  return (
    <Container>
      <Wrapper>
        <Title>WEEKLY BEST</Title>
        <BestList>
          {BESTS.map((best) => (
            <BestItem key={best.id}>
              <div className="category">{best.category}</div>
              <p>{best.title}</p>
            </BestItem>
          ))}
        </BestList>
      </Wrapper>

      <ThumbnailsBox>
        {itVideoIds.map((id) => (
          <div key={id} onClick={() => handleThumbnailClick(id)}>
            {playingVideoId === id ? (
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                className="ThumbnailsImg"
                alt={`Thumbnail for video ${id}`}
              />
            )}
          </div>
        ))}
      </ThumbnailsBox>
    </Container>
  );
}
export default RecentPostsAndThumbnails;

const Container = styled.div`
  display: flex;
  width: 1254px;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 807px;
  height: 559px;

  background-color: #eae9f0;
  border-radius: 15px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
  font-size: 30px;
  text-align: center;
`;

const BestList = styled.ul`
  padding-left: 10px;
  padding-right: 10px;

  li + li {
    margin-top: 10px;
  }
`;

const BestItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  .category {
    width: 65px;
    height: 25px;
    background-color: #8d8ba7;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }

  p {
    flex: 1;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
//css 확인
const ThumbnailsBox = styled.div`
  width: auto;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  iframe,
  .ThumbnailsImg {
    height: 240px;
    width: 400px;
    border: 1px solid #8d8ba7;
    border-radius: 15px;

    overflow: hidden;
  }
`;
