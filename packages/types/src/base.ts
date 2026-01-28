import type {
   AlphaValue,
   AnglePercentage,
   CalcSum,
   CmykComponent,
   Color,
   DashedIdent,
   Delimiter,
   Dimension,
   FrequencyPercentage,
   Hue,
   Ident,
   Integer,
   LengthPercentage,
   Number,
   Percentage,
   Ratio,
   Str,
   TimePercentage,
   UnicodeRange,
   Url,
} from './value';

import type { ComplexSelector, IdSelector, RelativeSelectorList, SelectorList, } from './selector';
import type { AtRule, KeyframeBlock, LayerName, SupportsCondition } from './at_rule';
import type { TokenAndSpan } from './token';

export type Atom = string;

export interface Span {
   start: number;
   end: number;
}

export interface Stylesheet {
   type: 'Stylesheet';
   span: Span;
   rules: Rule[];
}

export type Rule =
   | QualifiedRule
   | AtRule
   | ListOfComponentValues;

export interface QualifiedRule {
   type: 'QualifiedRule';
   span: Span;
   prelude: QualifiedRulePrelude;
   block: SimpleBlock;
}

export type QualifiedRulePrelude =
   | SelectorList
   | RelativeSelectorList
   | ListOfComponentValues;

export type StyleBlock =
   | AtRule
   | Declaration
   | QualifiedRule
   | ListOfComponentValues;

export interface SimpleBlock {
   type: 'SimpleBlock';
   span: Span;
   name: TokenAndSpan;
   value: ComponentValue[];
}

export type FunctionName =
   | Ident
   | DashedIdent;

export interface Function {
   type: 'Function';
   span: Span;
   name: FunctionName;
   value: ComponentValue[];
}

export interface ListOfComponentValues {
   type: 'ListOfComponentValues';
   span: Span;
   children: ComponentValue[];
}

export type ComponentValue =
   | TokenAndSpan
   | Function
   | SimpleBlock
   | AtRule
   | QualifiedRule
   | ListOfComponentValues
   | KeyframeBlock
   | Ident
   | DashedIdent
   | Str
   | Url
   | Integer
   | Number
   | Percentage
   | Dimension
   | LengthPercentage
   | FrequencyPercentage
   | AnglePercentage
   | TimePercentage
   | Ratio
   | UnicodeRange
   | Color
   | AlphaValue
   | Hue
   | CmykComponent
   | Delimiter
   | CalcSum
   | ComplexSelector
   | LayerName
   | SupportsCondition
   | Declaration
   | IdSelector;

export type DeclarationOrAtRule =
   | Declaration
   | AtRule
   | ListOfComponentValues;

export interface Declaration {
   type: 'Declaration';
   span: Span;
   name: DeclarationName;
   value: ComponentValue[];
   important?: ImportantFlag | null;
}

export type DeclarationName =
   | Ident
   | DashedIdent;

export interface ImportantFlag {
   type: 'ImportantFlag';
   span: Span;
   value: Ident;
}