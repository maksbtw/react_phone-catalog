import { ProductDetails } from '@shared/types';

export interface Spec {
  label: string;
  value: string;
}

export const getShortSpecs = (details: ProductDetails): Spec[] => [
  { label: 'Screen', value: details.screen },
  { label: 'Resolution', value: details.resolution },
  { label: 'Processor', value: details.processor },
  { label: 'RAM', value: details.ram },
];

export const getFullSpecs = (details: ProductDetails): Spec[] => {
  const specs = [
    ...getShortSpecs(details),
    { label: 'Built in memory', value: details.capacity },
    { label: 'Camera', value: details.camera },
    { label: 'Zoom', value: details.zoom },
    { label: 'Cell', value: details.cell.join(', ') },
  ];

  // Accessories have no camera or zoom.
  return specs.filter((spec): spec is Spec => Boolean(spec.value));
};

/**
 * Finds the same model in another color or capacity. Ids cannot be built from
 * the parts by hand — a few of them do not follow the usual naming.
 */
export const findVariantId = (
  variants: ProductDetails[],
  current: ProductDetails,
  change: Partial<Pick<ProductDetails, 'color' | 'capacity'>>,
): string | null => {
  const wanted = {
    color: current.color,
    capacity: current.capacity,
    ...change,
  };

  const variant = variants.find(
    item => item.color === wanted.color && item.capacity === wanted.capacity,
  );

  return variant?.id ?? null;
};
