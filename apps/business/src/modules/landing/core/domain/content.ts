export const offerPoints = [
  {
    title: 'Un duo pour chaque nouveau',
    body: "Proposé dès l'accueil, parmi les inscrits du mois.",
  },
  {
    title: 'Vos machines guidées',
    body: 'Un QR code par machine, avec tuto et réglages.',
  },
  {
    title: 'La rétention suivie',
    body: 'En duo et seul, chaque mois, dans votre espace salle.',
  },
  {
    title: 'Gratuit pour vos adhérents',
    body: "C'est vous qui l'offrez. Sans engagement.",
  },
] as const

export const faqs = [
  {
    question: 'Combien ça coûte après le pilote ?',
    answer:
      'Un abonnement mensuel par club, sans engagement. Le tarif se fixe avec vous à la fin du pilote, sur la base de vos résultats.',
  },
  {
    question: "Qu'est-ce que l'installation demande à mon équipe ?",
    answer:
      "Un créneau pour poser les QR codes et former la personne à l'accueil. Pas d'intégration technique, pas de changement de vos machines.",
  },
  {
    question: "Et si j'ai peu de nouveaux inscrits ?",
    answer:
      'Le matching se fait parmi les inscrits du mois, au même niveau. Moins de volume, plus de temps pour former chaque duo. Le pilote s’adapte à la taille de votre club.',
  },
  {
    question: 'Que voit-on des adhérents ?',
    answer:
      'Des agrégats : duos formés, séances faites, rétention à 30 et 90 jours. Pas de photos, pas de conversations. L’espace salle ne montre pas qui s’entraîne avec qui.',
  },
  {
    question: 'Bora replace-t-il nos coachs ?',
    answer:
      'Non. Bora guide les débutants machine par machine, pour qu’ils viennent à deux sans monopoliser un coach. Vos coachs restent sur l’accompagnement avancé.',
  },
] as const

export const retentionExample = {
  newMembers: 24,
  duosFormed: 18,
  duoPercent: 71,
  alonePercent: 33,
} as const
