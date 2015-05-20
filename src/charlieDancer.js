var CharlieDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this,top, left, timeBetweenSteps);

  this.$node.addClass( "charlieDancer" );


};

CharlieDancer.prototype = Object.create(Dancer.prototype);
CharlieDancer.prototype.constructor = CharlieDancer;

