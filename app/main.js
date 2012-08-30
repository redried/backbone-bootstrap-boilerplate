require([
  // Application.
  "app",

  "backbone",
  "plugins/backbone.layoutmanager" 
],

function(app, Backbone) {

  var Interval = app.module();

  Interval.Collection = new Backbone.Collection([
        { name: "Unison" }, 
        { name: "Minor second" },
        { name: "Major second" }
  ]);

  Interval.Views.Box = Backbone.View.extend({
    manage: true,
    template: "interval",
    tagName: "li",
    className: "box",
    // Serialize method needed for templating
    serialize: function(){
      return { model: this.model }
    },
  });

  Interval.Views.List = Backbone.View.extend({
    tagName: "ul",
    manage: true,
    
    beforeRender: function(){
      console.log("beforeRender");
      this.collection.each(function(interval){
        this.insertView(new Interval.Views.Box({ model: interval }));
      }, this);
    },
    serialize: function(){
      return { collection: this.collection };
    }

  });

  app.useLayout("main");

  app.layout.setViews({
    ".intervals": new Interval.Views.List({ collection: Interval.Collection })
  });
 
  app.layout.render();

  app.layout.getViews(function(view){ 
    console.log(view);
    view.render(); 
  });
  
 
});
