export const memberNav = [
  { href: '#comment-ca-marche', label: 'Comment ça marche' },
  { href: '#l-app', label: "L'app" },
  { href: '#securite', label: 'Sécurité' },
] as const

export const footerNav = {
  forYou: [
    { href: '/#comment-ca-marche', label: 'Comment ça marche' },
    { href: '/#l-app', label: "L'app" },
    { href: '/#securite', label: 'Sécurité' },
    { href: '/#faq', label: 'Questions fréquentes' },
  ],
} as const

export const howItWorksSteps = [
  {
    number: '1',
    title: 'Ton profil',
    body: 'Ton niveau, ton objectif, tes créneaux. Pas de photo.',
    featured: false,
    wide: false,
  },
  {
    number: '2',
    title: 'Ton duo',
    body: 'Un nouveau de ta salle, du même niveau, aux mêmes horaires.',
    featured: false,
    wide: false,
  },
  {
    number: '3',
    title: 'La séance',
    body: 'Vous confirmez tous les deux le créneau.',
    featured: true,
    wide: false,
  },
  {
    number: '4',
    title: 'À deux',
    body: 'Le programme guidé, machine par machine. Un scan, et tu vois le tuto.',
    featured: false,
    wide: false,
  },
  {
    number: '5',
    title: 'Et après',
    body: 'La suivante est fixée. Ton duo lâche ? Un autre en un tap.',
    featured: false,
    wide: true,
  },
] as const

export const safetyPoints = [
  {
    title: 'Double accord',
    body: 'Le duo ne se forme que si vous dites oui tous les deux.',
    featured: false,
  },
  {
    title: 'Membres vérifiés',
    body: 'Chaque membre est vérifié par son abonnement à la salle.',
    featured: false,
  },
  {
    title: 'Rencontre sur place',
    body: "La première séance a toujours lieu en salle, avec l'équipe présente.",
    featured: false,
  },
  {
    title: 'Signal anonyme',
    body: "Tu vois que d'autres débutent aussi, jamais qui est à la salle.",
    featured: false,
  },
  {
    title: 'Même genre si tu veux',
    body: 'Tu peux choisir un duo du même genre que toi.',
    featured: false,
  },
  {
    title: 'Signaler en un tap',
    body: 'Un comportement gênant remonte à Bora et à ta salle.',
    featured: true,
  },
] as const

export const faqs = [
  {
    question: "C'est une app de rencontre ?",
    answer:
      'Non. Tu rejoins une séance, pas une personne. Pas de photo : ton duo est choisi sur ton niveau et tes créneaux.',
  },
  {
    question: 'Combien ça coûte ?',
    answer: "Gratuit pour toi. C'est ta salle qui offre Bora à ses adhérents.",
  },
  {
    question: 'Et si mon duo ne vient plus ?',
    answer: "Tu le signales, et on te propose un autre duo de ta salle en un tap. La séance suivante n'est pas perdue.",
  },
  {
    question: "Ma salle n'est pas sur Bora.",
    answer: 'Laisse-nous son nom et ton email. On la contacte et on te prévient quand elle rejoint le pilote.',
  },
] as const

export const retentionExample = {
  duoPercent: 71,
  alonePercent: 33,
} as const
