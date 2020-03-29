#!/usr/bin/env node

import path from 'path';
import program from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import * as fs from 'fs';
import { promisify } from 'util';
import recursive from 'recursive-readdir';

const readDirAsync = promisify(fs.readdir);
const readRecursiveAsync = promisify(recursive);

const pkg = require(path.join(__dirname, '../package.json'));

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options]')
  .option('-r, --recurresive', '')
  .action(async ({ recurresive }) => {
    let files: string[];

    const isHidden = (file: string) => !/(^|\/)\.[^\/\.]/g.test(file);

    if (recurresive) {
      files = (await readRecursiveAsync('.')) as string[];
    } else {
      files = await readDirAsync('.');
    }

    let hiddenFiles = [];
    let visibleFiles = [];

    let visibleDirs = [];
    let hiddenDirs = [];

    files.map((file) => {
      if (fs.statSync(file).isDirectory()) {
        if (isHidden(file)) {
          hiddenDirs.push(file);
        } else {
          visibleDirs.push(file);
        }
      } else {
        if (isHidden(file)) {
          hiddenFiles.push(file);
        } else {
          visibleFiles.push(file);
        }
      }
    });

    const allFiles = visibleFiles.length + hiddenFiles.length;
    const allDirs = visibleDirs.length + hiddenDirs.length;

    console.log(`Visible Files: ${visibleFiles.length}`);
    console.log(`Hidden Files: ${hiddenFiles.length}`);
    console.log(`All Files: ${allFiles}`);

    console.log('');

    console.log(`Visible Directories: ${visibleDirs.length}`);
    console.log(`Hidden Directories: ${hiddenDirs.length}`);
    console.log(`All Directories: ${allDirs}`);

    console.log('');

    console.log(`All Visible: ${visibleFiles.length + visibleDirs.length}`);
    console.log(`All Hidden: ${hiddenFiles.length + hiddenDirs.length}`);
    console.log(`All: ${allFiles + allDirs}`);
  });

program.on('--help', () => {
  console.log(
    chalk.red(figlet.textSync('Count CLI', { horizontalLayout: 'full' }))
  );
});

program.parse(process.argv);
