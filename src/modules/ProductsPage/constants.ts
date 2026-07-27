import { Category } from '@shared/types';

export type SortBy = 'age' | 'title' | 'price';

export const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const DEFAULT_SORT: SortBy = 'age';
export const DEFAULT_PER_PAGE = 'all';

interface CategoryInfo {
  title: string;
  breadcrumb: string;
  itemsName: string;
}

// The README asks for a `<category> page` heading, which wins over the
// shorter title used in the Figma frame.
export const CATEGORY_INFO: Record<Category, CategoryInfo> = {
  phones: { title: 'Phones page', breadcrumb: 'Phones', itemsName: 'phones' },
  tablets: {
    title: 'Tablets page',
    breadcrumb: 'Tablets',
    itemsName: 'tablets',
  },
  accessories: {
    title: 'Accessories page',
    breadcrumb: 'Accessories',
    itemsName: 'accessories',
  },
};
