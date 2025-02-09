export default class Environment {
    constructor(scene) {
        this.scene = scene;

        // ✅ Set World Bounds for Large Levels
        this.scene.physics.world.setBounds(0, 0, 5120, 1000);

        // ✅ Create a Ground Group (Ensures it is a valid physics group)
        this.ground = this.scene.physics.add.staticGroup();

        // ✅ Define Ground Properties
        const groundHeight = this.scene.physics.world.bounds.height - 50;
        const groundWidth = 128; // Tile size
        const groundThickness = 50; // Tile height
        const numTiles = Math.floor(5120 / groundWidth); // Total ground tiles

for (let i = 0; i < numTiles; i++) {
    let isGap = Math.random() < 0.20; // ✅ Use `let` so we can modify it later

    // Ensure the first 5 tiles are always solid
    if (i < 5) {
        isGap = false;
    }

    if (!isGap) {
        let groundTile = this.scene.add.rectangle(i * groundWidth, groundHeight, groundWidth, groundThickness, 0x654321);
        this.scene.physics.add.existing(groundTile, true); // ✅ Convert to static physics object
        this.ground.add(groundTile); // ✅ Add it to the ground group
    }
}
        // ✅ Create an Invisible Death Zone Below the Screen
        this.deathZone = this.scene.physics.add.staticImage(2560, groundHeight + 800, null)
        .setSize(5120, 50)
        .setAlpha(0.5) // ❗ Temporarily make it visible (set to 0 later)
        .setOrigin(0.5);

        
        // ✅ Set Ground Height for Player Spawning
        this.groundHeight = groundHeight - 50;
    }
}
