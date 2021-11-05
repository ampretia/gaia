// Generated by PEG.js v. 0.10.0 (ts-pegjs plugin v. 0.3.1 )
//
// https://pegjs.org/   https://github.com/metadevpro/ts-pegjs

'use strict';

export interface IFilePosition {
    offset: number;
    line: number;
    column: number;
}

export interface IFileRange {
    start: IFilePosition;
    end: IFilePosition;
}

export interface ILiteralExpectation {
    type: 'literal';
    text: string;
    ignoreCase: boolean;
}

export interface IClassParts extends Array<string | IClassParts> {}

export interface IClassExpectation {
    type: 'class';
    parts: IClassParts;
    inverted: boolean;
    ignoreCase: boolean;
}

export interface IAnyExpectation {
    type: 'any';
}

export interface IEndExpectation {
    type: 'end';
}

export interface IOtherExpectation {
    type: 'other';
    description: string;
}

export type Expectation =
    | ILiteralExpectation
    | IClassExpectation
    | IAnyExpectation
    | IEndExpectation
    | IOtherExpectation;

export class SyntaxError extends Error {
    public static buildMessage(expected: Expectation[], found: string | null) {
        function hex(ch: string): string {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }

        function literalEscape(s: string): string {
            return s
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\0/g, '\\0')
                .replace(/\t/g, '\\t')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/[\x00-\x0F]/g, (ch) => '\\x0' + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => '\\x' + hex(ch));
        }

        function classEscape(s: string): string {
            return s
                .replace(/\\/g, '\\\\')
                .replace(/\]/g, '\\]')
                .replace(/\^/g, '\\^')
                .replace(/-/g, '\\-')
                .replace(/\0/g, '\\0')
                .replace(/\t/g, '\\t')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/[\x00-\x0F]/g, (ch) => '\\x0' + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => '\\x' + hex(ch));
        }

        function describeExpectation(expectation: Expectation) {
            switch (expectation.type) {
                case 'literal':
                    return '"' + literalEscape(expectation.text) + '"';
                case 'class':
                    const escapedParts = expectation.parts.map((part) => {
                        return Array.isArray(part)
                            ? classEscape(part[0] as string) + '-' + classEscape(part[1] as string)
                            : classEscape(part);
                    });

                    return '[' + (expectation.inverted ? '^' : '') + escapedParts + ']';
                case 'any':
                    return 'any character';
                case 'end':
                    return 'end of input';
                case 'other':
                    return expectation.description;
            }
        }

        function describeExpected(expected1: Expectation[]) {
            const descriptions = expected1.map(describeExpectation);
            let i: number;
            let j: number;

            descriptions.sort();

            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }

            switch (descriptions.length) {
                case 1:
                    return descriptions[0];

                case 2:
                    return descriptions[0] + ' or ' + descriptions[1];

                default:
                    return descriptions.slice(0, -1).join(', ') + ', or ' + descriptions[descriptions.length - 1];
            }
        }

        function describeFound(found1: string | null) {
            return found1 ? '"' + literalEscape(found1) + '"' : 'end of input';
        }

        return 'Expected ' + describeExpected(expected) + ' but ' + describeFound(found) + ' found.';
    }

    public message: string;
    public expected: Expectation[];
    public found: string | null;
    public location: IFileRange;
    public name: string;

    constructor(message: string, expected: Expectation[], found: string | null, location: IFileRange) {
        super();
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = 'SyntaxError';

        if (typeof (Error as any).captureStackTrace === 'function') {
            (Error as any).captureStackTrace(this, SyntaxError);
        }
    }
}

