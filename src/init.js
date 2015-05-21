$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
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
        dot.className = "dot";
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
           xPercent:-50,
           yPercent:-50,
          force3D:true
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
      explode(emitter);
    }


  });


  $(".lineUpButton").on("click", function(event){

    for(var i=0; i<window.dancers.length; i++) {
      var dancer = window.dancers[i];
      dancer.lineUp(i, window.dancers.length);
    }
  });



});

