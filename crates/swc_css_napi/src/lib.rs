#![deny(clippy::all)]

use napi_derive::napi;
use swc_core::{
   common::{FileName, SourceMap, errors::Handler, input::StringInput, sync::Lrc},
   css::{
      ast::Stylesheet,
      parser::{error::Error as CssError, parser::ParserConfig},
   },
};

#[napi(object)]
pub struct JsParserConfig {
   pub allow_wrong_line_comments: Option<bool>,
   pub css_modules: Option<bool>,
   pub legacy_nesting: Option<bool>,
   pub legacy_ie: Option<bool>,
}

fn get_parser_config(opts: Option<JsParserConfig>) -> ParserConfig {
   let opts = opts.unwrap_or(JsParserConfig {
      allow_wrong_line_comments: None,
      css_modules: None,
      legacy_nesting: None,
      legacy_ie: None,
   });

   ParserConfig {
      allow_wrong_line_comments: opts
         .allow_wrong_line_comments
         .unwrap_or(true),
      css_modules: opts
         .css_modules
         .unwrap_or(false),
      legacy_nesting: opts
         .legacy_nesting
         .unwrap_or(true),
      legacy_ie: opts
         .legacy_ie
         .unwrap_or(false),
   }
}

#[napi]
pub fn parse(
   code: String,
   options: Option<JsParserConfig>,
) -> napi::Result<serde_json::Value> {
   let cm = Lrc::new(SourceMap::default());
   let handler = Handler::with_emitter_writer(Box::new(std::io::stderr()), Some(cm.clone()));
   let fm = cm.new_source_file(Lrc::new(FileName::Custom("input.css".to_string())), code);

   let config = get_parser_config(options);

   let input = StringInput::from(&*fm);
   let lexer = swc_core::css::parser::lexer::Lexer::new(input, None, config);
   let mut parser = swc_core::css::parser::parser::Parser::new(lexer, config);

   let result: Result<Stylesheet, CssError> = parser.parse_all();

   match result {
      Ok(stylesheet) => serde_json::to_value(&stylesheet)
         .map_err(|e| napi::Error::from_reason(format!("ast serialization failed: {}", e))),
      Err(err) => {
         err.to_diagnostics(&handler)
            .emit();

         Err(napi::Error::from_reason("css parsing failed"))
      }
   }
}
