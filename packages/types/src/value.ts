import type { Span, Function } from './base';

export interface Ident {
   type: 'Ident';
   span: Span;
   value: string;
   raw?: string | null;
}

export interface CustomIdent {
   type: 'CustomIdent';
   span: Span;
   value: string;
   raw?: string | null;
}

export interface DashedIdent {
   type: 'DashedIdent';
   span: Span;
   value: string;
   raw?: string | null;
}

export interface CustomPropertyName {
   type: 'CustomPropertyName';
   span: Span;
   value: string;
   raw?: string | null;
}

export interface Str {
   type: 'String';
   span: Span;
   value: string;
   raw?: string | null;
}

export type DelimiterValue =
   | 'Comma'
   | 'Solidus'
   | 'Semicolon';

export interface Delimiter {
   type: 'Delimiter';
   span: Span;
   value: DelimiterValue;
}

export type Color =
   | AbsoluteColorBase
   | Ident
   | Function;

export type AbsoluteColorBase =
   | HexColor
   | Ident
   | Function;

export interface HexColor {
   type: 'HexColor';
   span: Span;
   value: string;
   raw?: string | null;
}

export type AlphaValue =
   | Number
   | Percentage;

export type Hue =
   | Number
   | Angle;

export type CmykComponent =
   | Number
   | Percentage
   | Function;

export type Dimension =
   | Length
   | Angle
   | Time
   | Frequency
   | Resolution
   | Flex
   | UnknownDimension;

export interface Length {
   type: 'Length';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface Angle {
   type: 'Angle';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface Time {
   type: 'Time';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface Frequency {
   type: 'Frequency';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface Resolution {
   type: 'Resolution';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface Flex {
   type: 'Flex';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface UnknownDimension {
   type: 'UnknownDimension';
   span: Span;
   value: Number;
   unit: Ident;
}

export interface Percentage {
   type: 'Percentage';
   span: Span;
   value: Number;
}

export type LengthPercentage =
   | Length
   | Percentage;

export type FrequencyPercentage =
   | Frequency
   | Percentage;

export type AnglePercentage =
   | Angle
   | Percentage;

export type TimePercentage =
   | Time
   | Percentage;

export interface Integer {
   type: 'Integer';
   span: Span;
   value: number;
   raw?: string | null;
}

export interface Number {
   type: 'Number';
   span: Span;
   value: number;
   raw?: string | null;
}

export interface Ratio {
   type: 'Ratio';
   span: Span;
   left: Number;
   right?: Number | null;
}

export type BinOp =
   | 'Add'
   | 'Sub'
   | 'Mul'
   | 'Div';

export interface Url {
   type: 'Url';
   span: Span;
   name: Ident;
   value?: UrlValue | null;
   modifiers?: UrlModifier[] | null;
}

export type UrlValue =
   | Str
   | UrlValueRaw;

export interface UrlValueRaw {
   type: 'UrlValueRaw';
   span: Span;
   value: string;
   raw?: string | null;
}

export type UrlModifier =
   | Ident
   | Function;

export interface UnicodeRange {
   type: 'UnicodeRange';
   span: Span;
   start: string;
   end?: string | null;
   raw?: string | null;
}

export interface CalcSum {
   type: 'CalcSum';
   span: Span;
   expressions: CalcProductOrOperator[];
}

export type CalcProductOrOperator =
   | CalcProduct
   | CalcOperator;

export interface CalcProduct {
   type: 'CalcProduct';
   span: Span;
   expressions: CalcValueOrOperator[];
}

export interface CalcOperator {
   type: 'CalcOperator';
   span: Span;
   value: CalcOperatorType;
}

export type CalcOperatorType =
   | 'Add'
   | 'Sub'
   | 'Mul'
   | 'Div';

export type CalcValueOrOperator =
   | CalcValue
   | CalcOperator;

export type CalcValue =
   | Number
   | Dimension
   | Percentage
   | Ident
   | CalcSum
   | Function;

export type FamilyName =
   | Str
   | SequenceOfCustomIdents;

export interface SequenceOfCustomIdents {
   type: 'SequenceOfCustomIdents';
   span: Span;
   value: CustomIdent[];
}  