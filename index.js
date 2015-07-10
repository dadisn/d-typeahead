module.exports = Typeahead;

function Typeahead() {};

Typeahead.prototype.view = __dirname;
Typeahead.prototype.style = __dirname;

Typeahead.prototype.create = function(model, dom) {
  this.hide();
  this.typeaheadFilter = model.filter('options', 'value', function(item, id, coll, value) {
    if(!value || !item || !item.value) return false;
    if(item.value.toLowerCase().indexOf(value.toLowerCase()) > -1) return true;
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
  this.model.set('value', item.value);
  this.hide();
};

Typeahead.prototype.toggleResults = function(event, value) {
  var res = this.model.get('results') || [];
  if(event.keyCode === 27) return this.hide();
  if(res.length === 0) return this.hide();
  if(res.length === 1 && res[0].value === value) return this.hide();
  return this.show();
};