import type { Span } from './base';

export interface TokenAndSpan {
   type: 'PreservedToken';
   span: Span;
   token: Token;
}

export type UrlKeyValue = [string, string];

export type NumberType =
   | 'integer'
   | 'number';

export interface DimensionToken {
   value: number;
   raw_value: string;
   unit: string;
   type: NumberType;
   raw_unit: string;
}

export type Token =
   | { Ident: { value: string; raw: string; }; }
   | { Function: { value: string; raw: string; }; }
   | { AtKeyword: { value: string; raw: string; }; }
   | { Hash: { is_id: boolean; value: string; raw: string; }; }
   | { String: { value: string; raw: string; }; }
   | { BadString: { raw: string; }; }
   | { Url: { value: string; raw: UrlKeyValue; }; }
   | { BadUrl: { raw: string; }; }
   | { Delim: { value: string; }; }
   | { Number: { value: number; raw: string; type: NumberType; }; }
   | { Percentage: { value: number; raw: string; }; }
   | { Dimension: { dimension: DimensionToken; }; }
   | { WhiteSpace: { value: string; }; }
   | 'CDO'
   | 'CDC'
   | 'Colon'
   | 'Semi'
   | 'Comma'
   | 'LBracket'
   | 'RBracket'
   | 'LParen'
   | 'RParen'
   | 'LBrace'
   | 'RBrace';