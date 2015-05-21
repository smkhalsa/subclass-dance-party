var JellyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this,top, left, timeBetweenSteps);

  this.$node.addClass( "jellyDancer" );

};

JellyDancer.prototype = Object.create(Dancer.prototype);
JellyDancer.prototype.constructor = JellyDancer;
