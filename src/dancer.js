// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  // use jQuery to create an HTML <span> tag
  //console.log(this.prototype.constructor);
  this.$node = $('<div class="dancer"></div>');

  this.step(timeBetweenSteps);

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(top, left);

};

Dancer.prototype.step = function(timeBetweenSteps){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    var that = this;
    setTimeout(function(){that.step(timeBetweenSteps)}, timeBetweenSteps);
  };

Dancer.prototype.setPosition = function(top, left){
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
  };

Dancer.prototype.lineUp = function(position,totalPositions){
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //

    var screenWidth = $("#danceFloor").width();
    var screenHeight =  $("#danceFloor").height();

    var styleSettings = {
      top: (screenHeight-100) / 2,
      left: (((position+1)/(totalPositions+1)) * screenWidth) - (this.$node.width()/2)
    };
    this.$node.animate(styleSettings);
};

var cityImages = [
['sanFran', 'http://static1.squarespace.com/static/547f29bfe4b0dc192ed7bdac/54aeb15ce4b018c14f34c7cb/54aeb160e4b018c14f34c7ed/1420734817363/san-franc.jpg?format=2500w'],
['newYork', 'http://imgiy.com/wp-content/uploads/2015/05/new_york_1-1024x680.jpg'],
['hackReactor', ''],
['chicago', 'http://www.socrata.com/wp-content/uploads/2014/06/chicago-dreary-bean-1.jpg'],
['tajMahal', 'https://taajmahal.files.wordpress.com/2014/01/taj-mahal2.jpg'],
['disney', 'http://images.forwallpaper.com/files/images/8/8e64/8e648d27/285258/night-lights-fireworks-disneyland.jpg'],
['beach', 'http://dreamatico.com/data_images/beach/beach-8.jpg']
];
