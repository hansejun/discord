import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cloneDeep as clone } from 'lodash';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lastItem<T>(arr: T[]) {
  return arr[arr.length - 1];
}

export function lastIndex<T>(arr: T[]) {
  return arr.length - 1;
}

export function toEqual<T>(item1: T, item2: T) {
  return item1 === item2;
}

export function cloneDeep<T>(item: T) {
  return cloneDeep(item);
}
