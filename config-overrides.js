const { override } = require('customize-cra');

const setOutputGlobalObject = (value, onEnv = '*') => (config, env) => {
  if (onEnv === '*' || onEnv === env) {
    config.output.globalObject = value;
  }
  return config;
};

module.exports = override(setOutputGlobalObject('self', 'development'));
