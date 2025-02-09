export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'enemy'); // Add enemy sprite
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setGravityY(1875); // Match player gravity
        this.sprite.setVelocityX(100); // Move right by default
        this.sprite.setBounce(0);
        this.sprite.setSize(30, 30);

        // ✅ Add Collider With Ground
        scene.physics.add.collider(this.sprite, scene.environment.ground);

        // ✅ Check for Player Collision
        scene.physics.add.overlap(this.sprite, scene.player.sprite, this.handlePlayerCollision, null, this);
    }

    update() {
        if (!this.sprite.body.blocked.down) {
            this.sprite.setVelocityX(this.sprite.body.velocity.x * -1); // Reverse direction at edges
        } else if (this.sprite.body.blocked.left || this.sprite.body.blocked.right) {
            this.sprite.setVelocityX(this.sprite.body.velocity.x * -1); // Turn when hitting walls
        }
    }

    handlePlayerCollision(player, enemy) {
        console.log("Player hit enemy! Game over.");
        this.scene.player.gameOver();
    }
}
