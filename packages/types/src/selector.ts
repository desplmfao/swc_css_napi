import type { Span, ListOfComponentValues } from './base';
import type { Delimiter, Ident, Str } from './value';
import type { TokenAndSpan } from './token';

export interface SelectorList {
   type: 'SelectorList';
   span: Span;
   children: ComplexSelector[];
}

export interface ForgivingSelectorList {
   type: 'ForgivingSelectorList';
   span: Span;
   children: ForgivingComplexSelector[];
}

export type ForgivingComplexSelector =
   | ComplexSelector
   | ListOfComponentValues;

export interface CompoundSelectorList {
   type: 'CompoundSelectorList';
   span: Span;
   children: CompoundSelector[];
}

export interface RelativeSelectorList {
   type: 'RelativeSelectorList';
   span: Span;
   children: RelativeSelector[];
}

export interface ForgivingRelativeSelectorList {
   type: 'ForgivingRelativeSelectorList';
   span: Span;
   children: ForgivingRelativeSelector[];
}

export type ForgivingRelativeSelector =
   | RelativeSelector
   | ListOfComponentValues;

export interface ComplexSelector {
   type: 'ComplexSelector';
   span: Span;
   children: ComplexSelectorChildren[];
}

export type ComplexSelectorChildren =
   | CompoundSelector
   | Combinator;

export interface RelativeSelector {
   type: 'RelativeSelector';
   span: Span;
   combinator?: Combinator | null;
   selector: ComplexSelector;
}

export interface CompoundSelector {
   type: 'CompoundSelector';
   span: Span;
   nestingSelector?: NestingSelector | null;
   typeSelector?: TypeSelector | null;
   subclassSelectors: SubclassSelector[];
}

export interface Combinator {
   type: 'Combinator';
   span: Span;
   value: CombinatorValue;
}

export type CombinatorValue =
   | 'Descendant'
   | 'NextSibling'
   | 'Child'
   | 'LaterSibling'
   | 'Column';

export interface NestingSelector {
   type: 'NestingSelector';
   span: Span;
}

export type TypeSelector =
   | TagNameSelector
   | UniversalSelector;

export interface TagNameSelector {
   type: 'TagNameSelector';
   span: Span;
   name: WqName;
}

export interface UniversalSelector {
   type: 'UniversalSelector';
   span: Span;
   prefix?: NamespacePrefix | null;
}

export interface NamespacePrefix {
   type: 'NamespacePrefix';
   span: Span;
   namespace?: Namespace | null;
}

export type Namespace =
   | NamedNamespace
   | AnyNamespace;

export interface NamedNamespace {
   type: 'NamedNamespace';
   span: Span;
   name: Ident;
}

export interface AnyNamespace {
   type: 'AnyNamespace';
   span: Span;
}

export interface WqName {
   type: 'WqName';
   span: Span;
   prefix?: NamespacePrefix | null;
   value: Ident;
}

export type SubclassSelector =
   | IdSelector
   | ClassSelector
   | AttributeSelector
   | PseudoClassSelector
   | PseudoElementSelector;

export interface IdSelector {
   type: 'IdSelector';
   span: Span;
   text: Ident;
}

export interface ClassSelector {
   type: 'ClassSelector';
   span: Span;
   text: Ident;
}

export interface AttributeSelector {
   type: 'AttributeSelector';
   span: Span;
   name: WqName;
   matcher?: AttributeSelectorMatcher | null;
   value?: AttributeSelectorValue | null;
   modifier?: AttributeSelectorModifier | null;
}

export type AttributeSelectorMatcherValue =
   | 'Equals'
   | 'Tilde'
   | 'Bar'
   | 'Caret'
   | 'Dollar'
   | 'Asterisk';

export interface AttributeSelectorMatcher {
   type: 'AttributeSelectorMatcher';
   span: Span;
   value: AttributeSelectorMatcherValue;
}

export type AttributeSelectorValue =
   | Str
   | Ident;

export interface AttributeSelectorModifier {
   type: 'AttributeSelectorModifier';
   span: Span;
   value: Ident;
}

export interface PseudoClassSelector {
   type: 'PseudoClassSelector';
   span: Span;
   name: Ident;
   children?: PseudoClassSelectorChildren[] | null;
}

export type PseudoClassSelectorChildren =
   | TokenAndSpan
   | AnPlusB
   | Ident
   | Str
   | Delimiter
   | ComplexSelector
   | SelectorList
   | ForgivingSelectorList
   | CompoundSelectorList
   | RelativeSelectorList
   | ForgivingRelativeSelectorList
   | CompoundSelector
   ;

export type AnPlusB =
   | Ident
   | AnPlusBNotation;

export interface AnPlusBNotation {
   type: 'AnPlusBNotation';
   span: Span;
   a?: number | null;
   aRaw?: string | null;
   b?: number | null;
   bRaw?: string | null;
}

export interface PseudoElementSelector {
   type: 'PseudoElementSelector';
   span: Span;
   name: Ident;
   children?: PseudoElementSelectorChildren[] | null;
}

export type PseudoElementSelectorChildren =
   | TokenAndSpan
   | Ident
   | CompoundSelector
   | CustomHighlightName;

export interface CustomHighlightName {
   type: 'CustomHighlightName';
   span: Span;
   value: string;
   raw?: string | null;
}