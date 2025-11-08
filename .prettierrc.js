export default {
	semi: true,
	trailingComma: "all",
	singleQuote: false,
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	singleAttributePerLine: true,
	embeddedLanguageFormatting: "off",
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
	importOrder: [
		"<TYPES>^(node:)",
		"<TYPES>",
		"<TYPES>^[.]",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"<BUILTIN_MODULES>",
		"",
		"^(@blocks|@components|@hooks|@context|@actions|@util|@lib|@emailTemplates|@payload|@clients)(/.*)$",
		"",
		"^[./]",
		"",
		"^.+\\.css$",
	],
	importOrderCaseSensitive: true,
	importOrderParserPlugins: ["typescript", "jsx"],
	importOrderTypeScriptVersion: "5.0.0",
	overrides: [
		{
			files: ["*.css", "*.pcss", "*.postcss"],
			options: {
				singleQuote: false,
				cssDeclarationSorterOrder: null,
				unitWhitelist: [],
				unitWhitespace: false
			}
		}
	]
};
