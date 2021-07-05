import { devKeys } from './dev';
import { prodKeys } from './prod';

export const keys = process.env.NODE_ENV === 'production' ? prodKeys : devKeys;
