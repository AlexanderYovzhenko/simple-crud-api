import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import Dotenv from 'dotenv-webpack';


export default{
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: { "path": false, "os": false, "http": false, "fs": false }
  },
  plugins: [
    new Dotenv()
  ]
};