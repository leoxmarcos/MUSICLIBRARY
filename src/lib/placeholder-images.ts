import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export const defaultImage: ImagePlaceholder = {
  id: 'default',
  description: 'A placeholder image for a musical instrument',
  imageUrl: 'https://placehold.co/600x400/24243e/FFF?text=Instrument',
  imageHint: 'instrument',
};
