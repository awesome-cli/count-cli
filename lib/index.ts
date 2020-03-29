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
    // const dirs = await readdirasync('.');
    // const visibleDirs = files.filter((file) => !/(^|\/)\.[^\/\.]/g.test(file));
    // const hiddenDirs = files.filter((file) => !/(^|\/)\.[^\/\.]/g.test(file));

    let files: string[];

    if (recurresive) {
      files = (await readRecursiveAsync('.')) as string[];
    } else {
      files = await readDirAsync('.');
    }

    const hiddenFiles = files.filter((file) => !/(^|\/)\.[^\/\.]/g.test(file));

    console.log(`Visible Files: ${files.length - hiddenFiles.length}`);
    console.log(`Hidden Files: ${hiddenFiles.length}`);
    console.log(`All Files: ${files.length}`);

    // console.log('');

    // console.log(`Visible Directories: ${visibleDirs.length}`);
    // console.log(`Hidden Directories: ${hiddenDirs.length}`);
    // console.log(`All Directories: ${dirs.length}`);

    console.log('');

    console.log(`All Visible: ${files.length}`);
    console.log(`All Hidden: ${files.length}`);
    console.log(`All: ${files.length}`);
  });

program.on('--help', () => {
  console.log(
    chalk.red(figlet.textSync('Count CLI', { horizontalLayout: 'full' }))
  );
});

program.parse(process.argv);
