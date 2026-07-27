import { Category } from '@shared/types';

// The API stores color names, the UI Kit shows swatches.
export const COLOR_HEXES: Record<string, string> = {
  black: '#1f2020',
  blue: '#a7c1d9',
  coral: '#ff7f5c',
  gold: '#f9e5c9',
  graphite: '#53514e',
  green: '#aee1cd',
  midnight: '#2e3641',
  midnightgreen: '#4e5851',
  pink: '#fad7d2',
  purple: '#d1cdda',
  red: '#ba0c2e',
  'rose gold': '#ecc4b3',
  rosegold: '#ecc4b3',
  sierrablue: '#a7c1d9',
  silver: '#e3e4e5',
  'sky blue': '#aec7da',
  'space gray': '#4c4c4c',
  spaceblack: '#3c3c3d',
  spacegray: '#4c4c4c',
  starlight: '#f9f4ec',
  white: '#f9f6ef',
};

export const FALLBACK_COLOR_HEX = '#b4bdc3';

interface CategoryBreadcrumb {
  title: string;
  path: string;
}

export const CATEGORY_BREADCRUMBS: Record<Category, CategoryBreadcrumb> = {
  phones: { title: 'Phones', path: '/phones' },
  tablets: { title: 'Tablets', path: '/tablets' },
  accessories: { title: 'Accessories', path: '/accessories' },
};
