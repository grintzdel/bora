import { writeFileSync } from 'node:fs'

import { toCss } from '../src/to-css.ts'

writeFileSync(new URL('../src/tokens.css', import.meta.url), toCss())
