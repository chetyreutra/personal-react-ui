import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

import stylistic from '@stylistic/eslint-plugin'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import stylisticJsx from '@stylistic/eslint-plugin-jsx'

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        files: ['**/*.js'],
        extends: [tseslint.configs.disableTypeChecked]
    },
    {
        plugins: {
            '@stylistic': stylistic,
            "@stylistic/js": stylisticJs,
            "@stylistic/ts": stylisticTs,
            "@stylistic/jsx": stylisticJsx
        },
        rules: {
            "@stylistic/max-len": ["error", { "code": 80, "ignoreTemplateLiterals": true }],
            "no-multi-spaces": "error",
            "@stylistic/comma-dangle": ['error', "never"]
        }
    }
)

