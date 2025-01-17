namespace L09_Asteroids {

    export class Asteroid extends Moveable {
        position: Vector;
        velocity: Vector;
        type: number;
        size: number;

        constructor(_size: number, _position?: Vector) {
            super(_position);

            console.log("Asteroid constructor");

            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);

            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }

        draw(): void {
            //console.log("Astroid draw");
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);
            crc2.lineWidth = linewidth / this.size;
            crc2.stroke(asteroidPaths[this.type]);
            crc2.restore();
        }

        isHit(_hotspot: Vector): boolean {
           let hitSize: number = 50 * this.size;
           let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y); 
           return (Math.abs(difference.x) < hitSize && Math.abs(difference.y) < hitSize);
        }
    }

}