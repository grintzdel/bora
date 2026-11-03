import type { Gender } from '../../core/domain/constants/gender.constant'

export const genderize = (gender: Gender, words: { readonly female: string; readonly male: string }) =>
  gender === 'female' ? words.female : words.male
