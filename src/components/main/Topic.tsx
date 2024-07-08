import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import Topic_Dummy_data from '../../data/Topic_Dummy_data.json';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

type TopicData = {
  title: string;
  content: string;
  image: string; // 이미지 URL을 가져오는 키를 image로 수정
  url: string;
};

function Topic() {
  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  return (
    <Container>
      <h1 className="title">TODAY’S IT TOPIC</h1>
      <Swiper
        effect={'coverflow'} // 슬라이더의 효과를 'coverflow'로 설정합니다.
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'} // 슬라이더에 표시되는 슬라이드 수를 자동으로 설정합니다.
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {Topic_Dummy_data.map((data: TopicData, index: number) => (
          <StyledSwiperSlide key={index}>
            <img src={data.image} alt="it 사진" onClick={() => handleNavigation(data.url)} />
            <h1>{data.title}</h1>
            <p>{data.content}</p>
          </StyledSwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
export default Topic;

const Container = styled.div`
  height: 392px;
  width: 1254px;
  margin-top: 100px;
  .title {
    font-size: 45px;
    font-weight: bold;
    color: #353e5c;
    border-bottom: 1px solid #8d8ba7;
    padding-bottom: 20px;
  }
  .swiper_container {
    width: auto;
    height: 350px;
    position: relative;
  }
`;
const StyledSwiperSlide = styled(SwiperSlide)`
  &.swiper-slide-active {
    width: 506px;
    height: 350px;
    position: relative;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s, width 0.3s, height 0.3s;
  }
  width: 248px;
  height: 222px;
  position: relative;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, width 0.3s, height 0.3s;
  margin: 0 50px 0 50px;
  /* background-color: aqua; */
  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right {
    display: none;
  }

  &.swiper-slide-active img {
    width: 400px;
    height: 200px;
    border-radius: 20px;
    object-fit: cover;
  }
  img {
    width: 80%;
    height: 145px;
    border-radius: 20px;
    object-fit: cover;
  }

  h1 {
    display: none;
    align-items: center;
    width: 350px;
    height: 40px;
    margin-top: 10px;
    text-align: center;
    font-weight: 600;
  }

  p {
    display: flex;
    align-items: center;
    width: 214px;
    height: auto;
    margin-top: 20px;
    line-height: normal;
  }
  &.swiper-slide-active p {
    display: flex;
    align-items: center;
    width: 350px;
    height: auto;
    margin-top: 20px;
    line-height: normal;
  }

  &.swiper-slide-active h1 {
    display: flex;
  }
`;
