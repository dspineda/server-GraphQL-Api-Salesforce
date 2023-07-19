import {readFileSync} from 'node:fs';

export const schema = readFileSync(
  new URL('schema.gql', import.meta.url), 'utf-8'
)