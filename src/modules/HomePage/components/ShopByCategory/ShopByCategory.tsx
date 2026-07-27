import { Link } from 'react-router-dom';
import { Product } from '@shared/types';
import styles from './ShopByCategory.module.scss';

interface Props {
  products: Product[];
}

const CATEGORIES = [
  {
    title: 'Mobile phones',
    category: 'phones',
    image: 'img/category-phones.webp',
  },
  {
    title: 'Tablets',
    category: 'tablets',
    image: 'img/category-tablets.webp',
  },
  {
    title: 'Accessories',
    category: 'accessories',
    image: 'img/category-accessories.webp',
  },
];

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const getModelsCount = (category: string) =>
    products.filter(product => product.category === category).length;

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.list}>
        {CATEGORIES.map(({ title, category, image }) => (
          <Link to={`/${category}`} key={category} className={styles.category}>
            <div className={styles.photoWrapper}>
              <img src={image} alt={title} className={styles.photo} />
            </div>

            <h4 className={styles.categoryTitle}>{title}</h4>

            <p
              className={styles.count}
            >{`${getModelsCount(category)} models`}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
