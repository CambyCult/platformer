import MainScene from './scenes/MainScene.js';

const config = {
    type: Phaser.AUTO,
    width: 256 * 3,  // Scale 3x for visibility (768 px)
    height: 224 * 3, // Scale 3x for visibility (672 px)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1875 },
            debug: true
        }
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);
