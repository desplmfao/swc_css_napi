import type {
   AtRule,
   AtRuleName,
   AtRulePrelude,
   ContainerCondition,
   ContainerQuery,
   ContainerQueryType,
   ContainerQueryNot,
   ContainerQueryAnd,
   ContainerQueryOr,
   CustomMediaQuery,
   CustomMediaQueryMediaType,
   DocumentPrelude,
   DocumentPreludeMatchingFunction,
   ExtensionName,
   FontFeatureValuesPrelude,
   GeneralEnclosed,
   ImportConditions,
   ImportHref,
   ImportLayerName,
   ImportPrelude,
   KeyframeBlock,
   KeyframeSelector,
   LayerName,
   LayerNameList,
   MediaAnd,
   MediaCondition,
   MediaConditionAllType,
   MediaConditionType,
   MediaConditionWithoutOr,
   MediaConditionWithoutOrType,
   MediaFeature,
   MediaFeaturePlain,
   MediaFeatureName,
   MediaFeatureRange,
   MediaFeatureRangeInterval,
   MediaFeatureValue,
   MediaFeatureBoolean,
   MediaInParens,
   MediaNot,
   MediaOr,
   MediaQuery,
   MediaQueryList,
   NamespacePrelude,
   NamespacePreludeUri,
   PageSelector,
   PageSelectorList,
   PageSelectorPseudo,
   PageSelectorType,
   QueryInParens,
   ScopeRange,
   SizeFeature,
   SizeFeaturePlain,
   SizeFeatureRange,
   SizeFeatureRangeInterval,
   SizeFeatureValue,
   SizeFeatureBoolean,
   SupportsAnd,
   SupportsCondition,
   SupportsConditionType,
   SupportsFeature,
   SupportsInParens,
   SupportsNot,
   SupportsOr,
   //
   ComponentValue,
   Declaration,
   DeclarationName,
   Function,
   ImportantFlag,
   ListOfComponentValues,
   QualifiedRule,
   QualifiedRulePrelude,
   Rule,
   SimpleBlock,
   Stylesheet,
   //
   AnPlusB,
   AnPlusBNotation,
   AttributeSelector,
   AttributeSelectorMatcher,
   AttributeSelectorModifier,
   AttributeSelectorValue,
   ClassSelector,
   Combinator,
   ComplexSelector,
   ComplexSelectorChildren,
   CompoundSelector,
   CompoundSelectorList,
   CustomHighlightName,
   ForgivingComplexSelector,
   ForgivingRelativeSelector,
   ForgivingRelativeSelectorList,
   ForgivingSelectorList,
   IdSelector,
   NamedNamespace,
   Namespace,
   NamespacePrefix,
   NestingSelector,
   PseudoClassSelector,
   PseudoClassSelectorChildren,
   PseudoElementSelector,
   PseudoElementSelectorChildren,
   RelativeSelector,
   RelativeSelectorList,
   SelectorList,
   SubclassSelector,
   TagNameSelector,
   UniversalSelector,
   WqName,
   //
   Angle,
   CalcOperator,
   CalcProduct,
   CalcProductOrOperator,
   CalcSum,
   CalcValue,
   CalcValueOrOperator,
   CustomIdent,
   CustomPropertyName,
   DashedIdent,
   Delimiter,
   Flex,
   Frequency,
   HexColor,
   Ident,
   Integer,
   Length,
   Number,
   Percentage,
   Ratio,
   Resolution,
   SequenceOfCustomIdents,
   Str,
   Time,
   UnicodeRange,
   UnknownDimension,
   Url,
   UrlModifier,
   UrlValue,
   UrlValueRaw,
   //
   TokenAndSpan,
   Dimension
} from '@swc/css-types';

export class Visitor {
   visitStylesheet(n: Stylesheet): Stylesheet {
      n.rules = this.visitRuleItems(n.rules);

      return n;
   }

   visitRuleItems(items: Rule[]): Rule[] {
      return items.map(this.visitRule.bind(this));
   }

   visitRule(n: Rule): Rule {
      switch (n.type) {
         case 'QualifiedRule':
            return this.visitQualifiedRule(n);
         case 'AtRule':
            return this.visitAtRule(n);
         case 'ListOfComponentValues':
            return this.visitListOfComponentValues(n);
      }
   }

   visitQualifiedRule(n: QualifiedRule): QualifiedRule {
      n.prelude = this.visitQualifiedRuleItem(n.prelude);
      n.block = this.visitSimpleBlock(n.block);

      return n;
   }

   visitQualifiedRuleItem(n: QualifiedRulePrelude): QualifiedRulePrelude {
      switch (n.type) {
         case 'SelectorList':
            return this.visitSelectorList(n);
         case 'RelativeSelectorList':
            return this.visitRelativeSelectorList(n);
         case 'ListOfComponentValues':
            return this.visitListOfComponentValues(n);
      }
   }

   visitSimpleBlock(n: SimpleBlock): SimpleBlock {
      n.name = this.visitTokenAndSpan(n.name);
      n.value = this.visitComponentValueItems(n.value);

      return n;
   }

   visitFunction(n: Function): Function {
      n.name = this.visitFunctionName(n.name);
      n.value = this.visitComponentValueItems(n.value);

      return n;
   }

