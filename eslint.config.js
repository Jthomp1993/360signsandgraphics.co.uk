import reactCompiler from "eslint-plugin-react-compiler";

import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
	js.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				React: "readonly",
				JSX: "readonly",
				window: "readonly",
				document: "readonly",
				console: "readonly",
				process: "readonly",
				fetch: "readonly",
				performance: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			"react-compiler": reactCompiler,
		},
		rules: {
			"no-undef": "off",
			"no-redeclare": "off",
			"no-unused-vars": "off",
			/* "@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "after-used",
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			], */
			"valid-typeof": "error",
			"no-constant-binary-expression": "error",
			"no-empty-pattern": "error",
			"no-import-assign": "error",
			"react-compiler/react-compiler": "error",
		},
	},
];
