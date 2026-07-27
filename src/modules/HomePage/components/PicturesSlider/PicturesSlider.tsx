import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { chevronRightIcon } from '@shared/assets/icons';
import styles from './PicturesSlider.module.scss';

const SLIDES = [
  {
    image: 'img/banner-phones.png',
    link: '/phones',
    alt: 'Phones banner',
  },
  {
    image: 'img/banner-tablets.png',
    link: '/tablets',
    alt: 'Tablets banner',
  },
  {
    image: 'img/banner-accessories.png',
    link: '/accessories',
    alt: 'Accessories banner',
  },
];

const SLIDE_INTERVAL = 5000;

export const PicturesSlider = () => {
  const [current, setCurrent] = useState(0);

  const showNext = useCallback(() => {
    setCurrent(index => (index + 1) % SLIDES.length);
  }, []);

  const showPrev = () => {
    setCurrent(index => (index - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(showNext, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [current, showNext]);

  return (
    <div className={styles.slider}>
      <div className={styles.main}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Previous picture"
          onClick={showPrev}
        >
          <img src={chevronRightIcon} alt="" className={styles.arrowIconPrev} />
        </button>

        <div className={styles.viewport}>
          <ul
            className={styles.track}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map(({ image, link, alt }) => (
              <li key={image} className={styles.slide}>
                <Link to={link} className={styles.slideLink}>
                  <img src={image} alt={alt} className={styles.slideImage} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label="Next picture"
          onClick={showNext}
        >
          <img src={chevronRightIcon} alt="" />
        </button>
      </div>

      <div className={styles.dots}>
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Show picture ${index + 1}`}
            className={cn(styles.dot, {
              [styles.dotActive]: index === current,
            })}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};
