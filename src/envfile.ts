/*
 * SPDX-License-Identifier: Apache-2.0
 */
import * as path from 'path';
import { parse } from './parser';
import * as fs from 'fs';

/**
 * 
 * 
 * [
  { type: 'COMMENT', value: " export $(grep -v '^#'  .env | xargs)" },
  {
    type: 'KV',
    key: 'TEST_NETWORK_CHAINCODE_NAME',
    value: 'ledgerable-event-contract'
  },
]
 */

interface entry {
    type: string;
    value: string;
    key: string | undefined;
}

export default class EnvFile {
    private _envPath: string;
    private _envName: string;
    private _data: entry[];

    public constructor(envpath: string, envName: string) {
        // check to see if the path exists
        if (fs.existsSync(envpath)) {
            // well that's good
            this._envPath = path.resolve(envpath);
        } else {
            throw new Error('No Directory');
        }
        this._envName = `${envName}.env`;
        this._data = [];
    }

    public load() {
        const data = fs.readFileSync(path.join(this._envPath, this._envName), 'utf-8');
        this._data = parse(data);
        return this;
    }

    public get() {
        const op = this._data
            .filter((e) => {
                return e.type === 'KV';
            })
            .map((e) => {
                return `${e.key}=${e.value}`;
            })
            .join('\n');

        return op;
    }

    public write() {
        const op = this._data
            .map((e) => {
                if (e.type === 'COMMENT') {
                    return `#${e.value}`;
                } else if (e.type === 'KV') {
                    return `${e.key}=${e.value}`;
                } else if (e.type === 'BLANK') {
                    return '';
                } else {
                    throw new Error(`Unkown type ${e}`);
                }
            })
            .join('\n');
        fs.writeFileSync('.envtemp', op);
    }
}
