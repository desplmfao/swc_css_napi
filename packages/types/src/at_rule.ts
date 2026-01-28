import type { Span, Declaration, SimpleBlock, Function, ListOfComponentValues } from './base';
import type { ForgivingSelectorList, SelectorList } from './selector';

import type {
   CustomIdent,
   CustomPropertyName,
   DashedIdent,
   Dimension,
   FamilyName,
   Ident,
   Number,
   Percentage,
   Ratio,
   Str,
   Url,
} from './value';

export interface AtRule {
   type: 'AtRule';
   span: Span;
   name: AtRuleName;
   prelude?: AtRulePrelude | null;
   block?: SimpleBlock | null;
}

export type AtRuleName = DashedIdent | Ident;

export type AtRulePrelude =
   | ListOfComponentValues
   | Str // CharsetPrelude
   | CustomPropertyName // PropertyPrelude
   | CustomIdent // CounterStylePrelude
   | ColorProfileName // ColorProfilePrelude
   | DocumentPrelude
   | DashedIdent // FontPaletteValuesPrelude
   | FontFeatureValuesPrelude
   | SelectorList // NestPrelude
   | KeyframesName
   | ImportPrelude
   | NamespacePrelude
   | MediaQueryList // MediaPrelude
   | SupportsCondition // SupportsPrelude
   | PageSelectorList // PagePrelude
   | LayerPrelude
   | ContainerCondition // ContainerPrelude
   | CustomMediaQuery // CustomMediaPrelude
   | ScopeRange; // ScopePrelude

export interface ScopeRange {
   type: 'ScopeRange';
   span: Span;
   scopeStart?: ForgivingSelectorList | null;
   scopeEnd?: ForgivingSelectorList | null;
}

export type ColorProfileName =
   | DashedIdent
   | Ident;

export interface DocumentPrelude {
   type: 'DocumentPrelude';
   span: Span;
   matchingFunctions: DocumentPreludeMatchingFunction[];
}

export interface FontFeatureValuesPrelude {
   type: 'FontFeatureValuesPrelude';
   span: Span;
   fontFamily: FamilyName[];
}

export type DocumentPreludeMatchingFunction =
   | Url
   | Function;

export type KeyframesName =
   | CustomIdent
   | Str
   | KeyframesPseudoPrefix
   | KeyframesPseudoFunction;

export interface KeyframesPseudoPrefix {
   type: 'KeyframesPseudo';
   span: Span;
   pseudo: Ident;
   name: KeyframesName;
}

export interface KeyframesPseudoFunction {
   type: 'KeyframesPseudo';
   span: Span;
   pseudo: Ident;
   name: KeyframesName;
}

export interface KeyframeBlock {
   type: 'KeyframeBlock';
   span: Span;
   prelude: KeyframeSelector[];
   block: SimpleBlock;
}

export type KeyframeSelector =
   | Ident
   | Percentage;

export interface ImportPrelude {
   type: 'ImportPrelude';
   span: Span;
   href: ImportHref;
   layerName?: ImportLayerName | null;
   importConditions?: ImportConditions | null;
}

export type ImportHref =
   | Url
   | Str;

export type ImportLayerName =
   | Ident
   | Function;

export interface ImportConditions {
   type: 'ImportCondition';
   span: Span;
   supports?: Function | null;
   media?: MediaQueryList | null;
}

export interface NamespacePrelude {
   type: 'NamespacePrelude';
   span: Span;
   prefix?: Ident | null;
   uri: NamespacePreludeUri;
}

export type NamespacePreludeUri =
   | Url
   | Str;

export interface MediaQueryList {
   type: 'MediaQueryList';
   span: Span;
   queries: MediaQuery[];
}

export interface MediaQuery {
   type: 'MediaQuery';
   span: Span;
   modifier?: Ident | null;
   mediaType?: MediaType | null;
   keyword?: Ident | null;
   condition?: MediaConditionType | null;
}

export type MediaType = Ident;

export type MediaConditionType =
   | MediaCondition
   | MediaConditionWithoutOr;

export interface MediaCondition {
   type: 'MediaCondition';
   span: Span;
   conditions: MediaConditionAllType[];
}

export interface MediaConditionWithoutOr {
   type: 'MediaConditionWithoutOr';
   span: Span;
   conditions: MediaConditionWithoutOrType[];
}

export type MediaConditionAllType =
   | MediaNot
   | MediaAnd
   | MediaOr
   | MediaInParens;

export type MediaConditionWithoutOrType =
   | MediaNot
   | MediaAnd
   | MediaInParens;

export interface MediaNot {
   type: 'MediaNot';
   span: Span;
   keyword?: Ident | null;
   condition: MediaInParens;
}

export interface MediaAnd {
   type: 'MediaAnd';
   span: Span;
   keyword?: Ident | null;
   condition: MediaInParens;
}

export interface MediaOr {
   type: 'MediaOr';
   span: Span;
   keyword?: Ident | null;
   condition: MediaInParens;
}

export type MediaInParens =
   | MediaCondition
   | MediaFeature
   | GeneralEnclosed;

export type MediaFeature =
   | MediaFeaturePlain
   | MediaFeatureBoolean
   | MediaFeatureRange
   | MediaFeatureRangeInterval;

export type MediaFeatureName =
   | Ident
   | ExtensionName;

export type MediaFeatureValue =
   | Number
   | Dimension
   | Ident
   | Ratio
   | Function;

