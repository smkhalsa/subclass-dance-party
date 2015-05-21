describe("bananaDancer", function() {

  var bananaDancer;
  var timeBetweenSteps = 100;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    bananaDancer = new BananaDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function(){
    expect(bananaDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a step function that makes its node blink", function() {
    sinon.spy(bananaDancer.$node, 'toggle');
    bananaDancer.step();
    expect(bananaDancer.$node.toggle.called).to.be.true;
  });

  describe("dance", function(){
    it("should call step at least once per second", function(){
      sinon.spy(bananaDancer, "step");
      expect(bananaDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps);

      expect(bananaDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(bananaDancer.step.callCount).to.be.equal(2);
    });
  });
});
