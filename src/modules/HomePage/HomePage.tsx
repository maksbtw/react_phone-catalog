import { useEffect, useMemo, useState } from 'react';
import { Product } from '@shared/types';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProducts,
} from '@shared/api';
import { Loader } from '@shared/components/Loader';
import { ProductsSlider } from '@shared/components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { ShopByCategory } from './components/ShopByCategory';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadProducts, []);

  const brandNewProducts = useMemo(
    () => getBrandNewProducts(products),
    [products],
  );

  const hotPriceProducts = useMemo(
    () => getHotPriceProducts(products),
    [products],
  );

  return (
    <div className={styles.page}>
      <h1 className="visually-hidden">Product Catalog</h1>

      <section className={styles.hero}>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>

        <PicturesSlider />
      </section>

      {isLoading && <Loader />}

      {!isLoading && hasError && (
        <div className={styles.error}>
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

      {!isLoading && !hasError && (
        <>
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />

          <ShopByCategory products={products} />

          <ProductsSlider
            title="Hot prices"
            products={hotPriceProducts}
            showDiscount
          />
        </>
      )}
    </div>
  );
};