export interface MediaFeaturePlain {
   type: 'MediaFeaturePlain';
   span: Span;
   name: MediaFeatureName;
   value: MediaFeatureValue;
}

export interface MediaFeatureBoolean {
   type: 'MediaFeatureBoolean';
   span: Span;
   name: MediaFeatureName;
}

export type MediaFeatureRangeComparison =
   | 'Lt'
   | 'Le'
   | 'Gt'
   | 'Ge'
   | 'Eq';

export interface MediaFeatureRange {
   type: 'MediaFeatureRange';
   span: Span;
   left: MediaFeatureValue;
   comparison: MediaFeatureRangeComparison;
   right: MediaFeatureValue;
}

export interface MediaFeatureRangeInterval {
   type: 'MediaFeatureRangeInterval';
   span: Span;
   left: MediaFeatureValue;
   leftComparison: MediaFeatureRangeComparison;
   name: MediaFeatureName;
   rightComparison: MediaFeatureRangeComparison;
   right: MediaFeatureValue;
}

export interface SupportsCondition {
   type: 'SupportsCondition';
   span: Span;
   conditions: SupportsConditionType[];
}

export type SupportsConditionType =
   | SupportsNot
   | SupportsAnd
   | SupportsOr
   | SupportsInParens;

export interface SupportsNot {
   type: 'SupportsNot';
   span: Span;
   keyword?: Ident | null;
   condition: SupportsInParens;
}

export interface SupportsAnd {
   type: 'SupportsAnd';
   span: Span;
   keyword?: Ident | null;
   condition: SupportsInParens;
}

export interface SupportsOr {
   type: 'SupportsOr';
   span: Span;
   keyword?: Ident | null;
   condition: SupportsInParens;
}

export type SupportsInParens =
   | SupportsCondition
   | SupportsFeature
   | GeneralEnclosed;

export type SupportsFeature =
   | Declaration
   | Function;

export type GeneralEnclosed =
   | Function
   | SimpleBlock;

export interface PageSelectorList {
   type: 'PageSelectorList';
   span: Span;
   selectors: PageSelector[];
}

export interface PageSelector {
   type: 'PageSelector';
   span: Span;
   pageType?: PageSelectorType | null;
   pseudos?: PageSelectorPseudo[] | null;
}

export interface PageSelectorType {
   type: 'PageSelectorType';
   span: Span;
   value: Ident;
}

export interface PageSelectorPseudo {
   type: 'PageSelectorPseudo';
   span: Span;
   value: Ident;
}

export type LayerPrelude =
   | LayerName
   | LayerNameList;

export interface LayerName {
   type: 'LayerName';
   span: Span;
   name: Ident[];
}

export interface LayerNameList {
   type: 'LayerNameList';
   span: Span;
   nameList: LayerName[];
}

export interface ContainerCondition {
   type: 'ContainerCondition';
   span: Span;
   name?: ContainerName | null;
   query: ContainerQuery;
}

export type ContainerName = CustomIdent;

export interface ContainerQuery {
   type: 'ContainerQuery';
   span: Span;
   queries: ContainerQueryType[];
}

export type ContainerQueryType =
   | ContainerQueryNot
   | ContainerQueryAnd
   | ContainerQueryOr
   | QueryInParens;

export interface ContainerQueryNot {
   type: 'ContainerQueryNot';
   span: Span;
   keyword?: Ident | null;
   query: QueryInParens;
}

export interface ContainerQueryAnd {
   type: 'ContainerQueryAnd';
   span: Span;
   keyword?: Ident | null;
   query: QueryInParens;
}

export interface ContainerQueryOr {
   type: 'ContainerQueryOr';
   span: Span;
   keyword?: Ident | null;
   query: QueryInParens;
}

export type QueryInParens =
   | ContainerQuery
   | SizeFeature
   | GeneralEnclosed;

export type SizeFeature =
   | SizeFeaturePlain
   | SizeFeatureBoolean
   | SizeFeatureRange
   | SizeFeatureRangeInterval;

export interface SizeFeaturePlain {
   type: 'SizeFeaturePlain';
   span: Span;
   name: SizeFeatureName;
   value: SizeFeatureValue;
}

export interface SizeFeatureBoolean {
   type: 'SizeFeatureBoolean';
   span: Span;
   name: SizeFeatureName;
}

export type SizeFeatureRangeComparison =
   | 'Lt'
   | 'Le'
   | 'Gt'
   | 'Ge'
   | 'Eq';

export interface SizeFeatureRange {
   type: 'SizeFeatureRange';
   span: Span;
   left: SizeFeatureValue;
   comparison: SizeFeatureRangeComparison;
   right: SizeFeatureValue;
}

export interface SizeFeatureRangeInterval {
   type: 'SizeFeatureRangeInterval';
   span: Span;
   left: SizeFeatureValue;
   leftComparison: SizeFeatureRangeComparison;
   name: SizeFeatureName;
   rightComparison: SizeFeatureRangeComparison;
   right: SizeFeatureValue;
}

export type SizeFeatureValue =
   | Number
   | Dimension
   | Ident
   | Ratio
   | Function;

export type SizeFeatureName = Ident;

export interface ExtensionName {
   type: 'ExtensionName';
   span: Span;
   value: string;
   raw?: string | null;
}

export interface CustomMediaQuery {
   type: 'CustomMedia';
   span: Span;
   name: ExtensionName;
   media: CustomMediaQueryMediaType;
}

export type CustomMediaQueryMediaType =
   | Ident
   | MediaQueryList;