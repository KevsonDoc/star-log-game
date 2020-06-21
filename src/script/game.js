    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        }
    };
    var game = new Phaser.Game(config);
    var catapimbas;
    var player;
    var asteroid;
    var vida = 200;
    var vida2 = 200;
    var boolea = false;
    var vida3;
    var controls = {};
    var spaceBar;
    var info;

    var status = false;

    function preload() {
        this.load.image('galaxia1', '/world/galaxia1.png');
        this.load.image('laser', '/world/phaser.png')
        this.load.image('bomb', '/world/bomb.png');
        this.load.spritesheet('dude', '/world/USSamazonia.png', {
            frameWidth: 60,
            frameHeight: 60
        });
        this.load.spritesheet('delta', '/world/elemento_1.png', {
            frameWidth: 90,
            frameHeight: 100
        })
        this.load.spritesheet('explosao', '/world/Explosion.png', {
            frameWidth: 96,
            frameHeight: 96
        })
    }
    function create() {
        // Insere a as imagensn do jogo como nave asteroid e fundo
        this.add.image(400, 300, 'galaxia1');
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setCollideWorldBounds(true);
        //bombs
        bombs = this.physics.add.group();
        var bomb = [10];
        for (var i = 0; i < 10; i++) {
            var a = Math.floor(Math.random() * 400 + 150);
            var b = Math.floor(Math.random() * 400 + 150);
            bomb[i] = bombs.create(a, b, 'bomb');
            bomb[i].setCollideWorldBounds(true);
            for (var a = Math.floor(Math.random() * 10 + 1); a < 10; a++) {
                bomb[a] = bombs.setVelocityY(Math.floor(Math.random() * 150 + 600));
                bomb[a] = bombs.setVelocityX(Math.floor(Math.random() * 500 + 800));
                bomb[a] = bombs.setVelocityY(Math.floor(Math.random() * -400 + 1000));
                bomb[a] = bombs.setVelocityX(Math.floor(Math.random() * -500 + 650));
            }
        }
        //asteroid
        asteroid = this.physics.add.sprite(100, 100, 'delta');
        asteroid.body.immovable = true;
        asteroid.setCollideWorldBounds(true);
        asteroid.setVelocityX(280);
        asteroid.setBounce(Phaser.Math.FloatBetween(1, 1));
        //Reação de colisão
        /*bombs.children.iterate(function(child) {
            child.setBounce(Phaser.Math.FloatBetween(1, 1));
        });*/
        bombs.children.iterate(function(chil) {
            chil.setBounce(Phaser.Math.FloatBetween(0.9, 0.5));
        });
        //Animação da explosão
        this.anims.create({
            key: 'explo',
            frames: this.anims.generateFrameNumbers('explosao', {
                start: 0,
                end: 13
            }),
            frameRate: 10,
        });
        vida3 = this.add.text(16, 16, 'VIDA ASTEROID: ' + vida, {
            fontSize: '32px',
            fill: '#8B0000'
        });

    }

    var jahfoi = false;

    function update() {
        this.input.keyboard.on('keydown-W', () => {
            player.setVelocityY(-1000);
        });

        this.input.keyboard.on('keyup-W', () => {
            player.setVelocityY(0);
        })
        
        this.input.keyboard.on('keydown-A', () => {
            player.setVelocityX(-1000);
        });

        this.input.keyboard.on('keyup-A', () => {
            player.setVelocityX(0);
        });

        this.input.keyboard.on('keydown-D', () => {
            player.setVelocityX(1000);
        });

        this.input.keyboard.on('keyup-D', () => {
            player.setVelocityX(0);
        });

        this.input.keyboard.on('keydown-S', () => {
            player.setVelocityY(1000);
        });

        this.input.keyboard.on('keyup-S', () => {
            player.setVelocityY(0);
        });

        var scene = this;
        /*Primeiro construo a fuunção de mouse para o click 
        JAHFOI recebe falso para o mouse não disparar varios eventos
        linha 101 carrega a animação do laser e pposiciona nas cordenadas
        do jogador
        Linha 102 dispara a animação na velocidade indicada
        jahfoi recebe true para disparar apenas 1 click de evento
        */
        this.input.on('pointerdown', function(pointer) {
            if (jahfoi)
                return;
            catapimbas = scene.physics.add.sprite(player.x, player.y, 'laser');
            catapimbas.setVelocityY(-1000);
            jahfoi = true;
        });
        /*jhafoi recebe false para zerar o click do evento fazendo com 
        se dispare apenas um laser po vez*/
        this.input.on('pointerup', function(pointer) {
            jahfoi = false;
        });
        //asteroid.setVelocityX(400);
        this.physics.add.collider(asteroid, catapimbas, coletar, null, scene);
        function coletar(asteroid, catapimbas) {
            if (boolea == false) {
                vida = vida - 20;
                vida3.setText('VIDA ASTEROID: ' + vida);
                if (vida == 0) {
                    boolea = true;
                    asteroid.anims.play('explo', true);
                    var vitoria = this.add.text(150, 250, 'VITÓRIA', {
                        fontSize: '90px',
                        fill: '#00008B'
                    });
                    this.physics.pause();
                }
                catapimbas.disableBody(true, true);
            }
        }
                //Vida do jogador e colisão com bombas
        this.physics.add.collider(player, bombs, colisao, null, scene);
        function colisao(player, bomb) {
            player.anims.play('explo', true);
            vida2 = vida2 - 200;
            if (vida2 == 0) {
                this.physics.pause();
                var gameOver = this.add.text(150, 250, 'Game Over', {
                    fontSize: '90px',
                    fill: '#8B0000'
                });
                gameOver.setText('Game Over');
                this.physics.pause();
            }
        }
    }
