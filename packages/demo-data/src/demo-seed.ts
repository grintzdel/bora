type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
type Gender = 'female' | 'male'
type Level = 'beginner' | 'returning' | 'regular'
type Goal = 'feel-fit' | 'build-habit' | 'gain-strength'
type Availability = 'lunch' | 'after-work' | 'weekend'

export type SeedSlot = { weekday: Weekday; time: string }

export type SeedProfile = {
  level: Level
  goal: Goal
  availability: Availability[]
  sameGenderDuo: boolean
}

export type SeedPerson = {
  id: string
  firstName: string
  displayName: string
  gender: Gender
  joinedDaysAgo: number
  profile: SeedProfile
}

export type SeedMachine = {
  id: string
  number: string
  name: string
  zone: string
  videoSeconds: number
  steps: string[]
}

export type SeedExercise = {
  id: string
  name: string
  machineId: string | null
  sets: number
  effort: { kind: 'reps'; reps: number } | { kind: 'duration'; seconds: number }
  restSeconds: number
  settings: { label: string; value: string }[]
  duoTip: string
}

export type SeedProgram = {
  id: string
  name: string
  level: Level
  durationMinutes: number
  exercises: SeedExercise[]
}

export type SeedSession = {
  id: string
  slot: SeedSlot
  programId: string
  partnerId: string | null
  status: 'confirmed' | 'pending' | 'done' | 'cancelled'
  partnerAbsent: boolean
  feedback: 'too-easy' | 'just-right' | 'hard' | null
}

export type SeedDuoProposal = {
  id: string
  kind: 'regular' | 'tonight'
  partnerId: string
  firstSession: { slot: SeedSlot; programId: string }
}

export type SeedReport = {
  id: string
  sessionId: string | null
  partnerId: string | null
  reason: string
}

export type DemoSeed = {
  gym: { id: string; name: string; newMembersThisMonth: number }
  memberId: string
  people: SeedPerson[]
  duoPartnerId: string | null
  duoProposals: SeedDuoProposal[]
  machines: SeedMachine[]
  programs: SeedProgram[]
  sessions: SeedSession[]
  stats: { duoSessionsDone: number; streakWeeks: number }
  reports: SeedReport[]
}

const SAME_SIDE_TIP = "L'un fait la série, l'autre compte et regarde le dos. Puis vous échangez."

