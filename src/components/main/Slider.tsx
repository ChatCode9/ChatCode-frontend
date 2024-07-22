import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styled from 'styled-components';
import IT1 from '../../../public/IT1.jpg';
import IT2 from '../../../public/IT2.jpg';
import IT3 from '../../../public/IT3.png';

export default function Slider() {
  return (
    <>
      <StyledSwiper
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        <StyledSwiperSlide>
          <img src={IT1} alt="IT사진" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={IT2} alt="IT사진" />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <img src={IT3} alt="IT사진" />
        </StyledSwiperSlide>
      </StyledSwiper>
    </>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 500px;
  .swiper-button-prev,
  .swiper-button-next {
    color: #5d5a88;
    margin: 0 30px 0 30px;
  }
  .swiper-pagination-bullet {
    background: #5d5a88; /* 페이지네이션 버튼 색상 */
  }

  .swiper-pagination-bullet-active {
    background: #5d5a88; /* 활성화된 페이지네이션 버튼 색상 */
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  text-align: center;
  font-size: 18px;
  background: #e5e3f1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* 텍스트 색상을 흰색으로 설정 */
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
