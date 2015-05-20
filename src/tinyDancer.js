var TinyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this,top, left, timeBetweenSteps);

  this.$node.addClass( "tinyDancer" );

  this.tiny = false;

};

TinyDancer.prototype = Object.create(Dancer.prototype);
TinyDancer.prototype.constructor = TinyDancer;
TinyDancer.prototype.makeTiny = function() {
  if(this.tiny) {
    this.$node.animate({"border-width": "10px", "border-radius": "10px"}, 500);
    this.tiny = false;
  } else {
    this.$node.animate({"border-width": "5px", "border-radius": "5px"}, 500);
    this.tiny = true;
  }
};
