// Generated by CoffeeScript 1.11.1
(function() {
  var $, DomView, Model, Subtodo, Todo, TodoVM, TodoView, attribute, find, from, ref, template,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = require('janus'), Model = ref.Model, attribute = ref.attribute, DomView = ref.DomView, template = ref.template, find = ref.find, from = ref.from;

  $ = require('jquery');

  Todo = require('../model/todo').Todo;

  Subtodo = require('../model/subtodo').Subtodo;

  TodoVM = (function(superClass) {
    extend(TodoVM, superClass);

    function TodoVM() {
      return TodoVM.__super__.constructor.apply(this, arguments);
    }

    TodoVM.attribute('expanded', (function(superClass1) {
      extend(_Class, superClass1);

      function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
      }

      _Class.prototype["default"] = function() {
        return false;
      };

      return _Class;

    })(attribute.BooleanAttribute));

    TodoVM.bind('dummySubitem', from(function() {
      return new Subtodo();
    }));

    return TodoVM;

  })(Model);

  TodoView = (function(superClass) {
    extend(TodoView, superClass);

    function TodoView() {
      return TodoView.__super__.constructor.apply(this, arguments);
    }

    TodoView.viewModelClass = TodoVM;

    TodoView._dom = function() {
      return $('<div class="todo"> <div class="summaryLine"> <div class="todoCheck"></div> <div class="todoTitle"></div> <div class="todoExpand"></div> </div> <div class="detailLine"> <div class="todoDescription"></div> <div class="todoSubitems"></div> <div class="todoDummySubitem"></div> </div> </div>');
    };

    TodoView._template = template(find('.todo').classed('done', from('subject').watch('done')), find('.todoCheck').render(from('subject').attribute('done')).context('edit'), find('.todoTitle').render(from('subject').attribute('name')).context('edit'), find('.todoExpand').render(from.attribute('expanded')).context('edit').find({
      attributes: {
        style: 'button'
      }
    }), find('.detailLine').classed('expanded', from('expanded')), find('.todoDescription').render(from('subject').attribute('description')).context('edit').find({
      attributes: {
        style: 'multiline'
      }
    }), find('.todoSubitems').render(from('subject').watch('subitems')).context('edit'), find('.todoDummySubitem').render(from('dummySubitem')));

    TodoView.prototype._wireEvents = function() {
      var dom, todo;
      dom = this.artifact();
      todo = this.subject.get('subject');
      return dom.on('click', '.todoDummySubitem', function(event) {
        var newSubtodo, newSubtodoDom;
        event.preventDefault();
        newSubtodo = new Subtodo();
        todo.get('subitems').add(newSubtodo);
        newSubtodoDom = dom.find('.todoSubitems li:last .subtodo');
        if ($(event.target).is('input[type=checkbox]')) {
          newSubtodo.set('done', true);
          return newSubtodoDom.find('input[type=checkbox]').focus();
        } else {
          return newSubtodoDom.find('input[type=text]').focus();
        }
      });
    };

    return TodoView;

  })(DomView);

  module.exports = {
    TodoVM: TodoVM,
    TodoView: TodoView,
    registerWith: function(library) {
      return library.register(Todo, TodoView);
    }
  };

}).call(this);
