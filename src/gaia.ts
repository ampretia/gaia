/*
 * SPDX-License-Identifier: Apache-2.0
 */

import * as path from 'path';
import { existsSync, fstat, readdirSync, readFileSync, writeFileSync } from 'fs';
import * as mkdirp from 'mkdirp';
// import sanitize from 'sanitize-filename';
import * as os from 'os';
import EnvFile from './envfile';

// import { log } from './log';

interface IGaiaCfg{

}

export default class Gaia {
    private _path: string;

    static Config = class implements IGaiaCfg  {

        constructor(){
            
        }

        write() {
            let json = JSON.stringify(this);
            writeFileSync(cfgPath, json);
        }
    }

    // assume the home dir for present
    public static getGaia() {
        const homedir = os.homedir();
        mkdirp.sync(path.join(homedir, '.gaia', 'envs'));
        let cfgPath = path.join(homedir,'.gaia','config.json');
        let cfg;
        if (existsSync(cfgPath)){
            cfg = JSON.parse(readFileSync(cfgPath,'utf8'));
        } else {
            cfg = 
        }
        return new Gaia(path.join(homedir, '.gaia', 'envs'));
    }

    public constructor(path: string) {
        this._path = path;
    }

    public list(): string[] {
        return readdirSync(this._path, { withFileTypes: true })
            .filter((item) => !item.isDirectory())
            .map((item) => item.name);
    }

    public get(name: string): string {
        const ef = new EnvFile(this._path, name).load();

        return ef.get();
    }
}
