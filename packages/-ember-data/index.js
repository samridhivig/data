'use strict';
const merge = require('broccoli-merge-trees');
const addonBuildConfigForDataPackage = require('@ember-data/private-build-infra/src/addon-build-config-for-data-package');
const version = require('@ember-data/private-build-infra/src/create-version-module');

const addonBaseConfig = addonBuildConfigForDataPackage(require('./package.json'));

module.exports = Object.assign({}, addonBaseConfig, {
  shouldRollupPrivate: false,
  externalDependenciesForPrivateModule() {
    return [
      'ember',
      '@ember/application/namespace',
      '@ember-data/json-api',
      'ember-data/version',
      '@ember-data/store/-private',
      '@ember-data/store',
      '@ember-data/model',
      '@ember-data/model/-private',
      '@ember/array/proxy',
      '@ember/object/promise-proxy-mixin',
      '@ember/object/proxy',
      '@ember-data/tracking',
    ];
  },
  treeForAddon(tree) {
    // if we don't do this we won't have a super in addonBaseConfig
    // as a regex is used to decide if to add one for the method
    this._originalSuper = this._super;
    tree = merge([tree, version()]);
    return addonBaseConfig.treeForAddon.call(this, tree);
  },
});
