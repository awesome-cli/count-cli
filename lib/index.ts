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
  .option(
    '-r, --recurresive',
    'output result including files from sub-directories'
  )
  .action(async ({ recurresive }) => {
    let files: string[];

    const isHidden = (file: string) => !/(^|\/)\.[^\/\.]/g.test(file);

    if (recurresive) {
      files = (await readRecursiveAsync('.')) as string[];
    } else {
      files = await readDirAsync('.');
    }

    const hiddenFiles = [];
    const visibleFiles = [];

    const visibleDirs = [];
    const hiddenDirs = [];

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

    console.log(
      chalk.cyanBright(
        `Visible Files: ${visibleFiles.length}\n` +
          `Hidden Files: ${hiddenFiles.length}\n` +
          `All Files: ${allFiles}`
      )
    );

    console.log('');

    console.log(
      chalk.greenBright(
        `Visible Directories: ${visibleDirs.length}\n` +
          `Hidden Directories: ${hiddenDirs.length}\n` +
          `All Directories: ${allDirs}`
      )
    );

    console.log('');

    console.log(
      chalk.yellowBright(
        `All Visible: ${visibleFiles.length + visibleDirs.length}\n` +
          `All Hidden: ${hiddenFiles.length + hiddenDirs.length}\n` +
          `All: ${allFiles + allDirs}`
      )
    );
  });

program.on('--help', () => {
  console.log(
    chalk.red(figlet.textSync('Count CLI', { horizontalLayout: 'full' }))
  );
});

program.parse(process.argv);
