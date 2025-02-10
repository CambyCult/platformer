export default class Environment {
    constructor(scene) {
        this.scene = scene;

        // ✅ Set World Bounds for Large Levels
        this.scene.physics.world.setBounds(0, 0, 5120, 1000);

        // ✅ Define Ground Properties
        const groundHeight = this.scene.physics.world.bounds.height - 32; // Lower by half for better alignment
        const groundWidth = 5120; // Total width of the ground
        // const groundThickness = 64; // Height matches the tile size

        // ✅ Create a repeating tileSprite but prevent vertical tiling
        this.ground = this.scene.add.tileSprite(groundWidth / 2, groundHeight, groundWidth, 64, 'groundTile'); // Keep height at 64

        // ✅ Ensure only horizontal tiling
        this.ground.setTileScale(2, 1); // Scale width (2x) but keep height normal

        // ✅ Convert to Physics Object
        this.scene.physics.add.existing(this.ground, true);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;


        // ✅ Convert to Physics Object
        this.scene.physics.add.existing(this.ground, true);

        // ✅ Set Ground Physics Properties
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        // ✅ Create an Invisible Death Zone Below the Screen
        this.deathZone = this.scene.physics.add.staticImage(2560, groundHeight + 800, null)
            .setSize(5120, 50)
            .setAlpha(0.5) // ❗ Temporarily visible for debugging
            .setOrigin(0.5);

        // ✅ Set Ground Height for Player Spawning
        this.groundHeight = groundHeight - 50;
    }
}