   visitFunctionName(n: Ident | DashedIdent): Ident | DashedIdent {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'DashedIdent':
            return this.visitDashedIdent(n);
      }
   }

   visitListOfComponentValues(n: ListOfComponentValues): ListOfComponentValues {
      n.children = this.visitComponentValueItems(n.children);

      return n;
   }

   visitComponentValueItems(items: ComponentValue[]): ComponentValue[] {
      return items.map(this.visitComponentValue.bind(this));
   }

   visitComponentValue(n: ComponentValue): ComponentValue {
      switch (n.type) {
         case 'PreservedToken':
            return this.visitTokenAndSpan(n);
         case 'Function':
            return this.visitFunction(n);
         case 'SimpleBlock':
            return this.visitSimpleBlock(n);
         case 'AtRule':
            return this.visitAtRule(n);
         case 'QualifiedRule':
            return this.visitQualifiedRule(n);
         case 'ListOfComponentValues':
            return this.visitListOfComponentValues(n);
         case 'KeyframeBlock':
            return this.visitKeyframeBlock(n);
         case 'Ident':
            return this.visitIdent(n);
         case 'DashedIdent':
            return this.visitDashedIdent(n);
         case 'String':
            return this.visitStr(n);
         case 'Url':
            return this.visitUrl(n);
         case 'Integer':
            return this.visitInteger(n);
         case 'Number':
            return this.visitNumber(n);
         case 'Percentage':
            return this.visitPercentage(n);
         case 'Length':
            return this.visitLength(n);
         case 'Angle':
            return this.visitAngle(n);
         case 'Time':
            return this.visitTime(n);
         case 'Frequency':
            return this.visitFrequency(n);
         case 'Resolution':
            return this.visitResolution(n);
         case 'Flex':
            return this.visitFlex(n);
         case 'UnknownDimension':
            return this.visitUnknownDimension(n);
         case 'Ratio':
            return this.visitRatio(n);
         case 'UnicodeRange':
            return this.visitUnicodeRange(n);
         case 'HexColor':
            return this.visitHexColor(n);
         case 'Delimiter':
            return this.visitDelimiter(n);
         case 'CalcSum':
            return this.visitCalcSum(n);
         case 'ComplexSelector':
            return this.visitComplexSelector(n);
         case 'LayerName':
            return this.visitLayerName(n);
         case 'SupportsCondition':
            return this.visitSupportsCondition(n);
         case 'Declaration':
            return this.visitDeclaration(n);
         case 'IdSelector':
            return this.visitIdSelector(n);
         default:
            return n;
      }
   }

   visitDeclaration(n: Declaration): Declaration {
      n.name = this.visitDeclarationName(n.name);
      n.value = this.visitComponentValueItems(n.value);

      if (n.important) {
         n.important = this.visitImportantFlag(n.important);
      }

      return n;
   }

   visitDeclarationName(n: DeclarationName): DeclarationName {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'DashedIdent':
            return this.visitDashedIdent(n);
      }
   }

   visitImportantFlag(n: ImportantFlag): ImportantFlag {
      n.value = this.visitIdent(n.value);

      return n;
   }

   visitAtRule(n: AtRule): AtRule {
      n.name = this.visitAtRuleName(n.name);

      if (n.prelude) {
         n.prelude = this.visitAtRuleItem(n.prelude);
      }

      if (n.block) {
         n.block = this.visitSimpleBlock(n.block);
      }

      return n;
   }

   visitAtRuleName(n: AtRuleName): AtRuleName {
      switch (n.type) {
         case 'DashedIdent':
            return this.visitDashedIdent(n);
         case 'Ident':
            return this.visitIdent(n);
      }
   }

   visitAtRuleItem(n: AtRulePrelude): AtRulePrelude {
      switch (n.type) {
         case 'ListOfComponentValues':
            return this.visitListOfComponentValues(n);
         case 'String':
            return this.visitStr(n);
         case 'CustomPropertyName':
            return this.visitCustomPropertyName(n);
         case 'CustomIdent':
            return this.visitCustomIdent(n);
         case 'DocumentPrelude':
            return this.visitDocumentPrelude(n);
         case 'DashedIdent':
            return this.visitDashedIdent(n);
         case 'FontFeatureValuesPrelude':
            return this.visitFontFeatureValuesPrelude(n);
         case 'SelectorList':
            return this.visitSelectorList(n);
         case 'MediaQueryList':
            return this.visitMediaQueryList(n);
         case 'SupportsCondition':
            return this.visitSupportsCondition(n);
         case 'PageSelectorList':
            return this.visitPageSelectorList(n);
         case 'LayerName':
         case 'LayerNameList':
            return this.visitLayerItem(n);
         case 'ContainerCondition':
            return this.visitContainerCondition(n);
         case 'CustomMedia':
            return this.visitCustomMediaQuery(n);
         case 'ScopeRange':
            return this.visitScopeRange(n);
         case 'ImportPrelude':
            return this.visitImportPrelude(n);
         case 'NamespacePrelude':
            return this.visitNamespacePrelude(n);
         default:
            return n;
      }
   }

   visitLayerItem(n: LayerName | LayerNameList): LayerName | LayerNameList {
      switch (n.type) {
         case 'LayerName':
            return this.visitLayerName(n);
         case 'LayerNameList':
            return this.visitLayerNameList(n);
      }
   }

   visitScopeRange(n: ScopeRange): ScopeRange {
      if (n.scopeStart) {
         n.scopeStart = this.visitForgivingSelectorList(n.scopeStart);
      }

      if (n.scopeEnd) {
         n.scopeEnd = this.visitForgivingSelectorList(n.scopeEnd);
      }

      return n;
   }

   visitDocumentPrelude(n: DocumentPrelude): DocumentPrelude {
      n.matchingFunctions = this.visitDocumentPreludeMatchingFunctionItems(n.matchingFunctions);

      return n;
   }

   visitDocumentPreludeMatchingFunctionItems(items: DocumentPreludeMatchingFunction[]): DocumentPreludeMatchingFunction[] {
      return items.map(this.visitDocumentPreludeMatchingFunction.bind(this));
   }

   visitDocumentPreludeMatchingFunction(n: DocumentPreludeMatchingFunction): DocumentPreludeMatchingFunction {
      switch (n.type) {
         case 'Url':
            return this.visitUrl(n);
         case 'Function':
            return this.visitFunction(n);
      }
   }

   visitFontFeatureValuesPrelude(n: FontFeatureValuesPrelude): FontFeatureValuesPrelude {
      n.fontFamily = this.visitFamilyNameItems(n.fontFamily);

      return n;
   }

   visitFamilyNameItems(items: (Str | SequenceOfCustomIdents)[]): (Str | SequenceOfCustomIdents)[] {
      return items.map(this.visitFamilyName.bind(this));
   }

   visitFamilyName(n: Str | SequenceOfCustomIdents): Str | SequenceOfCustomIdents {
      switch (n.type) {
         case 'String':
            return this.visitStr(n);
         case 'SequenceOfCustomIdents':
            return this.visitSequenceOfCustomIdents(n);
      }
   }

   visitKeyframeBlock(n: KeyframeBlock): KeyframeBlock {
      n.prelude = this.visitKeyframeSelectorItems(n.prelude);
      n.block = this.visitSimpleBlock(n.block);

      return n;
   }

   visitKeyframeSelectorItems(items: KeyframeSelector[]): KeyframeSelector[] {
      return items.map(this.visitKeyframeSelector.bind(this));
   }

   visitKeyframeSelector(n: KeyframeSelector): KeyframeSelector {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'Percentage':
            return this.visitPercentage(n);
      }
   }

   visitImportPrelude(n: ImportPrelude): ImportPrelude {
      n.href = this.visitImportHref(n.href);

      if (n.layerName) {
         n.layerName = this.visitImportLayerName(n.layerName);
      }

      if (n.importConditions) {
         n.importConditions = this.visitImportConditions(n.importConditions);
      }

      return n;
   }

   visitImportHref(n: ImportHref): ImportHref {
      switch (n.type) {
         case 'Url':
            return this.visitUrl(n);
         case 'String':
            return this.visitStr(n);
      }
   }

   visitImportLayerName(n: ImportLayerName): ImportLayerName {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'Function':
            return this.visitFunction(n);
      }
   }

   visitImportConditions(n: ImportConditions): ImportConditions {
      if (n.supports) {
         n.supports = this.visitFunction(n.supports);
      }

      if (n.media) {
         n.media = this.visitMediaQueryList(n.media);
      }

      return n;
   }

   visitNamespacePrelude(n: NamespacePrelude): NamespacePrelude {
      if (n.prefix) {
         n.prefix = this.visitIdent(n.prefix);
      }

      n.uri = this.visitNamespacePreludeUri(n.uri);

      return n;
   }

   visitNamespacePreludeUri(n: NamespacePreludeUri): NamespacePreludeUri {
      switch (n.type) {
         case 'Url':
            return this.visitUrl(n);
         case 'String':
            return this.visitStr(n);
      }
   }

   visitMediaQueryList(n: MediaQueryList): MediaQueryList {
      n.queries = this.visitMediaQueryItems(n.queries);

      return n;
   }

   visitMediaQueryItems(items: MediaQuery[]): MediaQuery[] {
      return items.map(this.visitMediaQuery.bind(this));
   }

   visitMediaQuery(n: MediaQuery): MediaQuery {
      if (n.modifier) {
         n.modifier = this.visitIdent(n.modifier);
      }

      if (n.mediaType) {
         n.mediaType = this.visitIdent(n.mediaType);
      }

      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      if (n.condition) {
         n.condition = this.visitMediaConditionItem(n.condition);
      }

      return n;
   }

   visitMediaConditionItem(n: MediaConditionType): MediaConditionType {
      switch (n.type) {
         case 'MediaCondition':
            return this.visitMediaCondition(n);
         case 'MediaConditionWithoutOr':
            return this.visitMediaConditionWithoutOr(n);
      }
   }

   visitMediaCondition(n: MediaCondition): MediaCondition {
      n.conditions = this.visitMediaConditionAllTypeItems(n.conditions);

      return n;
   }

   visitMediaConditionAllTypeItems(items: MediaConditionAllType[]): MediaConditionAllType[] {
      return items.map(this.visitMediaConditionAllType.bind(this));
   }

   visitMediaConditionWithoutOr(n: MediaConditionWithoutOr): MediaConditionWithoutOr {
      n.conditions = this.visitMediaConditionWithoutOrTypeItems(n.conditions);

      return n;
   }

   visitMediaConditionWithoutOrTypeItems(items: MediaConditionWithoutOrType[]): MediaConditionWithoutOrType[] {
      return items.map(this.visitMediaConditionWithoutOrType.bind(this));
   }

   visitMediaConditionAllType(n: MediaConditionAllType): MediaConditionAllType {
      switch (n.type) {
         case 'MediaNot':
            return this.visitMediaNot(n);
         case 'MediaAnd':
            return this.visitMediaAnd(n);
         case 'MediaOr':
            return this.visitMediaOr(n);
         default:
            return this.visitMediaInParens(n as MediaInParens);
      }
   }

   visitMediaConditionWithoutOrType(n: MediaConditionWithoutOrType): MediaConditionWithoutOrType {
      switch (n.type) {
         case 'MediaNot':
            return this.visitMediaNot(n);
         case 'MediaAnd':
            return this.visitMediaAnd(n);
         default:
            return this.visitMediaInParens(n);
      }
   }

   visitMediaNot(n: MediaNot): MediaNot {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.condition = this.visitMediaInParens(n.condition);

      return n;
   }

   visitMediaAnd(n: MediaAnd): MediaAnd {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }
      n.condition = this.visitMediaInParens(n.condition);
      return n;
   }

   visitMediaOr(n: MediaOr): MediaOr {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.condition = this.visitMediaInParens(n.condition);

      return n;
   }

   visitMediaInParens(n: MediaInParens): MediaInParens {
      switch (n.type) {
         case 'MediaCondition':
            return this.visitMediaCondition(n);
         case 'MediaFeaturePlain':
         case 'MediaFeatureBoolean':
         case 'MediaFeatureRange':
         case 'MediaFeatureRangeInterval':
            return this.visitMediaFeature(n);
         case 'Function':
         case 'SimpleBlock':
            return this.visitGeneralEnclosed(n);
      }
   }

   visitMediaFeature(n: MediaFeature): MediaFeature {
      switch (n.type) {
         case 'MediaFeaturePlain':
            return this.visitMediaFeaturePlain(n);
         case 'MediaFeatureBoolean':
            return this.visitMediaFeatureBoolean(n);
         case 'MediaFeatureRange':
            return this.visitMediaFeatureRange(n);
         case 'MediaFeatureRangeInterval':
            return this.visitMediaFeatureRangeInterval(n);
      }
   }

   visitMediaFeatureName(n: MediaFeatureName): MediaFeatureName {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'ExtensionName':
            return this.visitExtensionName(n);
      }
   }

   visitMediaFeatureValue(n: MediaFeatureValue): MediaFeatureValue {
      switch (n.type) {
         case 'Number':
            return this.visitNumber(n);
         case 'Length':
         case 'Angle':
         case 'Time':
         case 'Frequency':
         case 'Resolution':
         case 'Flex':
         case 'UnknownDimension':
            return this.visitDimension(n);
         case 'Ident':
            return this.visitIdent(n);
         case 'Ratio':
            return this.visitRatio(n);
         case 'Function':
            return this.visitFunction(n);
      }
   }

   visitMediaFeaturePlain(n: MediaFeaturePlain): MediaFeaturePlain {
      n.name = this.visitMediaFeatureName(n.name);
      n.value = this.visitMediaFeatureValue(n.value);

      return n;
   }

   visitMediaFeatureBoolean(n: MediaFeatureBoolean): MediaFeatureBoolean {
      n.name = this.visitMediaFeatureName(n.name);

      return n;
   }

   visitMediaFeatureRange(n: MediaFeatureRange): MediaFeatureRange {
      n.left = this.visitMediaFeatureValue(n.left);
      n.right = this.visitMediaFeatureValue(n.right);

      return n;
   }

   visitMediaFeatureRangeInterval(n: MediaFeatureRangeInterval): MediaFeatureRangeInterval {
      n.left = this.visitMediaFeatureValue(n.left);
      n.name = this.visitMediaFeatureName(n.name);
      n.right = this.visitMediaFeatureValue(n.right);

      return n;
   }

   visitSupportsCondition(n: SupportsCondition): SupportsCondition {
      n.conditions = this.visitSupportsConditionTypeItems(n.conditions);

      return n;
   }

   visitSupportsConditionTypeItems(items: SupportsConditionType[]): SupportsConditionType[] {
      return items.map(this.visitSupportsConditionType.bind(this));
   }

   visitSupportsConditionType(n: SupportsConditionType): SupportsConditionType {
      switch (n.type) {
         case 'SupportsNot':
            return this.visitSupportsNot(n);
         case 'SupportsAnd':
            return this.visitSupportsAnd(n);
         case 'SupportsOr':
            return this.visitSupportsOr(n);
         default:
            return this.visitSupportsInParens(n);
      }
   }

   visitSupportsNot(n: SupportsNot): SupportsNot {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.condition = this.visitSupportsInParens(n.condition);

      return n;
   }

   visitSupportsAnd(n: SupportsAnd): SupportsAnd {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.condition = this.visitSupportsInParens(n.condition);

      return n;
   }

   visitSupportsOr(n: SupportsOr): SupportsOr {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.condition = this.visitSupportsInParens(n.condition);

      return n;
   }

   visitSupportsInParens(n: SupportsInParens): SupportsInParens {
      switch (n.type) {
         case 'SupportsCondition':
            return this.visitSupportsCondition(n);
         case 'Declaration':
         case 'Function':
            return this.visitSupportsFeature(n);
         case 'SimpleBlock':
            return this.visitSimpleBlock(n);
      }
   }

   visitSupportsFeature(n: SupportsFeature): SupportsFeature {
      switch (n.type) {
         case 'Declaration':
            return this.visitDeclaration(n);
         case 'Function':
            return this.visitFunction(n);
      }
   }

   visitGeneralEnclosed(n: GeneralEnclosed): GeneralEnclosed {
      switch (n.type) {
         case 'Function':
            return this.visitFunction(n);
         case 'SimpleBlock':
            return this.visitSimpleBlock(n);
      }
   }

   visitPageSelectorList(n: PageSelectorList): PageSelectorList {
      n.selectors = this.visitPageSelectorItems(n.selectors);

      return n;
   }

   visitPageSelectorItems(items: PageSelector[]): PageSelector[] {
      return items.map(this.visitPageSelector.bind(this));
   }

   visitPageSelector(n: PageSelector): PageSelector {
      if (n.pageType) {
         n.pageType = this.visitPageSelectorType(n.pageType);
      }

      if (n.pseudos) {
         n.pseudos = this.visitPageSelectorPseudoItems(n.pseudos);
      }

      return n;
   }

   visitPageSelectorType(n: PageSelectorType): PageSelectorType {
      n.value = this.visitIdent(n.value);

      return n;
   }

   visitPageSelectorPseudoItems(items: PageSelectorPseudo[]): PageSelectorPseudo[] {
      return items.map(this.visitPageSelectorPseudo.bind(this));
   }

   visitPageSelectorPseudo(n: PageSelectorPseudo): PageSelectorPseudo {
      n.value = this.visitIdent(n.value);

      return n;
   }

   visitLayerName(n: LayerName): LayerName {
      n.name = this.visitIdentItems(n.name);

      return n;
   }

   visitIdentItems(items: Ident[]): Ident[] {
      return items.map(this.visitIdent.bind(this));
   }

   visitLayerNameList(n: LayerNameList): LayerNameList {
      n.nameList = this.visitLayerNameItems(n.nameList);

      return n;
   }

   visitLayerNameItems(items: LayerName[]): LayerName[] {
      return items.map(this.visitLayerName.bind(this));
   }

   visitContainerCondition(n: ContainerCondition): ContainerCondition {
      if (n.name) {
         n.name = this.visitCustomIdent(n.name);
      }

      n.query = this.visitContainerQuery(n.query);

      return n;
   }

   visitContainerQuery(n: ContainerQuery): ContainerQuery {
      n.queries = this.visitContainerQueryTypeItems(n.queries);

      return n;
   }

   visitContainerQueryTypeItems(items: ContainerQueryType[]): ContainerQueryType[] {
      return items.map(this.visitContainerQueryType.bind(this));
   }

   visitContainerQueryType(n: ContainerQueryType): ContainerQueryType {
      switch (n.type) {
         case 'ContainerQueryNot':
            return this.visitContainerQueryNot(n);
         case 'ContainerQueryAnd':
            return this.visitContainerQueryAnd(n);
         case 'ContainerQueryOr':
            return this.visitContainerQueryOr(n);
         default:
            return this.visitQueryInParens(n);
      }
   }

   visitContainerQueryNot(n: ContainerQueryNot): ContainerQueryNot {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.query = this.visitQueryInParens(n.query);

      return n;
   }

   visitContainerQueryAnd(n: ContainerQueryAnd): ContainerQueryAnd {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.query = this.visitQueryInParens(n.query);

      return n;
   }

   visitContainerQueryOr(n: ContainerQueryOr): ContainerQueryOr {
      if (n.keyword) {
         n.keyword = this.visitIdent(n.keyword);
      }

      n.query = this.visitQueryInParens(n.query);

      return n;
   }

   visitQueryInParens(n: QueryInParens): QueryInParens {
      switch (n.type) {
         case 'ContainerQuery':
            return this.visitContainerQuery(n);
         case 'SizeFeaturePlain':
         case 'SizeFeatureBoolean':
         case 'SizeFeatureRange':
         case 'SizeFeatureRangeInterval':
            return this.visitSizeFeature(n);
         case 'Function':
         case 'SimpleBlock':
            return this.visitGeneralEnclosed(n);
      }
   }

   visitSizeFeature(n: SizeFeature): SizeFeature {
      switch (n.type) {
         case 'SizeFeaturePlain':
            return this.visitSizeFeaturePlain(n);
         case 'SizeFeatureBoolean':
            return this.visitSizeFeatureBoolean(n);
         case 'SizeFeatureRange':
            return this.visitSizeFeatureRange(n);
         case 'SizeFeatureRangeInterval':
            return this.visitSizeFeatureRangeInterval(n);
      }
   }

   visitSizeFeaturePlain(n: SizeFeaturePlain): SizeFeaturePlain {
      n.name = this.visitIdent(n.name);
      n.value = this.visitSizeFeatureValue(n.value);

      return n;
   }

   visitSizeFeatureValue(n: SizeFeatureValue): SizeFeatureValue {
      switch (n.type) {
         case 'Number':
            return this.visitNumber(n);
         case 'Length':
         case 'Angle':
         case 'Time':
         case 'Frequency':
         case 'Resolution':
         case 'Flex':
         case 'UnknownDimension':
            return this.visitDimension(n);
         case 'Ident':
            return this.visitIdent(n);
         case 'Ratio':
            return this.visitRatio(n);
         case 'Function':
            return this.visitFunction(n);
      }
   }

   visitSizeFeatureBoolean(n: SizeFeatureBoolean): SizeFeatureBoolean {
      n.name = this.visitIdent(n.name);

      return n;
   }

   visitSizeFeatureRange(n: SizeFeatureRange): SizeFeatureRange {
      n.left = this.visitSizeFeatureValue(n.left);
      n.right = this.visitSizeFeatureValue(n.right);

      return n;
   }

   visitSizeFeatureRangeInterval(n: SizeFeatureRangeInterval): SizeFeatureRangeInterval {
      n.left = this.visitSizeFeatureValue(n.left);
      n.name = this.visitIdent(n.name);
      n.right = this.visitSizeFeatureValue(n.right);

      return n;
   }

   visitExtensionName(n: ExtensionName): ExtensionName {
      return n;
   }

   visitCustomMediaQuery(n: CustomMediaQuery): CustomMediaQuery {
      n.name = this.visitExtensionName(n.name);
      n.media = this.visitCustomMediaQueryMediaType(n.media);

      return n;
   }

   visitCustomMediaQueryMediaType(n: CustomMediaQueryMediaType): CustomMediaQueryMediaType {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'MediaQueryList':
            return this.visitMediaQueryList(n);
      }
   }

   visitSelectorList(n: SelectorList): SelectorList {
      n.children = this.visitComplexSelectorItems(n.children);

      return n;
   }

   visitComplexSelectorItems(items: ComplexSelector[]): ComplexSelector[] {
      return items.map(this.visitComplexSelector.bind(this));
   }

   visitForgivingSelectorList(n: ForgivingSelectorList): ForgivingSelectorList {
      n.children = this.visitForgivingComplexSelectorItems(n.children);

      return n;
   }

   visitForgivingComplexSelectorItems(items: ForgivingComplexSelector[]): ForgivingComplexSelector[] {
      return items.map(this.visitForgivingComplexSelector.bind(this));
   }

   visitForgivingComplexSelector(n: ForgivingComplexSelector): ForgivingComplexSelector {
      switch (n.type) {
         case 'ComplexSelector':
            return this.visitComplexSelector(n);
         case 'ListOfComponentValues':
            return this.visitListOfComponentValues(n);
      }
   }

   visitCompoundSelectorList(n: CompoundSelectorList): CompoundSelectorList {
      n.children = this.visitCompoundSelectorItems(n.children);

      return n;
   }

   visitCompoundSelectorItems(items: CompoundSelector[]): CompoundSelector[] {
      return items.map(this.visitCompoundSelector.bind(this));
   }

   visitRelativeSelectorList(n: RelativeSelectorList): RelativeSelectorList {
      n.children = this.visitRelativeSelectorItems(n.children);

      return n;
   }

   visitRelativeSelectorItems(items: RelativeSelector[]): RelativeSelector[] {
      return items.map(this.visitRelativeSelector.bind(this));
   }

   visitForgivingRelativeSelectorList(n: ForgivingRelativeSelectorList): ForgivingRelativeSelectorList {
      n.children = this.visitForgivingRelativeSelectorItems(n.children);

      return n;
   }

   visitForgivingRelativeSelectorItems(items: ForgivingRelativeSelector[]): ForgivingRelativeSelector[] {
      return items.map(this.visitForgivingRelativeSelector.bind(this));
   }

   visitForgivingRelativeSelector(n: ForgivingRelativeSelector): ForgivingRelativeSelector {
      switch (n.type) {
         case 'RelativeSelector':
            return this.visitRelativeSelector(n);
         case 'ListOfComponentValues':
            return this.visitListOfComponentValues(n);
      }
   }

   visitComplexSelector(n: ComplexSelector): ComplexSelector {
      n.children = this.visitComplexSelectorChildrenItems(n.children);

      return n;
   }

   visitComplexSelectorChildrenItems(items: ComplexSelectorChildren[]): ComplexSelectorChildren[] {
      return items.map(this.visitComplexSelectorChildren.bind(this));
   }

   visitComplexSelectorChildren(n: ComplexSelectorChildren): ComplexSelectorChildren {
      switch (n.type) {
         case 'CompoundSelector':
            return this.visitCompoundSelector(n);
         case 'Combinator':
            return this.visitCombinator(n);
      }
   }

   visitRelativeSelector(n: RelativeSelector): RelativeSelector {
      if (n.combinator) {
         n.combinator = this.visitCombinator(n.combinator);
      }

      n.selector = this.visitComplexSelector(n.selector);

      return n;
   }

   visitCompoundSelector(n: CompoundSelector): CompoundSelector {
      if (n.nestingSelector) {
         n.nestingSelector = this.visitNestingSelector(n.nestingSelector);
      }

      if (n.typeSelector) {
         n.typeSelector = this.visitTypeSelector(n.typeSelector);
      }

      n.subclassSelectors = this.visitSubclassSelectorItems(n.subclassSelectors);

      return n;
   }

   visitSubclassSelectorItems(items: SubclassSelector[]): SubclassSelector[] {
      return items.map(this.visitSubclassSelector.bind(this));
   }

   visitCombinator(n: Combinator): Combinator {
      return n;
   }

   visitNestingSelector(n: NestingSelector): NestingSelector {
      return n;
   }

   visitTypeSelector(n: TagNameSelector | UniversalSelector): TagNameSelector | UniversalSelector {
      switch (n.type) {
         case 'TagNameSelector':
            return this.visitTagNameSelector(n);
         case 'UniversalSelector':
            return this.visitUniversalSelector(n);
      }
   }

   visitTagNameSelector(n: TagNameSelector): TagNameSelector {
      n.name = this.visitWqName(n.name);

      return n;
   }

   visitUniversalSelector(n: UniversalSelector): UniversalSelector {
      if (n.prefix) {
         n.prefix = this.visitNamespacePrefix(n.prefix);
      }

      return n;
   }

   visitNamespacePrefix(n: NamespacePrefix): NamespacePrefix {
      if (n.namespace) {
         n.namespace = this.visitNamespaceItem(n.namespace);
      }

      return n;
   }

   visitNamespaceItem(n: Namespace): Namespace {
      switch (n.type) {
         case 'NamedNamespace':
            return this.visitNamedNamespace(n);
         case 'AnyNamespace':
            return n;
      }
   }

   visitNamedNamespace(n: NamedNamespace): NamedNamespace {
      n.name = this.visitIdent(n.name);

      return n;
   }

   visitWqName(n: WqName): WqName {
      if (n.prefix) {
         n.prefix = this.visitNamespacePrefix(n.prefix);
      }

      n.value = this.visitIdent(n.value);

      return n;
   }

   visitSubclassSelector(n: SubclassSelector): SubclassSelector {
      switch (n.type) {
         case 'IdSelector':
            return this.visitIdSelector(n);
         case 'ClassSelector':
            return this.visitClassSelector(n);
         case 'AttributeSelector':
            return this.visitAttributeSelector(n);
         case 'PseudoClassSelector':
            return this.visitPseudoClassSelector(n);
         case 'PseudoElementSelector':
            return this.visitPseudoElementSelector(n);
         default:
            return n;
      }
   }

   visitIdSelector(n: IdSelector): IdSelector {
      n.text = this.visitIdent(n.text);

      return n;
   }

   visitClassSelector(n: ClassSelector): ClassSelector {
      n.text = this.visitIdent(n.text);

      return n;
   }

   visitAttributeSelector(n: AttributeSelector): AttributeSelector {
      n.name = this.visitWqName(n.name);

      if (n.matcher) {
         n.matcher = this.visitAttributeSelectorMatcher(n.matcher);
      }

      if (n.value) {
         n.value = this.visitAttributeSelectorValueItem(n.value);
      }

      if (n.modifier) {
         n.modifier = this.visitAttributeSelectorModifier(n.modifier);
      }

      return n;
   }

   visitAttributeSelectorMatcher(n: AttributeSelectorMatcher): AttributeSelectorMatcher {
      return n;
   }

   visitAttributeSelectorValueItem(n: AttributeSelectorValue): AttributeSelectorValue {
      switch (n.type) {
         case 'String':
            return this.visitStr(n);
         case 'Ident':
            return this.visitIdent(n);
      }
   }

   visitAttributeSelectorModifier(n: AttributeSelectorModifier): AttributeSelectorModifier {
      n.value = this.visitIdent(n.value);

      return n;
   }

   visitPseudoClassSelector(n: PseudoClassSelector): PseudoClassSelector {
      n.name = this.visitIdent(n.name);

      if (n.children) {
         n.children = this.visitPseudoClassSelectorChildrenItems(n.children);
      }

      return n;
   }

   visitPseudoClassSelectorChildrenItems(items: PseudoClassSelectorChildren[]): PseudoClassSelectorChildren[] {
      return items.map(this.visitPseudoClassSelectorChildren.bind(this));
   }

   visitPseudoClassSelectorChildren(n: PseudoClassSelectorChildren): PseudoClassSelectorChildren {
      switch (n.type) {
         case 'PreservedToken':
            return this.visitTokenAndSpan(n);
         case 'Ident':
            return this.visitIdent(n);
         case 'String':
            return this.visitStr(n);
         case 'Delimiter':
            return this.visitDelimiter(n);
         case 'ComplexSelector':
            return this.visitComplexSelector(n);
         case 'SelectorList':
            return this.visitSelectorList(n);
         case 'CompoundSelector':
            return this.visitCompoundSelector(n);
         default:
            return n;
      }
   }

   visitAnPlusBItem(n: AnPlusB): AnPlusB {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'AnPlusBNotation':
            return this.visitAnPlusBNotation(n);
      }
   }

   visitAnPlusBNotation(n: AnPlusBNotation): AnPlusBNotation {
      return n;
   }

   visitPseudoElementSelector(n: PseudoElementSelector): PseudoElementSelector {
      n.name = this.visitIdent(n.name);

      if (n.children) {
         n.children = this.visitPseudoElementSelectorChildrenItems(n.children);
      }

      return n;
   }

   visitPseudoElementSelectorChildrenItems(items: PseudoElementSelectorChildren[]): PseudoElementSelectorChildren[] {
      return items.map(this.visitPseudoElementSelectorChildren.bind(this));
   }

   visitPseudoElementSelectorChildren(n: PseudoElementSelectorChildren): PseudoElementSelectorChildren {
      switch (n.type) {
         case 'PreservedToken':
            return this.visitTokenAndSpan(n);
         case 'Ident':
            return this.visitIdent(n);
         case 'CompoundSelector':
            return this.visitCompoundSelector(n);
         case 'CustomHighlightName':
            return this.visitCustomHighlightName(n);
      }
   }

   visitCustomHighlightName(n: CustomHighlightName): CustomHighlightName {
      return n;
   }

   visitIdent(n: Ident): Ident {
      return n;
   }

   visitCustomIdent(n: CustomIdent): CustomIdent {
      return n;
   }

   visitDashedIdent(n: DashedIdent): DashedIdent {
      return n;
   }

   visitCustomPropertyName(n: CustomPropertyName): CustomPropertyName {
      return n;
   }

   visitStr(n: Str): Str {
      return n;
   }

   visitDelimiter(n: Delimiter): Delimiter {
      return n;
   }

   visitHexColor(n: HexColor): HexColor {
      return n;
   }

   visitDimension(n: Dimension): Dimension {
      switch (n.type) {
         case 'Length':
            return this.visitLength(n);
         case 'Angle':
            return this.visitAngle(n);
         case 'Time':
            return this.visitTime(n);
         case 'Frequency':
            return this.visitFrequency(n);
         case 'Resolution':
            return this.visitResolution(n);
         case 'Flex':
            return this.visitFlex(n);
         case 'UnknownDimension':
            return this.visitUnknownDimension(n);
      }
   }

   visitLength(n: Length): Length {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitAngle(n: Angle): Angle {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitTime(n: Time): Time {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitFrequency(n: Frequency): Frequency {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitResolution(n: Resolution): Resolution {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitFlex(n: Flex): Flex {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitUnknownDimension(n: UnknownDimension): UnknownDimension {
      n.value = this.visitNumber(n.value);
      n.unit = this.visitIdent(n.unit);

      return n;
   }

   visitPercentage(n: Percentage): Percentage {
      n.value = this.visitNumber(n.value);

      return n;
   }

   visitInteger(n: Integer): Integer {
      return n;
   }

   visitNumber(n: Number): Number {
      return n;
   }

   visitRatio(n: Ratio): Ratio {
      n.left = this.visitNumber(n.left);

      if (n.right) {
         n.right = this.visitNumber(n.right);
      }

      return n;
   }

   visitUrl(n: Url): Url {
      n.name = this.visitIdent(n.name);

      if (n.value) {
         n.value = this.visitUrlValueItem(n.value);
      }

      if (n.modifiers) {
         n.modifiers = this.visitUrlModifierItems(n.modifiers);
      }

      return n;
   }

   visitUrlValueItem(n: UrlValue): UrlValue {
      switch (n.type) {
         case 'String':
            return this.visitStr(n);
         case 'UrlValueRaw':
            return this.visitUrlValueRaw(n);
      }
   }

   visitUrlValueRaw(n: UrlValueRaw): UrlValueRaw {
      return n;
   }

   visitUrlModifierItems(items: UrlModifier[]): UrlModifier[] {
      return items.map(this.visitUrlModifier.bind(this));
   }

   visitUrlModifier(n: UrlModifier): UrlModifier {
      switch (n.type) {
         case 'Ident':
            return this.visitIdent(n);
         case 'Function':
            return this.visitFunction(n);
      }
   }

   visitUnicodeRange(n: UnicodeRange): UnicodeRange {
      return n;
   }

   visitCalcSum(n: CalcSum): CalcSum {
      n.expressions = this.visitCalcProductOrOperatorItems(n.expressions);

      return n;
   }

   visitCalcProductOrOperatorItems(items: CalcProductOrOperator[]): CalcProductOrOperator[] {
      return items.map(this.visitCalcProductOrOperator.bind(this));
   }

   visitCalcProductOrOperator(n: CalcProductOrOperator): CalcProductOrOperator {
      switch (n.type) {
         case 'CalcProduct':
            return this.visitCalcProduct(n);
         case 'CalcOperator':
            return this.visitCalcOperator(n);
      }
   }

   visitCalcProduct(n: CalcProduct): CalcProduct {
      n.expressions = this.visitCalcValueOrOperatorItems(n.expressions);

      return n;
   }

   visitCalcValueOrOperatorItems(items: CalcValueOrOperator[]): CalcValueOrOperator[] {
      return items.map(this.visitCalcValueOrOperator.bind(this));
   }

   visitCalcValueOrOperator(n: CalcValueOrOperator): CalcValueOrOperator {
      switch (n.type) {
         case 'CalcOperator':
            return this.visitCalcOperator(n);
         default:
            return this.visitCalcValueItem(n);
      }
   }

   visitCalcValueItem(n: CalcValue): CalcValue {
      switch (n.type) {
         case 'Number':
            return this.visitNumber(n);
         case 'Percentage':
            return this.visitPercentage(n);
         case 'Ident':
            return this.visitIdent(n);
         case 'CalcSum':
            return this.visitCalcSum(n);
         case 'Function':
            return this.visitFunction(n);
         default:
            return this.visitDimension(n);
      }
   }

   visitCalcOperator(n: CalcOperator): CalcOperator {
      return n;
   }

   visitSequenceOfCustomIdents(n: SequenceOfCustomIdents): SequenceOfCustomIdents {
      n.value = this.visitCustomIdentItems(n.value);

      return n;
   }

   visitCustomIdentItems(items: CustomIdent[]): CustomIdent[] {
      return items.map(this.visitCustomIdent.bind(this));
   }

   visitTokenAndSpan(n: TokenAndSpan): TokenAndSpan {
      return n;
   }
}