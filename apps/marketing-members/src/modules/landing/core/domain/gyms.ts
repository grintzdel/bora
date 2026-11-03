export type Gym = {
  id: string
  name: string
  city: string
}

export const GYMS: readonly Gym[] = [
  { id: 'basic-fit-republique', name: 'Basic-Fit République', city: 'Paris' },
  { id: 'neoness-chatelet', name: 'Neoness Châtelet', city: 'Paris' },
  { id: 'keep-cool-nation', name: 'Keep Cool Nation', city: 'Paris' },
  { id: 'fitness-park-bastille', name: 'Fitness Park Bastille', city: 'Paris' },
  { id: 'orange-bleue-montreuil', name: "L'Orange Bleue Montreuil", city: 'Montreuil' },
]

export function normalizeGymQuery(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function findGym(query: string) {
  const needle = normalizeGymQuery(query)
  if (needle.length < 2) {
    return undefined
  }

  return GYMS.find((gym) => normalizeGymQuery(`${gym.name} ${gym.city}`).includes(needle))
}
