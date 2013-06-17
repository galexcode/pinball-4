$(document).ready(function() {
    game = new Game(400,600);
    game.start();
});

Game = function(width, height)
{
    gameField = new Field(width, height);
    ball = new Ball(100, 100, 10);

    this.start = function()
    {
        setInterval(update, 20);
        //this.draw();
    }

    function update()
    {
        ball.update();
    }
    
    function Ball(x, y, radius)
    {
        this.position = $V([x,y]);
        this.speed = $V([0,0]);
        this.radius = radius;
        this.ro=0.1;
        this.mass = Math.PI * this.radius * this.radius * this.ro;
        this.circle = gameField.paper.circle(this.position.e(1), this.position.e(2), this.radius);
        this.gravity = $V([0,8]);

        this.update = function(paper)
        {
            // this.speed = $V([0,0]);
            this.speed = this.speed.multiply(0.85);
            this.gravity = this.gravity.add($V([0,1]));
            this.speed = this.speed.add(this.gravity);
            this.speed = this.speed.multiply(1/this.mass);
            if(this.position.e(2) >= gameField.realHeight)
            {
                this.speed = this.speed.multiply(-1);
                this.gravity = $V([0,0])
            }
            console.log(this.speed.modulus());
            this.position = this.position.add(this.speed);
            this.circle.attr('cx', this.position.e(1));
            this.circle.attr('cy', this.position.e(2));
        }
    }
}

Field = function(rWidth, rHeight)
{
    this.realWidth = rWidth;
    this.realHeight = rHeight;
    this.paper = Raphael(10, 50, this.realWidth, this.realHeight);
    this.fieldArray = [];
}