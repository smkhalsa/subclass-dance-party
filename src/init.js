$(document).ready(function(){
  window.dancers = [];

  $("body").on("click",".addDancer", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("#danceFloor").height() * Math.random(),
      $("#danceFloor").width() * Math.random(),
      Math.random() * 1000
    );
    $('#danceFloor').append(dancer.$node);
    window.dancers.push(dancer);
    Draggable.create($(".dancer"),{ edgeResistance:0.65, bounds:"#danceFloor", throwProps: false});

    var emitter = dancer.$node[0],
        //we'll put all the dots into this container so that we can move the "explosion" wherever we please.
        container = dancer.$node[0],
        //the following variables make things configurable. Play around.
        emitterSize = 100,
        dotQuantity = 30,
        dotSizeMax = 60,
        dotSizeMin = 10,
        speed = 1,
        gravity = 1;

    //just for this demo, we're making the emitter's size dynamic and we set xPercent/yPercent to -50 to accurately center it.
    //TweenLite.set(emitter, {width:emitterSize, height:emitterSize,top:100,left:100});

    //The "explosion" is just a TimelineLite instance that we can play()/restart() anytime. This helps ensure performance is solid (rather than recreating all the dots and animations every time the user clicks)
    var explosion = createExplosion(container);

    function createExplosion(container) {
      var tl = new TimelineLite(),
          angle, length, dot, i, size;
      //create all the dots
      for (i = 0; i < dotQuantity; i++) {
        dot = document.createElement("div");
        var $container = $(container);
        if($container.hasClass('bananaDancer')) {
          dot.className = 'bananaDot';
        } else if ($container.hasClass('nutDancer')) {
          dot.className = 'nutDot';
        } else if ($container.hasClass('jellyDancer')) {
          dot.className = 'jellyDot';
        }
        // dot.className = this;
        size = getRandom(dotSizeMin, dotSizeMax);
        container.appendChild(dot);
        angle = Math.random() * Math.PI * 2; //random angle
        //figure out the maximum distance from the center, factoring in the size of the dot (it must never go outside the circle), and then pick a random spot along that length where we'll plot the point.
        length = Math.random() * (emitterSize / 2 - size / 2);
        //place the dot at a random spot within the emitter, and set its size.
        TweenLite.set(dot, {
          x:Math.cos(angle) * length,
          y:Math.sin(angle) * length,
          width:size,
          height:size,
          force3D:true,
          left: (size-container.getAttribute('width'))/2.0,
          top: (size-container.getAttribute('height'))/2.0
        });
        //this is where we do the animation...
        tl.to(dot, 1 + Math.random(), {
          opacity:0,

          // physics2D:{
          //   angle:angle * 180 / Math.PI, //translate radians to degrees
          //   velocity:(100 + Math.random() * 250) * speed, //initial velocity
          //   gravity:500 * gravity //you could increase/decrease this to give gravity more or less pull
          // }

          //if you'd rather not do physics, you could just animate out directly by using the following 2 lines instead of the physics2D:
          x:Math.cos(angle) * length * 6,
          y:Math.sin(angle) * length * 6
        }, 0);
        tl.eventCallback('onComplete', function() {
          var parentNode = dot.parentNode;
          while(parentNode && parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
          }
        });
      }
      return tl;
    }

    //just pass this function an element and it'll move the explosion container to its center and play the explosion animation.
    function explode(element) {
      //var bounds = element.getBoundingClientRect();
      console.log(element)
      //TweenLite.set(container, {x:bounds.left + bounds.width / 2, y:bounds.top + bounds.height / 2});
      explosion.restart();
    }

    function getRandom(min, max) {
      return min + Math.random() * (max - min);
    }

    //explode initially, and then whenever the user presses on the dot.
    // explode(emitter);
    emitter.onmousedown = emitter.ontouchstart = function() {
      // explode(emitter);
      createExplosion(emitter);
    };


  });


  $(".lineUpButton").on("click", function(event){

    for(var i=0; i<window.dancers.length; i++) {
      var dancer = window.dancers[i];
      dancer.$node.css({'transform': 'none'});
      dancer.lineUp(i, window.dancers.length);
    }
  });

  $(".circleUpButton").on("click", function(event){

    for(var i=0; i<window.dancers.length; i++) {
      var dancer = window.dancers[i];
      var angle = Math.PI * 2 * i/window.dancers.length;

      var radius = Math.min($("#danceFloor").width(),$("#danceFloor").height()) / 2.0 *0.75;
      var xFromCenter = Math.cos(angle) * radius;
      var yFromCenter = Math.sin(angle) * radius;

      var absX = $("#danceFloor").width() / 2.0 - dancer.$node.width() * 0.5 + xFromCenter;
      var absY = $("#danceFloor").height() / 2.0 - dancer.$node.height() * 0.5 + yFromCenter;

      dancer.$node.animate({'top': absY, 'left':absX});
//      dancer.lineUp(i, window.dancers.length);
    }
  });

var cityImages = [
['sanFran', 'http://static1.squarespace.com/static/547f29bfe4b0dc192ed7bdac/54aeb15ce4b018c14f34c7cb/54aeb160e4b018c14f34c7ed/1420734817363/san-franc.jpg?format=2500w'],
['newYork', 'http://imgiy.com/wp-content/uploads/2015/05/new_york_1-1024x680.jpg'],
['chicago', 'http://www.socrata.com/wp-content/uploads/2014/06/chicago-dreary-bean-1.jpg'],
['tajMahal', 'https://taajmahal.files.wordpress.com/2014/01/taj-mahal2.jpg'],
['disney', 'http://images.forwallpaper.com/files/images/8/8e64/8e648d27/285258/night-lights-fireworks-disneyland.jpg'],
['beach', 'http://dreamatico.com/data_images/beach/beach-8.jpg']
];

// var slideShow = function() {
//   var imageIndex = 0;

//   var showImage = function() {
//     $('#danceFloor').fadeOut(300,function() {
//     $("#danceFloor").css({'background': "url(" + cityImages[imageIndex][1] + ") no-repeat center"});
//     $('#danceFloor').css({'background-size': ' cover'});

//     $("#danceFloor").fadeIn(300);
//   });
//     //$('body').css({'background': "url(" + cityImages[imageIndex][1] + ") no-repeat"});

//     imageIndex = (++imageIndex)%cityImages.length;
//     setTimeout(showImage, 8000);
//   };
//   showImage();
// };

// slideShow();

$('.addDancerButton').on('click', function() {
  Modal.open({
    content: '<div class="addDancer" data-dancer-maker-function-name="BananaDancer"><img src="http://i.stack.imgur.com/e8nZC.gif"></div>'+
    '<div class="addDancer" data-dancer-maker-function-name="JellyDancer"><img src="http://img-cache.cdn.gaiaonline.com/2380720abcdbb95c53fc0e108a563344/http://i715.photobucket.com/albums/ww160/shuajo0712/tumblr_le3eoaJ5EN1qazdhko1_500.gif"></div>'+
    '<div class="addDancer" data-dancer-maker-function-name="NutDancer"><img src="http://xenboards.ignimgs.com/external_data/attachments/100/100307-f45f7f3be5b571e233b04505e69a1e34.jpg"></div>',
    width: '50%', // Can be set to px, em, %, or whatever else is out there.
    // height: '50%',
    hideclose: true // Hides the close-modal graphic
    // closeAfter: 10 // Define this number in seconds.
  });
});

});

