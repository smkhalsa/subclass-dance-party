var BananaDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this,top, left, timeBetweenSteps);

  this.$node.addClass( "bananaDancer" );

};

BananaDancer.prototype = Object.create(Dancer.prototype);
BananaDancer.prototype.constructor = BananaDancer;
