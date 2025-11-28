import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, '../public/posts');
const outputFile = path.join(__dirname, '../public/posts.json');

// Ensure posts directory exists
if (!fs.existsSync(postsDir)) {
  process.exit(1);
}

// Get all .md files
const files = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.md'));

// Write to posts.json
fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));