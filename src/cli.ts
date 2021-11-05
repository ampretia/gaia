#!/usr/bin/env node
/*
 * SPDX-License-Identifier: Apache-2.0
 */
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import * as yargs from 'yargs';
import * as path from 'path';
import { readFileSync } from 'fs';
import { enableCliLog } from './log';
// import EnvFile from './envfile';
import Gaia from './gaia';
const pjson = readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf-8');
const version = JSON.parse(pjson).version;

enableCliLog();

yargs
    .command(
        'list',
        'Lists the current .env file being held',
        (yargs) => {
            return yargs.options({});
        },
        async () => {
            const gaia = Gaia.getGaia();
            // const cwd = process.cwd();
            // log({ msg: `Tracking ${cwd}` });
            // const envFile = new EnvFile(cwd);
            // envFile.load();
            // envFile.write();
            console.log(gaia.list());
        },
    )
    .command(
        'store',
        'A new .env file',
        (yargs) => {
            return yargs.options({
                file: { alias: 'f', describe: 'file to add', demandOption: true },
                name: { alias: 'n', describe:"Name to store the .env file under", demandOption: false}
            });
        },
        async () => {
            const gaia = Gaia.getGaia();
            // const cwd = process.cwd();
            // log({ msg: `Tracking ${cwd}` });
            // const envFile = new EnvFile(cwd);
            // envFile.load();
            // envFile.write();
            console.log(gaia.list());
        },
    )
    .command(
        'show <name>',
        'shows an environment file',
        (yargs) => {
            return yargs.options({});
        },
        async (args) => {
            const gaia = Gaia.getGaia();
            const env = gaia.get(args['name'] as any);
            console.log(env);
            // try {
            //     // const gaia = Gaia.getGaia();

            // } catch (e) {
            //     enableCliLog();
            //     log({ msg: e.message, error: true });
            //     process.exit(1);
            // }
        },
    )
    // .command(
    //     'import',
    //     'Imports IBP identity and adds to application wallet',
    //     (yargs) => {
    //         return yargs.options({
    //             wallet: { alias: 'w', describe: 'Path to application wallet', demandOption: true },
    //             mspid: { alias: 'm', describe: 'MSPID to assign in this wallet', demandOption: true },
    //             json: { alias: 'j', describe: 'File of the JSON identity', demandOption: true },
    //             compat: { alias: 'c', decribe: 'Set to use the 1.4 wallet format', default: false, type: 'boolean' },
    //             createwallet: {
    //                 alias: 'r',
    //                 describe: 'Create the wallet if not present',
    //                 type: 'boolean',
    //                 default: false,
    //             },
    //         });
    //     },
    //     async (args) => {
    //         log({ msg: 'Adding IBP identity' });
    //         // resolve the supplied gateway and wallet paths
    //         const walletPath = resolveWalletPath(args['wallet'] as string, args['createwallet'] as boolean);
    //         const idtools = new Identities(walletPath, args['compat'] as boolean);
    //         await idtools.importToWallet(saneReadFile(args['json'] as string), args['mspid'] as string);
    //     },
    // )
    // .command(
    //     'export',
    //     'Exports IBP identity from an application wallet',
    //     (yargs) => {
    //         return yargs.options({
    //             wallet: { alias: 'w', describe: 'Path to application wallet', demandOption: true },
    //             json: { alias: 'j', describe: 'File of the JSON identity', demandOption: true },
    //             name: { alias: 'n', describe: 'Name of the new user for the app wallet', demandOption: true },
    //             compat: { alias: 'c', decribe: 'Set to use the 1.4 wallet format', default: false, type: 'boolean' },
    //         });
    //     },
    //     async (args) => {
    //         log({ msg: 'Exporting identity for IBP' });

    //         // resolve the supplied gateway and wallet paths
    //         const walletPath = resolveWalletPath(args['wallet'] as string, args['createwallet'] as boolean);
    //         const idtools = new Identities(walletPath, args['compat'] as boolean);
    //         await idtools.exportFromWallet(args['name'] as string, args['json'] as string);
    //     },
    // )
    // .command(
    //     'ls',
    //     'Lists Application Wallet identities',
    //     (yargs) => {
    //         return yargs.options({
    //             wallet: { alias: 'w', describe: 'Path to application wallet', demandOption: true },
    //             compat: { alias: 'c', decribe: 'Set to use the 1.4 wallet format', default: false, type: 'boolean' },
    //         });
    //     },
    //     async (args) => {
    //         // resolve the supplied gateway and wallet paths
    //         const walletPath = resolveWalletPath(args['wallet'] as string);
    //         log({ msg: 'Listing application wallet identities', val: walletPath });

    //         const idtools = new Identities(walletPath);
    //         idtools.list();
    //     },
    // )
    // .command(
    //     'microfab',
    //     'Process the ibp-microfab output',
    //     (yargs) => {
    //         return yargs.options({
    //             wallet: { alias: 'w', describe: 'Path to parent directory of application wallets', demandOption: true },
    //             profile: { alias: 'p', describe: 'Path to the parent directory of Gateway files', demandOption: true },
    //             mspconfig: { alias: 'm', describe: 'Path to the root directory of the MSP config', demandOption: true },
    //             config: {
    //                 alias: 'c',
    //                 describe: 'File with JSON configuration from Microfab  - for stdin',
    //                 default: '-',
    //             },
    //             force: { alias: 'f', describe: 'Force cleaning of directories', type: 'boolean', default: false },
    //         });
    //     },
    //     async (args) => {
    //         console.log(args);
    //     },
    // )

    .help()

    .wrap(null)
    .alias('v', 'version')
    .version(`gaia v${version}`)
    .help()
    .strict()
    .demandCommand()
    .epilog('For usage see https://github.com/ampretia/gaia')
    .describe('v', 'show version information').argv;
