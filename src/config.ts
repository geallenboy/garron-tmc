import path from 'path';
import os from 'os';
import { proNameType } from './type';

export const projectDir: string = process.cwd();
export const registry: string = 'https://registry.npmjs.org';
export const tempDir:string = path.join(os.tmpdir(), `-init`);

export const proName:proNameType = {
  name: 'tmc-cli',
  cmd: 'tmc',
};
