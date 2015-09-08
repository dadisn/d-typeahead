module.exports = Typeahead;

function Typeahead() {};

Typeahead.prototype.view = __dirname;
Typeahead.prototype.style = __dirname;

Typeahead.prototype.create = function(model, dom) {
  model.setNull('field', 'value');
  this.hide();
  this.typeaheadFilter = model.filter('options', 'value', 'field', 'mustFulfill', {limit: 10}, function(item, id, coll, value, field, mustFulfill) {
    if(!value || !item || !item[field]) return false;
    if(mustFulfill && !mustFulfill(item)) return false;
    if(item[field].toLowerCase().indexOf(value.toLowerCase()) > -1) return true;
    return false;
  });
  model.ref('results', this.typeaheadFilter);
};

Typeahead.prototype.show = function() {
  this.model.set('show', true);
};

Typeahead.prototype.hide = function() {
  this.model.set('show', false);
};

Typeahead.prototype.selectItem = function(item) {
  var field = this.model.get('field');
  this.emit('select', item);
  this.model.set('value', item[field]);
  this.hide();
};

Typeahead.prototype.toggleResults = function(event, value) {
  var res = this.model.get('results') || [];
  if(event.keyCode === 27) return this.hide();
  if(res.length === 0) return this.hide();
  if(res.length === 1 && res[0].value === value) return this.hide();
  return this.show();
};