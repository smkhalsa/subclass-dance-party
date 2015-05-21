var NutDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this,top, left, timeBetweenSteps);

  this.$node.addClass( "nutDancer" );


};

NutDancer.prototype = Object.create(Dancer.prototype);
NutDancer.prototype.constructor = NutDancer;

