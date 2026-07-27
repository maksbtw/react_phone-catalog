import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useFavourites } from '@shared/context';
import { Logo } from '@shared/components/Logo';
import {
  closeIcon,
  favouritesIcon,
  menuIcon,
  shoppingBagIcon,
} from '@shared/assets/icons';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { title: 'Home', path: '/' },
  { title: 'Phones', path: '/phones' },
  { title: 'Tablets', path: '/tablets' },
  { title: 'Accessories', path: '/accessories' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { favouriteIds } = useFavourites();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.navLinkActive]: isActive });

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconLink, { [styles.iconLinkActive]: isActive });

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ title, path }) => (
              <li key={path} className={styles.navItem}>
                <NavLink to={path} className={getNavLinkClass}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.icons}>
          <NavLink
            to="/favourites"
            className={getIconLinkClass}
            aria-label="Favourites"
          >
            <span className={styles.iconBox}>
              <img src={favouritesIcon} alt="" />

              {!!favouriteIds.length && (
                <span className={styles.counter}>{favouriteIds.length}</span>
              )}
            </span>
          </NavLink>

          <NavLink to="/cart" className={getIconLinkClass} aria-label="Cart">
            <img src={shoppingBagIcon} alt="" />
          </NavLink>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <img src={isMenuOpen ? closeIcon : menuIcon} alt="" />
          </button>
        </div>
      </div>

      <aside className={cn(styles.menu, { [styles.menuOpen]: isMenuOpen })}>
        <nav>
          <ul className={styles.menuList}>
            {NAV_LINKS.map(({ title, path }) => (
              <li key={path}>
                <NavLink to={path} className={getNavLinkClass}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.menuIcons}>
          <NavLink
            to="/favourites"
            className={getIconLinkClass}
            aria-label="Favourites"
          >
            <span className={styles.iconBox}>
              <img src={favouritesIcon} alt="" />

              {!!favouriteIds.length && (
                <span className={styles.counter}>{favouriteIds.length}</span>
              )}
            </span>
          </NavLink>

          <NavLink to="/cart" className={getIconLinkClass} aria-label="Cart">
            <img src={shoppingBagIcon} alt="" />
          </NavLink>
        </div>
      </aside>
    </header>
  );
};
