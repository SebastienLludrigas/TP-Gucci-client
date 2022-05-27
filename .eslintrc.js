module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    quotes: "off",
    "vue/singleline-html-element-content-newline": "off",
    "space-before-function-paren": "off",
    semi: "off",
    "comma-dangle": "off",
    "vue/html-self-closing": "off",
    curly: "off",
    "no-console": "off",
    "arrow-parens": "off",
    "no-lonely-if": "off",
    "vue/html-indent": "off",
    "no-useless-return": "off",
    "eol-last": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/valid-template-root": "off"
  }
}
