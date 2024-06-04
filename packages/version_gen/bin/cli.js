#!/usr/bin/env node

import path from 'path'
import fs from 'fs'
import parser from "yargs-parser";
import gen from "../index.js"

const [, , ...args] = process.argv;

const HELP = `usage: gendts [command] [options]

commands
  help                         display help info

argv
  --help                       display help info
  --version                    display version
  --ver, -v                    programme version name to be generate
`;

const error_msg = (msg) => `somewhere error : ${msg} , please read help info\n\n` + HELP

const argv = parser(args, {
    boolean: [
        "help",
        "version",
    ],
    string: ["ver"],
    alias: {
        ver: ["v"],
    },
});

async function main() {
    if ("help" in argv || args.indexOf("help") === 0) {
        console.info(HELP)
        process.exit(0);
    }

    if ("help" in argv || args.indexOf("help") === 0) {
        const v = JSON.parse(fs.readFileSync(path.join(__dirname,'package.json'))).version
        console.info(v)
        process.exit(0);
    }

    let config = {}

    if ("ver" in argv) {
        config.ver = argv['ver']
    }

    try {
        await gen(config)
    } catch (e) {
        console.error(error_msg(e.message))
        process.exit(1);
    }

}

main()