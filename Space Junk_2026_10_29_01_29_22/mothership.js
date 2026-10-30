class Mothership {
  static WIDTH = 50;
  static HEIGHT = 20;
  static PICKUP_DIAMETER = Mothership.WIDTH * 1.2;
  static CORNER_RADIUS = 8;
  static NUM_PORTHOLES = 4;
  static PORTHOLE_DIAMETER = 6;

  physics;

  constructor() {
    this.physics = new Physics();
  }

  draw() {
    push();
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        Mothership.drawMothership({ rotation: this.physics.rotation });
        if (game.debug) {
          this.physics.draw();
          noFill();
          stroke("#fff");
          circle(0, 0, Mothership.PICKUP_DIAMETER);
        }
      },
    });
    pop();
  }

  /**
   * Draws the Mothership's shape around (0, 0). Assumes the caller has
   * already moved the transform to wherever the Mothership should appear.
   **/
  static drawMothership({rotation}) 
  {
    push();

  // Rotate the entire Mothership
  rotate(rotation);

  // Draw the main body
  rectMode(CENTER);
  noStroke();
  fill("#9CA3AF");
  rect(0,0,Mothership.WIDTH,Mothership.HEIGHT,Mothership.CORNER_RADIUS);

  // Draw the portholes
  fill("#38BDF8");
    
  const spacing = Mothership.WIDTH / Mothership.NUM_PORTHOLES;

  for (let i = 0; i < Mothership.NUM_PORTHOLES; i++)
  {
    const x = -Mothership.WIDTH / 2 + spacing * (i + 0.5);
    circle(x,0,Mothership.PORTHOLE_DIAMETER);
  }
  pop();
  }

  move(delta)
  {
    this.physics.move(delta, { constrain: true });
  }
}
