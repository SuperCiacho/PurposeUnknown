module.exports = {
    env: {
        browser: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'prettier',
        'prettier/react',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['react', 'prettier', '@typescript-eslint'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'class-methods-use-this': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'max-classes-per-file': ['warn', 10],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': "off",
        'jsx-a11y/media-has-caption': "off"
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': [
                    'error',
                    { allowTypedFunctionExpressions: true, allowHigherOrderFunctions: true }
                ]
            }
        }
    ],
    env: {
        jest: true,
        browser: true,
        node: true
    }
};
