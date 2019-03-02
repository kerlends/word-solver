import blueGrey from '@material-ui/core/colors/blueGrey';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import * as colors from '@material-ui/core/colors';
import { Color } from '@material-ui/core';

const colorKeys = Object.keys(colors);

const shadeKeys = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'A100',
  'A200',
  'A400',
  'A700',
];

const getRandomColorType = () => {
  const colorKey =
    colorKeys[Math.floor(Math.random() * colorKeys.length)];

  return {
    color: (colors as any)[colorKey] as Color,
    key: colorKey,
  };
};

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

const cache: Map<
  number,
  ReturnType<typeof getRandomColorType>
> = new Map();

export const getRandomColor = (key: number) => {
  let color = cache.get(key);

  if (!color) {
    color = getRandomColorType();
    cache.set(key, color);
  }

  const shadeKey = color.key === 'common' ? 'black' : 500;

  return '#000000';
};
