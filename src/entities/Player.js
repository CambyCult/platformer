export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        // ✅ Ensure Physics Body Exists
        this.sprite.setCollideWorldBounds(false);
        // Set Physics Properties

        this.sprite.setDragX(600); // Deceleration
        this.sprite.setMaxVelocity(300, 400); // Run speed & terminal velocity

        // Movement & Jumping Variables
        this.isJumping = false;
        this.jumpBufferTime = 0;
        this.coyoteTime = 0;

        // Input Handling
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.runKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT); // Run button

        // Setup Collision Handling
        scene.physics.add.collider(this.sprite, scene.enemies, this.handlePlayerEnemyCollision, null, this);
    }
    
    handlePlayerEnemyCollision(player, enemy) {
        this.gameOver();
    }

    gameOver() {
        console.log("Game Over!");
        this.scene.scene.restart();
    }
    
    update(time, delta) {


        
        const { left, right, up } = this.cursors;
        const isTouchingGround = this.sprite.body.touching.down;
        const isRunning = this.runKey.isDown; // ✅ Detect if Shift is held
        // ✅ Kill player if they fall too far
        if (this.sprite.y > this.scene.physics.world.bounds.height + 100) {
            console.log("Player fell off the map! Game over.");
            this.gameOver();
        }

        // Coyote Time: Allows jump slightly after falling
        if (isTouchingGround) {
            this.coyoteTime = 100; // 100ms window to still jump
        } else if (this.coyoteTime > 0) {
            this.coyoteTime -= delta;
        }

        // Jump Buffer: Allows jump if pressed just before landing
        if (up.isDown) {
            this.jumpBufferTime = 150; // 150ms jump buffer
        } else if (this.jumpBufferTime > 0) {
            this.jumpBufferTime -= delta;
        }

        // Running Mechanics
        let moveSpeed = this.runKey.isDown ? 250 : 150; // Faster when holding shift

        // Movement Logic
        if (left.isDown) {
            this.sprite.setAccelerationX(-1000);
            this.sprite.setMaxVelocity(moveSpeed, 800);
        } else if (right.isDown) {
            this.sprite.setAccelerationX(1000);
            this.sprite.setMaxVelocity(moveSpeed, 800);
        } else {
            this.sprite.setAccelerationX(0);
            this.sprite.setDragX(600);
        }

        // Jump Logic
        if (this.jumpBufferTime > 0 && this.coyoteTime > 0) {
            this.sprite.setVelocityY(isRunning ? -1000 : -650); // Initial jump power
            this.isJumping = true;
            this.jumpBufferTime = 0;
            this.coyoteTime = 0;
        }

        // Variable Jump: Release jump early to cut height
        if (up.isUp && this.isJumping && this.sprite.body.velocity.y < 0) {
            this.sprite.setVelocityY(this.sprite.body.velocity.y * 0.5);
            this.isJumping = false;
        }

        // Wall Jumping Variables
        let isTouchingWall = this.sprite.body.blocked.left || this.sprite.body.blocked.right;

        if (isTouchingWall && !isTouchingGround) {
            this.coyoteTime = 100; // Extend coyote time on walls
        }

        // Wall Jump: Press jump while on a wall
        if (up.isDown && isTouchingWall) {
            this.sprite.setVelocityY(-400); // Jump power
            if (this.sprite.body.blocked.left) {
                this.sprite.setVelocityX(200); // Push off to the right
            } else {
                this.sprite.setVelocityX(-200); // Push off to the left
            }
            this.isJumping = true;
        }
    }
}
