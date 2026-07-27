import { Logo } from '@shared/components/Logo';
import { chevronRightIcon } from '@shared/assets/icons';
import styles from './Footer.module.scss';

const FOOTER_LINKS = [
  {
    title: 'Github',
    href: 'https://github.com/maksbtw/react_phone-catalog',
  },
  {
    title: 'Contacts',
    href: 'https://github.com/maksbtw',
  },
  {
    title: 'Rights',
    href: 'https://github.com/mate-academy/react_phone-catalog',
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <ul className={styles.links}>
          {FOOTER_LINKS.map(({ title, href }) => (
            <li key={title}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          <span className={styles.backToTopLabel}>Back to top</span>
          <span className={styles.backToTopButton}>
            <img
              src={chevronRightIcon}
              alt=""
              className={styles.backToTopIcon}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
