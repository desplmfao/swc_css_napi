import type { Stylesheet } from '@swc/css-types';

import { parse as _parse } from '../binding';
import type { JsParserConfig } from '../binding';

import type { Visitor } from './Visitor';

/**
 * parses css code into an swc css ast stylesheet
 * 
 * @param code - the css source code string
 * @param options - parser configuration options
 */
export const parse = (
   code: string,
   options?: JsParserConfig
): Stylesheet => {
   return _parse(code, options);
};

/**
 * traverses the stylesheet ast using the provided visitor
 */
export const visit = (node: Stylesheet, visitor: Visitor): Stylesheet => {
   return visitor.visitStylesheet(node);
};

export { Visitor };