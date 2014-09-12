import Ember from 'ember';

/**
	Marks a component as a registry for table columns
	@namespace mixins
	@class table-column-registrar
*/
export default Ember.Mixin.create({

	/**
		Gets or sets whether a multi sort is used.
		@property sortMultiple
		@type Boolean
		@default false
	*/
	sortMultiple: false,

	/**
		identifies the component as a table column registrar to its children
		@property isTableColumnRegistrar
		@type Boolean
		@default true
	*/
	isTableColumnRegistrar: true,

	/**
		The collection of columns registered
		@property columns
		@type Array
		@readonly
	*/
	columns: Ember.computed.oneWay('_columns'),

	_columns: function(){
		return [];
	}.property(),

	/**
		The list of visible columns
		@property visibleColumns
		@type Array
		@readonly
	*/
	visibleColumns: function(){
		return this.get('columns').filter(function(column) {
			return column.get('isVisible');
		});
	}.property('columns.@each.isVisible'),

	/**
		The list of columns with an sort applied to them
		@property sortedColumns
		@type Array
		@readonly
	*/
	sortedColumns: function(){
		return this.get('columns').filter(function(col) {
			return col.get('direction') !== 0;
		});
	}.property('columns.@each.sortDirection'),

	/**
		Registers a column with the registrar
		@method registerColumn
		@param column {components.nf-column} the column to register
	*/
	registerColumn: function(column) {
		this.get('columns').pushObject(column);
	},

	/**
		Unregisters a column from the registry
		@method unregisterColumn
		@param column {components.nf-column} the column to unregister
	*/
	unregisterColumn: function(column) {
		this.get('columns').removeObject(column);
	},
});