function peg$parse(input: string, options?: IParseOptions) {
    options = options !== undefined ? options : {};

    const peg$FAILED: Readonly<any> = {};

    const peg$startRuleFunctions: { [id: string]: any } = { start: peg$parsestart };
    let peg$startRuleFunction: () => any = peg$parsestart;

    const peg$c0 = function (p: any): any {
        return p;
    };
    const peg$c1 = '=';
    const peg$c2 = peg$literalExpectation('=', false);
    const peg$c3 = '\n';
    const peg$c4 = peg$literalExpectation('\n', false);
    const peg$c5 = function (k: any, v: any): any {
        return { type: 'KV', key: k, value: v };
    };
    const peg$c6 = /^[a-zA-Z0-9\-_]/;
    const peg$c7 = peg$classExpectation([['a', 'z'], ['A', 'Z'], ['0', '9'], '-', '_'], false, false);
    const peg$c8 = function (): any {
        return text();
    };
    const peg$c9 = /^[a-zA-Z0-9\-_{},.\/: "]/;
    const peg$c10 = peg$classExpectation(
        [['a', 'z'], ['A', 'Z'], ['0', '9'], '-', '_', '{', '}', ',', '.', '/', ':', ' ', '"'],
        false,
        false,
    );
    const peg$c11 = function (p: any): any {
        return { type: 'COMMENT', value: p };
    };
    const peg$c12 = '#';
    const peg$c13 = peg$literalExpectation('#', false);
    const peg$c14 = /^[^\n]/;
    const peg$c15 = peg$classExpectation(['\n'], true, false);
    const peg$c16 = function (p: any): any {
        return p.join('');
    };
    const peg$c17 = function (): any {
        return { type: 'BLANK' };
    };
    const peg$c18 = /^[ \t\r]/;
    const peg$c19 = peg$classExpectation([' ', '\t', '\r'], false, false);

    let peg$currPos = 0;
    let peg$savedPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected: Expectation[] = [];
    let peg$silentFails = 0;

    let peg$result;

    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error('Can\'t start parsing from rule "' + options.startRule + '".');
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text(): string {
        return input.substring(peg$savedPos, peg$currPos);
    }

    // @ts-ignore
    function location(): IFileRange {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    // @ts-ignore
    function expected(description: string, location1?: IFileRange) {
        location1 = location1 !== undefined ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);

        throw peg$buildStructuredError(
            [peg$otherExpectation(description)],
            input.substring(peg$savedPos, peg$currPos),
            location1,
        );
    }

    // @ts-ignore
    function error(message: string, location1?: IFileRange) {
        location1 = location1 !== undefined ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);

        throw peg$buildSimpleError(message, location1);
    }

    function peg$literalExpectation(text1: string, ignoreCase: boolean): ILiteralExpectation {
        return { type: 'literal', text: text1, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts: IClassParts, inverted: boolean, ignoreCase: boolean): IClassExpectation {
        return { type: 'class', parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    // @ts-ignore
    function peg$anyExpectation(): IAnyExpectation {
        return { type: 'any' };
    }

    function peg$endExpectation(): IEndExpectation {
        return { type: 'end' };
    }

    function peg$otherExpectation(description: string): IOtherExpectation {
        return { type: 'other', description: description };
    }

    function peg$computePosDetails(pos: number) {
        let details = peg$posDetailsCache[pos];
        let p;

        if (details) {
            return details;
        } else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }

            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column,
            };

            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                } else {
                    details.column++;
                }

                p++;
            }

            peg$posDetailsCache[pos] = details;

            return details;
        }
    }

    function peg$computeLocation(startPos: number, endPos: number): IFileRange {
        const startPosDetails = peg$computePosDetails(startPos);
        const endPosDetails = peg$computePosDetails(endPos);

        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column,
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column,
            },
        };
    }

    function peg$fail(expected1: Expectation) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }

        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected1);
    }

    function peg$buildSimpleError(message: string, location1: IFileRange) {
        return new SyntaxError(message, [], '', location1);
    }

    function peg$buildStructuredError(expected1: Expectation[], found: string | null, location1: IFileRange) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }

    function peg$parsestart(): any {
        let s0, s1;

        s0 = [];
        s1 = peg$parseitem();
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseitem();
        }

        return s0;
    }

    function peg$parseitem(): any {
        let s0;

        s0 = peg$parseblankline();
        if (s0 === peg$FAILED) {
            s0 = peg$parsecontent_line();
            if (s0 === peg$FAILED) {
                s0 = peg$parsecomment();
            }
        }

        return s0;
    }

    function peg$parsecontent_line(): any {
        let s0, s1;

        s0 = peg$currPos;
        s1 = peg$parsecontent();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s1);
        }
        s0 = s1;

        return s0;
    }

    function peg$parsecontent(): any {
        let s0, s1, s2, s3, s4, s5, s6;

        s0 = peg$currPos;
        s1 = peg$parsekey();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 61) {
                s2 = peg$c1;
                peg$currPos++;
            } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c2);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsevalue();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parse_();
                        if (s5 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 10) {
                                s6 = peg$c3;
                                peg$currPos++;
                            } else {
                                s6 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c4);
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c5(s1, s4);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }

        return s0;
    }

    function peg$parsekey(): any {
        let s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        if (peg$c6.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c7);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c6.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                    }
                }
            }
        } else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c8();
        }
        s0 = s1;

        return s0;
    }

    function peg$parsevalue(): any {
        let s0, s1, s2;

        s0 = peg$currPos;
        s1 = [];
        if (peg$c9.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c10);
            }
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c9.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                    }
                }
            }
        } else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c8();
        }
        s0 = s1;

        return s0;
    }

    function peg$parsecomment(): any {
        let s0, s1;

        s0 = peg$currPos;
        s1 = peg$parsesingle();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c11(s1);
        }
        s0 = s1;

        return s0;
    }

    function peg$parsesingle(): any {
        let s0, s1, s2, s3;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c12;
            peg$currPos++;
        } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c13);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c14.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c15);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c14.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c15);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 10) {
                    s3 = peg$c3;
                    peg$currPos++;
                } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c4);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c16(s2);
                    s0 = s1;
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }

        return s0;
    }

    function peg$parseblankline(): any {
        let s0, s1;

        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 10) {
            s1 = peg$c3;
            peg$currPos++;
        } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c4);
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c17();
        }
        s0 = s1;

        return s0;
    }

    function peg$parse_(): any {
        let s0, s1;

        s0 = [];
        if (peg$c18.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c19);
            }
        }
        while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c18.test(input.charAt(peg$currPos))) {
                s1 = input.charAt(peg$currPos);
                peg$currPos++;
            } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                }
            }
        }

        return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }

        throw peg$buildStructuredError(
            peg$maxFailExpected,
            peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
            peg$maxFailPos < input.length
                ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
                : peg$computeLocation(peg$maxFailPos, peg$maxFailPos),
        );
    }
}

export interface IParseOptions {
    filename?: string;
    startRule?: string;
    tracer?: any;
    [key: string]: any;
}
export type ParseFunction = (input: string, options?: IParseOptions) => any;
export const parse: ParseFunction = peg$parse;
