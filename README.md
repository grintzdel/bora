# Bora

Un duo de ta salle et un programme guidé à faire ensemble.

Monorepo pnpm : une landing pour les débutants, une landing pour les salles, un espace admin pour les gérants, une app mobile Expo et les design tokens partagés.

## Prérequis

- Node 24 ou plus (`.nvmrc` : 26)
- pnpm 12 (`corepack enable`)
- Expo Go sur le téléphone pour l'app mobile

## Démarrer

```bash
pnpm install
pnpm dev          # marketing-members :3000, admin :3001, business :3002
pnpm dev:mobile   # Expo : scanner le QR code avec Expo Go
```

## Scripts

| Commande                                                              | Rôle                                                        |
| --------------------------------------------------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                                                            | Lance les trois apps web en parallèle                       |
| `pnpm dev:marketing-members` / `pnpm dev:business` / `pnpm dev:admin` | Lance une seule app web                                     |
| `pnpm dev:mobile`                                                     | Lance l'app mobile (`pnpm --filter mobile start`)           |
| `pnpm build`                                                          | Build de tous les packages                                  |
| `pnpm test`                                                           | Vitest dans tous les packages                               |
| `pnpm typecheck`                                                      | `tsc --noEmit` dans tous les packages                       |
| `pnpm lint` / `pnpm lint:fix`                                         | oxlint                                                      |
| `pnpm format` / `pnpm format:check`                                   | oxfmt                                                       |
| `pnpm --filter @bora/design-tokens build`                             | Régénère `tokens.css` après une modification de `tokens.ts` |

Les dépendances de l'app mobile s'ajoutent avec `npx expo install <paquet>` depuis `apps/mobile`, pour rester alignées sur le SDK Expo.

## Structure

```
apps/
├── marketing-members/    Next.js (App Router, Tailwind v4) : landing pour les débutants
├── business/             Next.js (App Router, Tailwind v4) : landing pour les salles
├── admin/                Next.js (App Router, Tailwind v4) : espace salle pour les gérants
└── mobile/               Expo (Expo Router) : app débutant
packages/
├── design-tokens/        Tokens de la DA, source unique pour toutes les apps
└── demo-data/            Données de démo (salle, duos, séances, machines) partagées par l'app et l'admin
```

### Design tokens

Les valeurs viennent du [Design System Bora](https://claude.ai/artifact/WbiiMV2rJHfpHsXY6UCFzU).

- `src/tokens.ts` : couleurs (clair et sombre), typographies, espacements, rayons, tailles, ombre, en objets `as const`.
- `src/tokens.css` : généré depuis `tokens.ts`, branché dans le thème Tailwind des apps web. Un test échoue s'il n'est plus à jour.
- Apps web : classes Tailwind `bg-surface-100`, `text-ink`, `text-title-1`, `rounded-pill`, `h-tap-min`… Le mode sombre suit le système, ou `data-theme="dark"` sur `<html>`.
- Mobile : `useTheme()` et `TextStyles` dans `src/modules/shared/ui/`.

Aucune couleur en dur dans les apps : tout passe par les tokens.

### Architecture applicative

Le code métier est découpé par bounded context, chacun dans `src/modules/<context>/` :

```
src/modules/<context>/
├── core/
│   ├── domain/     schemas, erreurs, constantes
│   ├── gateway/    accès aux données (simulé tant qu'il n'y a pas d'API)
│   └── store/
└── ui/
    ├── components/ composants purs
    └── hooks/      presenter hooks
```

Contextes envisagés : `member` (profil, niveau, créneaux), `duo` (découverte, proposition, double accord), `session` (séance guidée, scan machine), `gym` (salle, machines, QR codes, rétention), `safety` (signalements). `shared` regroupe le transverse (thème, helpers).

L'API arrivera plus tard dans `apps/api`. Quand elle existera, le `domain/` de chaque contexte sortira dans un package partagé pour être lu par l'API et les apps.

## Conventions

- Fichiers en kebab-case, composants React en PascalCase.
- Pas d'`enum` (objets `as const`, bloqué par `erasableSyntaxOnly`), pas d'`any`.
- Sans point-virgule, simples quotes, 120 colonnes (oxfmt).
