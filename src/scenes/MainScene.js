import Player from '../entities/Player.js';
import Environment from '../environment/Environments.js';
import Enemy from '../entities/Enemy.js';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.image('player', 'src/assets/player.jpg');
        this.load.image('ground', 'src/assets/road-background.jpg');
        this.load.image('background', 'src/assets/sky-background.jpg');
    }

    create() {
        // ✅ Set Background
        this.cameras.main.setBackgroundColor('#87CEEB');
        this.add.image(0, 0, 'background').setDisplaySize(256, 224).setOrigin(0, 0);
    
        // ✅ Setup Environment (Ensures ground is created before player)
        this.environment = new Environment(this);
    
        // ✅ Create the player AFTER the ground is ready
        this.player = new Player(this, 50, this.environment.groundHeight - 50); // Adjusted spawn position
        // ✅ Spawn Enemy
        this.enemy = new Enemy(this, 300, this.environment.groundHeight - 50); // Place on ground

        // ✅ Ensure the player collides with the ground (only once!)
        if (this.environment.ground && this.environment.ground.getChildren().length > 0) {
            this.physics.add.collider(this.player.sprite, this.environment.ground);
        } else {
            console.error("Ground is not initialized correctly!");
        }
    
        // ✅ Ensure collision with obstacles
        if (this.environment.obstacle) {
            this.physics.add.collider(this.player.sprite, this.environment.obstacle);
        }
    
        // ✅ Now we can make the camera follow the player
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
    
        // ✅ Enable Keyboard Input
        this.cursors = this.input.keyboard.createCursorKeys();
    // ✅ Create an array to store multiple enemies
        this.enemies = [];

        // ✅ Define enemy spawn locations (adjust based on your level)
        const enemyPositions = [700, 1100, 1500, 1900, 2300]; // X positions for enemies
            // ✅ Spawn multiple enemies
        enemyPositions.forEach(x => {
        let enemy = new Enemy(this, x, this.environment.groundHeight - 50);
        this.enemies.push(enemy); // Store enemy in array
    });
    }
    
    update() {
        // ✅ Move player update logic here instead of `create()`
        if (this.player) {
            this.player.update();
        }
        this.enemies.forEach(enemy => enemy.update());
    }
    
    enterVerticalSection() {
        console.log("Entered vertical section");
        this.cameras.main.stopFollow(); // Stop automatic horizontal tracking
        this.cameras.main.setLerp(0, 0.1); // Allow vertical smooth movement only
        this.inVerticalSection = true;
    }
    
    exitVerticalSection() {
        console.log("Exited vertical section");
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1); // Resume normal tracking
        this.inVerticalSection = false;
    }
        
}
