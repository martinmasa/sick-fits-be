const prettierOptions = require('./.prettierrc');

const OFF = 0;
const ERROR = 2;

module.exports = {
  root: true,
  'parser': 'babel-eslint',
  'extends': [
    'prettier'
  ],
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'plugins': [
    'prettier'
  ],
  'rules': {
    'prettier/prettier': [ERROR, prettierOptions],
    'arrow-body-style': OFF,
    'arrow-parens': OFF,
    'camelcase': OFF,
    'class-methods-use-this': OFF,
    'comma-dangle': OFF,
    'function-paren-newline': OFF,
    'object-curly-newline': OFF,
    'implicit-arrow-linebreak': OFF
  }
};