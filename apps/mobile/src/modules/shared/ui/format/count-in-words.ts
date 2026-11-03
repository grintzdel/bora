const Words = ['Zéro', 'Une', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit', 'Neuf', 'Dix']

export const countInWords = (count: number) => Words[count] ?? String(count)
