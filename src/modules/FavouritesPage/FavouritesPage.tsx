import { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from '@shared/types';
import { getProducts } from '@shared/api';
import { useFavourites } from '@shared/context';
import { Breadcrumbs } from '@shared/components/Breadcrumbs';
import { Loader } from '@shared/components/Loader';
import { ProductsList } from '@shared/components/ProductsList';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favouriteIds } = useFavourites();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(loadProducts, [loadProducts]);

  // Favourites keep the order they were added in.
  const favouriteProducts = useMemo(
    () =>
      favouriteIds
        .map(id => products.find(product => product.itemId === id))
        .filter((product): product is Product => Boolean(product)),
    [favouriteIds, products],
  );

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ title: 'Favourites' }]} />

      <h1 className={styles.title}>Favourites</h1>

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

      {!isLoading && !hasError && !favouriteProducts.length && (
        <p className={styles.message}>There are no favourites yet</p>
      )}

      {!isLoading && !hasError && !!favouriteProducts.length && (
        <>
          <p className={styles.count}>
            {favouriteProducts.length === 1
              ? '1 item'
              : `${favouriteProducts.length} items`}
          </p>

          <div className={styles.list}>
            <ProductsList products={favouriteProducts} />
          </div>
        </>
      )}
    </div>
  );
};
