var _ = require('lodash');

function Component() {}

Component.prototype.view = __dirname;

Component.prototype.init = function (model) {
  var self = this;

  model.start('index', 'items', 'value', function (items, value) {
    return _.findIndex(items, {value: value});
  });

  model.start('selected', 'items', 'index', function (items, index) {
    return items[index];
  });

  model.setNull('defaultValue', model.get('value'));

  model.start('value', '_value', 'defaultValue', {
    get: function (_value, defaultValue) {
      return _value || defaultValue;
    },
    set: function (value, _value, defaultValue) {
      return [value, defaultValue];
    }
  });
};

Component.prototype.create = function (model, dom) {
  var self = this;

  dom.on('click', function (e) {
    self.close(e);
  });

  dom.on('keydown', function (e) {
    if (e.keyCode === 27) self.close(e);
  });
};

Component.prototype.open = function (e) {
  e.stopPropagation();
  if (this.model.get('disabled')) return;
  this.model.set('open', true);
  this.emit('open');
};

Component.prototype.close = function (e) {
  if (this.model.get('disabled')) return;
  this.model.del('open');
  this.emit('close');
};

Component.prototype.select = function (e, index, item) {
  e.stopPropagation();
  if (this.model.get('disabled')) return;
  this.model.set('value', item.value);
  this.emit('select', index, item);
  this.close();
};

module.exports = Component;
