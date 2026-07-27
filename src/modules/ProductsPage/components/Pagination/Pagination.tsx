import cn from 'classnames';
import { chevronRightIcon } from '@shared/assets/icons';
import { getVisiblePages } from '../../utils';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src={chevronRightIcon} alt="" className={styles.arrowIconPrev} />
      </button>

      <ul className={styles.pages}>
        {pages.map(page => (
          <li key={page}>
            <button
              type="button"
              className={cn(styles.page, {
                [styles.pageActive]: page === currentPage,
              })}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.arrow}
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src={chevronRightIcon} alt="" />
      </button>
    </nav>
  );
};