export const demoSeed: DemoSeed = {
  gym: { id: 'club-pilote', name: 'Club Pilote', newMembersThisMonth: 14 },
  memberId: 'sarah',
  people: [
    {
      id: 'sarah',
      firstName: 'Sarah',
      displayName: 'Sarah A.',
      gender: 'female',
      joinedDaysAgo: 14,
      profile: { level: 'beginner', goal: 'feel-fit', availability: ['after-work'], sameGenderDuo: true },
    },
    {
      id: 'lea',
      firstName: 'Léa',
      displayName: 'Léa M.',
      gender: 'female',
      joinedDaysAgo: 10,
      profile: { level: 'beginner', goal: 'feel-fit', availability: ['after-work'], sameGenderDuo: true },
    },
    {
      id: 'ines',
      firstName: 'Inès',
      displayName: 'Inès K.',
      gender: 'female',
      joinedDaysAgo: 4,
      profile: {
        level: 'beginner',
        goal: 'build-habit',
        availability: ['after-work', 'weekend'],
        sameGenderDuo: false,
      },
    },
    {
      id: 'camille',
      firstName: 'Camille',
      displayName: 'Camille D.',
      gender: 'female',
      joinedDaysAgo: 7,
      profile: { level: 'returning', goal: 'feel-fit', availability: ['after-work'], sameGenderDuo: true },
    },
  ],
  duoPartnerId: 'lea',
  duoProposals: [
    {
      id: 'proposal-lea',
      kind: 'regular',
      partnerId: 'lea',
      firstSession: { slot: { weekday: 'tuesday', time: '18:30' }, programId: 'upper-body' },
    },
    {
      id: 'proposal-ines',
      kind: 'regular',
      partnerId: 'ines',
      firstSession: { slot: { weekday: 'thursday', time: '19:00' }, programId: 'lower-body' },
    },
    {
      id: 'proposal-tonight-camille',
      kind: 'tonight',
      partnerId: 'camille',
      firstSession: { slot: { weekday: 'tuesday', time: '18:30' }, programId: 'upper-body' },
    },
    {
      id: 'proposal-tonight-ines',
      kind: 'tonight',
      partnerId: 'ines',
      firstSession: { slot: { weekday: 'tuesday', time: '18:30' }, programId: 'upper-body' },
    },
  ],
  machines: [
    {
      id: 'machine-01',
      number: '01',
      name: 'Vélo',
      zone: 'zone cardio',
      videoSeconds: 20,
      steps: [
        'Règle la selle à hauteur de hanche, debout à côté du vélo.',
        'Pédale avec la jambe presque tendue en bas.',
        'Choisis un niveau où tu peux encore parler.',
      ],
    },
    {
      id: 'machine-02',
      number: '02',
      name: 'Rameur',
      zone: 'zone cardio',
      videoSeconds: 20,
      steps: [
        'Cale tes pieds et serre les sangles.',
        "Pousse d'abord avec les jambes, puis tire la poignée vers le bas des côtes.",
        'Reviens en tendant les bras, puis plie les jambes.',
      ],
    },
    {
      id: 'machine-04',
      number: '04',
      name: 'Presse pectorale',
      zone: 'zone guidée',
      videoSeconds: 20,
      steps: [
        'Règle le siège pour que les poignées arrivent à hauteur de poitrine.',
        'Dos collé au dossier, pousse les poignées devant toi.',
        'Reviens lentement sans laisser les charges se toucher.',
      ],
    },
    {
      id: 'machine-07',
      number: '07',
      name: 'Tirage vertical',
      zone: 'zone guidée',
      videoSeconds: 20,
      steps: [
        'Règle le siège pour que tes genoux tiennent sous le boudin.',
        'Mains plus larges que les épaules, dos droit.',
        "Tire la barre jusqu'au menton, remonte lentement.",
      ],
    },
    {
      id: 'machine-09',
      number: '09',
      name: 'Rowing assis',
      zone: 'zone guidée',
      videoSeconds: 20,
      steps: [
        "Règle l'appui pour que ta poitrine touche le coussin.",
        'Tire les poignées vers toi en serrant les omoplates.',
        'Reviens lentement, bras tendus.',
      ],
    },
    {
      id: 'machine-11',
      number: '11',
      name: 'Presse à cuisses',
      zone: 'zone guidée',
      videoSeconds: 20,
      steps: [
        "Dos et tête collés au dossier, pieds à largeur d'épaules.",
        "Descends jusqu'à ce que tes genoux forment un angle droit.",
        'Pousse sans verrouiller les genoux en haut.',
      ],
    },
    {
      id: 'machine-12',
      number: '12',
      name: 'Leg curl assis',
      zone: 'zone guidée',
      videoSeconds: 20,
      steps: [
        "Règle le dossier pour aligner tes genoux avec l'axe de la machine.",
        'Boudin juste au-dessus des talons, plie les jambes.',
        'Remonte lentement, sans à-coups.',
      ],
    },
    {
      id: 'machine-13',
      number: '13',
      name: 'Extension des jambes',
      zone: 'zone guidée',
      videoSeconds: 20,
      steps: [
        "Règle le dossier pour aligner tes genoux avec l'axe de la machine.",
        'Boudin sur le bas des tibias, tends les jambes.',
        'Redescends lentement sans laisser tomber la charge.',
      ],
    },
  ],
  programs: [
    {
      id: 'upper-body',
      name: 'Haut du corps',
      level: 'beginner',
      durationMinutes: 45,
      exercises: [
        {
          id: 'rowing-warmup',
          name: 'Rameur',
          machineId: 'machine-02',
          sets: 1,
          effort: { kind: 'duration', seconds: 300 },
          restSeconds: 60,
          settings: [
            { label: 'Résistance', value: 'Niveau 3' },
            { label: 'Rythme', value: 'Tranquille' },
          ],
          duoTip: 'Un rameur chacun, côte à côte. Gardez le même rythme.',
        },
        {
          id: 'lat-pulldown',
          name: 'Tirage vertical',
          machineId: 'machine-07',
          sets: 3,
          effort: { kind: 'reps', reps: 12 },
          restSeconds: 90,
          settings: [
            { label: 'Siège', value: 'Cran 4' },
            { label: 'Pour commencer', value: '20 kg' },
          ],
          duoTip: SAME_SIDE_TIP,
        },
        {
          id: 'chest-press',
          name: 'Presse pectorale',
          machineId: 'machine-04',
          sets: 3,
          effort: { kind: 'reps', reps: 12 },
          restSeconds: 90,
          settings: [
            { label: 'Siège', value: 'Cran 3' },
            { label: 'Pour commencer', value: '15 kg' },
          ],
          duoTip: SAME_SIDE_TIP,
        },
        {
          id: 'seated-row',
          name: 'Rowing assis',
          machineId: 'machine-09',
          sets: 3,
          effort: { kind: 'reps', reps: 12 },
          restSeconds: 90,
          settings: [
            { label: 'Appui poitrine', value: 'Cran 5' },
            { label: 'Pour commencer', value: '20 kg' },
          ],
          duoTip: SAME_SIDE_TIP,
        },
        {
          id: 'plank',
          name: 'Gainage',
          machineId: null,
          sets: 3,
          effort: { kind: 'duration', seconds: 30 },
          restSeconds: 45,
          settings: [
            { label: 'Position', value: 'Sur les avant-bras' },
            { label: 'Tenue', value: '30 s' },
          ],
          duoTip: "Placez-vous face à face et tenez ensemble jusqu'au bout.",
        },
      ],
    },
    {
      id: 'lower-body',
      name: 'Bas du corps',
      level: 'beginner',
      durationMinutes: 45,
      exercises: [
        {
          id: 'bike-warmup',
          name: 'Vélo',
          machineId: 'machine-01',
          sets: 1,
          effort: { kind: 'duration', seconds: 300 },
          restSeconds: 60,
          settings: [
            { label: 'Résistance', value: 'Niveau 4' },
            { label: 'Rythme', value: 'Tranquille' },
          ],
          duoTip: 'Un vélo chacun, côte à côte. Gardez le même rythme.',
        },
        {
          id: 'leg-press',
          name: 'Presse à cuisses',
          machineId: 'machine-11',
          sets: 3,
          effort: { kind: 'reps', reps: 12 },
          restSeconds: 90,
          settings: [
            { label: 'Dossier', value: 'Cran 3' },
            { label: 'Pour commencer', value: '40 kg' },
          ],
          duoTip: SAME_SIDE_TIP,
        },
        {
          id: 'leg-curl',
          name: 'Leg curl assis',
          machineId: 'machine-12',
          sets: 3,
          effort: { kind: 'reps', reps: 12 },
          restSeconds: 90,
          settings: [
            { label: 'Dossier', value: 'Cran 5' },
            { label: 'Pour commencer', value: '15 kg' },
          ],
          duoTip: SAME_SIDE_TIP,
        },
        {
          id: 'leg-extension',
          name: 'Extension des jambes',
          machineId: 'machine-13',
          sets: 3,
          effort: { kind: 'reps', reps: 12 },
          restSeconds: 90,
          settings: [
            { label: 'Dossier', value: 'Cran 4' },
            { label: 'Pour commencer', value: '15 kg' },
          ],
          duoTip: SAME_SIDE_TIP,
        },
        {
          id: 'side-plank',
          name: 'Gainage latéral',
          machineId: null,
          sets: 3,
          effort: { kind: 'duration', seconds: 20 },
          restSeconds: 45,
          settings: [
            { label: 'Position', value: 'Genoux au sol' },
            { label: 'Tenue', value: '20 s par côté' },
          ],
          duoTip: "Placez-vous face à face et tenez ensemble jusqu'au bout.",
        },
      ],
    },
  ],
  sessions: [
    {
      id: 'session-tuesday',
      slot: { weekday: 'tuesday', time: '18:30' },
      programId: 'upper-body',
      partnerId: 'lea',
      status: 'confirmed',
      partnerAbsent: false,
      feedback: null,
    },
    {
      id: 'session-thursday',
      slot: { weekday: 'thursday', time: '18:30' },
      programId: 'lower-body',
      partnerId: 'lea',
      status: 'pending',
      partnerAbsent: false,
      feedback: null,
    },
  ],
  stats: { duoSessionsDone: 3, streakWeeks: 2 },
  reports: [],
}
