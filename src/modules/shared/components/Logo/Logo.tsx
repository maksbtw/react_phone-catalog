import cn from 'classnames';
import { Link } from 'react-router-dom';
import logoText from '@shared/assets/logo/logo-text.svg';
import logoHand from '@shared/assets/logo/logo-hand.png';
import styles from './Logo.module.scss';

interface Props {
  className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => (
  <Link to="/" className={cn(styles.logo, className)}>
    <img src={logoText} alt="Nice Gadgets logo" className={styles.text} />
    <img src={logoHand} alt="" className={styles.hand} />
  </Link>
);
