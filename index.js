function Component() {}

Component.prototype.view = __dirname;

Component.prototype.init = function () {
  // do nothing
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
  this.model.set('open', true);
  this.emit('open');
};

Component.prototype.close = function (e) {
  this.model.del('open');
  this.emit('close');
};

Component.prototype.select = function (e, item) {
  e.stopPropagation();
  this.model.set('value', item.value);
  this.emit('select', item);
  this.close();
};

module.exports = Component;
