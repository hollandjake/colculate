import {describe, expect, test} from 'vitest';
import {tokenize} from './tokenizer';

describe('tokenize', () => {
  test.each([
    ['hex3', '#abc', ['#', ['abc'], false]],
    ['hex4', '#abcd', ['#', ['abcd'], false]],
    ['hex6', '#abcdef', ['#', ['abcdef'], false]],
    ['hex8', '#abcdefab', ['#', ['abcdefab'], false]],
    ['legacy', 'rgb(1,2,3)', ['rgb', ['1', '2', '3'], true]],
    ['legacy with alpha', 'rgba(1,2,3,0.5)', ['rgba', ['1', '2', '3', '0.5'], true]],
    ['legacy with alpha percentage', 'rgba(1,2,3,50%)', ['rgba', ['1', '2', '3', '50%'], true]],
    ['legacy with whitespace', 'rgb(1     ,      2     ,       3)', ['rgb', ['1', '2', '3'], true]],
    ['legacy with comment', 'rgb(1 /*COMMENT1*/   ,   2/*COMMENT2*/    ,     3)', ['rgb', ['1', '2', '3'], true]],
    ['color4', 'rgb(1 2 3)', ['rgb', ['1', '2', '3'], false]],
    ['color4 with whitespace', 'rgb(1       2       3)', ['rgb', ['1', '2', '3'], false]],
    ['color4 with alpha', 'rgb(1 2 3 / 0.5)', ['rgb', ['1', '2', '3', '0.5'], false]],
    ['color4 with alpha percentage', 'rgb(1 2 3 / 50%)', ['rgb', ['1', '2', '3', '50%'], false]],
    ['color4 with comment', 'rgb(1/*COMMENT*/2 3)', ['rgb', ['1', '2', '3'], false]],
    ['color4 with comment with comma', 'rgb(1/*,*/2 3)', ['rgb', ['1', '2', '3'], false]],
    ['namedcolor', 'turquoise', ['', ['turquoise'], false]],
    ['partial func', 'rgb(1,2,3', ['', ['rgb(1,2,3'], false]],
  ] as [string, string, ReturnType<typeof tokenize>][])('%s - parses %s as %j', (_, str, expectedTokens) => {
    expect(tokenize(str)).toEqual(expectedTokens);
  });
});
