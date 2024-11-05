import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const key = crypto.randomBytes(64).toString('hex');
const envPath = path.join(__dirname, '.env');

fs.appendFileSync(envPath, `\nTOKEN_SECRET=${ key }\n`);
console.log(`JWT secret key criada e salva em .env: ${ key }`);