import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category, Product } from '@shared/types';
import { getProductsByCategory } from '@shared/api';
import { Breadcrumbs } from '@shared/components/Breadcrumbs';
import { Loader } from '@shared/components/Loader';
import { ProductsList } from '@shared/components/ProductsList';
import { Dropdown } from './components/Dropdown';
import { Pagination } from './components/Pagination';
import {
  CATEGORY_INFO,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT,
  PER_PAGE_OPTIONS,
  SORT_OPTIONS,
  SortBy,
} from './constants';
import { sortProducts } from './utils';
import styles from './ProductsPage.module.scss';

interface Props {
  category: Category;
}

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const { title, breadcrumb, itemsName } = CATEGORY_INFO[category];

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortBy) || DEFAULT_SORT;
  const perPage = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const requestedPage = Number(searchParams.get('page')) || 1;

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(loadProducts, [loadProducts]);

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy],
  );

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(Math.ceil(sortedProducts.length / Number(perPage)), 1);

  // A page number from the URL may be out of range, e.g. after `perPage` grew.
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const firstItem = (currentPage - 1) * Number(perPage);

    return sortedProducts.slice(firstItem, firstItem + Number(perPage));
  }, [sortedProducts, perPage, currentPage]);

  // Default values are not kept in the URL, so `null` removes a param.
  const updateParams = (params: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, value);
      }
    });

    setSearchParams(nextParams);
  };

  const handleSortChange = (value: string) => {
    updateParams({ sort: value === DEFAULT_SORT ? null : value, page: null });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ title: breadcrumb }]} />

      <h1 className={styles.title}>{title}</h1>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.message}>
          <p>Something went wrong</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={loadProducts}
          >
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && !products.length && (
        <p className={styles.message}>{`There are no ${itemsName} yet`}</p>
      )}

      {!isLoading && !hasError && !!products.length && (
        <>
          <p className={styles.count}>{`${products.length} models`}</p>

          <div className={styles.filters}>
            <Dropdown
              label="Sort by"
              value={sortBy}
              options={SORT_OPTIONS}
              onChange={handleSortChange}
              className={styles.sort}
            />

            <Dropdown
              label="Items on page"
              value={perPage}
              options={PER_PAGE_OPTIONS.map(option => ({
                value: option,
                label: option === 'all' ? 'All' : option,
              }))}
              onChange={handlePerPageChange}
              className={styles.perPage}
            />
          </div>

          <div className={styles.list}>
            <ProductsList products={visibleProducts} />
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
