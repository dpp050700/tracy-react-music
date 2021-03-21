import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
import style from './Banner.module.css';

const { root } = style;

export interface IBannerItem {
  imageUrl: string;
  [propName: string]: any;
}

interface IBannerProps {
  list: IBannerItem[];
}

const Banner: React.FC<IBannerProps> = (props: IBannerProps) => {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null);
  const { list } = props;
  console.log(list);

  useEffect(() => {
    if (list.length && !sliderSwiper) {
      const newSliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' },
      });
      setSliderSwiper(newSliderSwiper);
    }
  }, [list.length, sliderSwiper]);

  const bannerWrapClass = classnames(root, 'slider-container');

  return (
    <div>
      <div className={bannerWrapClass}>
        <div className="swiper-wrapper">
          {list.map(item => {
            return (
              <div className="swiper-slide" key={item.imageUrl}>
                <div className="slider-nav">
                  <img src={item.imageUrl} width="100%" height="100%" alt="" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};

export default Banner;
