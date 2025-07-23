import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';
import { Users } from './collections/Users';
import { Posts } from './collections/Posts';
import { Pages } from './collections/Pages';
import { Media } from './collections/Media';
import { Categories } from './collections/Categories';
import { Tags } from './collections/Tags';
import { Products } from './collections/Products';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Affiliate CMS',
    },
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Posts,
    Pages,
    Media,
    Categories,
    Tags,
    Products,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),
  cors: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  csrf: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
}); 