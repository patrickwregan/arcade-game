
// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images


    this.sprite = 'images/enemy-bug.png';
    Resources.load(this.sprite);

    // randomly generate a position from
    // offscreen to at the lhs of the screen for the bugs

    this.x = Math.floor((Math.random()*4))*-80;
    /*
      I added a y parameter to guarantee that there is one
      and only one bug on each of the three stone block rows
    */
    this.y = y;

    // set the speed of x to a randomly generated number
    // from 60 to 110
    this.speed = Math.floor((Math.random()*6 + 1))*10 + 50;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    // if the bug has reached to rhs of the screen,
    // bring it back to the lhs and
    // randomize speed again
    if(this.x >= 505)
    {
      this.x = 0;
      this.speed = Math.floor((Math.random()*6 + 1))*10 + 50;
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

  this.sprite = 'images/char-pink-girl.png';
  Resources.load(this.sprite);

  /*
    I set the player to be above the bottom of the
    screen due to extra features I added which require
    use of the space along the bottom of the screen
  */
  this.x = 202;
  this.y = 345;
  this.speed = 15;
  /*
    stay is needed to keep player from moving continously
    since there is no action taken on stay the player does not move
  */
  this.key_code = 'stay';

  this.powered_up = false; // determines whether player has gotten a heart
}

Player.prototype.update = function(dt) {

  /*
    dt is undefined so I am not using it.

    this.key_code is either been pressed or it has not
    If it has been pressed it will be of left, right, up or down
    there is an if clause for all of these.

    At the end of each if clause this.key_code is changed to 'stay'
    so that the player character does not keep moving.
  */


    if(this.key_code == 'left') {

      // collided with lhs of screen?
      if(!(this.x <= 0))
      {

        this.x -= this.speed;

      }
      this.key_code = 'stay';

    }
    else if(this.key_code == 'right')
    {
      // collided with rhs of screen?
      if(!(this.x >= 410))
      {

        this.x += this.speed;
      }
      this.key_code = 'stay';
    }
    else if(this.key_code == 'up')
    {
      // The player never gets to the upper part of the
      // screen due to the water so I don't need to
      // check for a collision here
      this.y -= this.speed;
      this.key_code = 'stay';
    }
    else if(this.key_code == 'down')
    {
      // collided with bottom of screen?
      // note bottom of screen is above
      // score display area
      if(!(this.y >= 345))
      {

        this.y += this.speed;
      }
      this.key_code = 'stay';
    }
    else
    {

      this.key_code = 'stay';
    }
}


Player.prototype.render = function (){

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


Player.prototype.handleInput = function(key_code)  {


  this.key_code = key_code;
}


/*
  this class indicates the current score
  the score ranges from 0 keys to 5 keys
  on reaching 5 keys the player wins.
*/
var Key = function() {
  this.sprite = 'images/Key.png';
  Resources.load(this.sprite);
  this.is_displayed = false;
}

Key.prototype.update = function(dt)
{

  // noop

}


Key.prototype.render = function() {

  if(this.is_displayed)
  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array(new Enemy(60), new Enemy(145), new Enemy(225));
var player = new Player();
var allKeys = new Array(new Key(), new Key(), new Key(), new Key(), new Key());


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
