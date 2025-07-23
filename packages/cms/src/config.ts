import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import pkg from '@payloadcms/richtext-slate';
import path from 'path';
import { Users } from './collections/Users.js';
import { Posts } from './collections/Posts.js';
import { Pages } from './collections/Pages.js';
import { Media } from './collections/Media.js';
import { Categories } from './collections/Categories.js';
import { Tags } from './collections/Tags.js';
import { Products } from './collections/Products.js';

const { slateEditor } = pkg;

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3002',
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