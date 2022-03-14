var Main = function(client, player) {

    /*
        zmienna prywatna widoczna tylko w tej funkcji (klasie)
    */

    var camx = 0
    var camy = 70
    var camz = -1000
    var camera
    var scene
    var renderer
    var cannon1
    var angle = parseInt(document.getElementById("angle").value)
    var bullet1
    var speed = 100
    var boom = false
    var t = 0
    var lufapos
    var plain
    var odrzutbool = false
    var odrzutlicz = 0
    var shaker = false

    function initEngine() {
        var szerokosc = window.innerWidth
        var wysokosc = window.innerHeight
        var fov = 45
        var res = 4 / 3
        var minrender = 0.1
        var maxrender = 10000
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            fov,
            res,
            minrender,
            maxrender
            );
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setSize(szerokosc, wysokosc);
    }
    function initObjects() {
        var axis = new THREE.AxisHelper(500);
        scene.add(axis);
        document.getElementById("plansza").appendChild(renderer.domElement);
        camera.position.x = camx;
        camera.position.y = camy;
        camera.position.z = camz;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        for (var i = -30; i < 30; i++) {
            for (var j = -30; j < 30; j++) {
                var plain = new Plain()
                plain = plain.create()
                scene.add(plain)
                plain.position.x = i * 10
                plain.position.z = j * 10
            }
        }
    }
    function initBullet() {
        scene.remove(bullet1)
        bullet1 = new Bullet()
        bullet1 = bullet1.create()
        scene.add(bullet1)
        bullet1.position.y = 35
        bullet1.position.z = 20
    }
    function initCannon() {
        scene.remove(cannon1)
        cannon1 = new Cannon()
        cannon1 = cannon1.create()
        scene.add(cannon1)
    }
    function animateScene() {
        if (boom) {
            if (player == 1) {
                bullet1.position.x = speed * t * cannon1.getWorldDirection().x
                bullet1.position.y = speed * t * Math.sin(angle) - ((9.8105 * t * t) / 2)
                bullet1.position.z = speed * t * cannon1.getWorldDirection().z
                t += 0.1
                if (odrzutbool) {
                    var odrzutvector = new THREE.Vector3(0, 0, -40)
                    var armPos = odrzutvector.applyMatrix4(cannon1.matrixWorld);
                    cannon1.position.x = armPos.x
                    cannon1.position.y = armPos.y
                    cannon1.position.z = armPos.z
                    odrzutbool = false
                }
                else {
                    if (odrzutlicz <= 40) {
                        var odrzutvector = new THREE.Vector3(0, 0, 1)
                        var armPos = odrzutvector.applyMatrix4(cannon1.matrixWorld);
                        cannon1.position.x = armPos.x
                        cannon1.position.y = armPos.y
                        cannon1.position.z = armPos.z
                        odrzutlicz++
                    }
                }
                if (bullet1.position.y < -50) {
                    shaker = true
                }
                if (shaker) {
                    var shaking = Math.random() * 0.05
                    camera.rotation.z = Math.PI + shaking
                    setTimeout(function () {
                        shaker = false
                        boom = false
                        odrzutlicz = 0
                        camera.rotation.z = Math.PI
                        t = 0
                        scene.remove(bullet1)
                        initBullet()
                        var theta = (document.getElementById("turn").value) * (Math.PI / 180)
                        var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
                        bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
                        bullet1.position.y = 30 * Math.sin(theta2) + 15
                        bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
                    }, 500)
                }
                client.emit("shotdata", {
                    bulletx: bullet1.position.x,
                    bullety: bullet1.position.y,
                    bulletz: bullet1.position.z,
                    camerarot: camera.rotation.z,
                    cannonx: cannon1.position.x,
                    cannony: cannon1.position.y,
                    cannonz: cannon1.position.z
                })
            }
        }
        client.emit("boom", {
            boom: boom
        })
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
        requestAnimationFrame(animateScene);
    }
    document.getElementById("turn").oninput = function () {
        if (player == 1) {
            scene.remove(cannon1)
            cannon1 = new Cannon()
            var cannon12 = cannon1
            angle = parseInt(document.getElementById("angle").value) * (Math.PI / 180)
            cannon1 = cannon1.rotatelufa((Math.PI / 2) - angle)
            cannon1 = cannon12.rotatearmata(parseInt(document.getElementById("turn").value) * Math.PI / 180)
            var theta = (document.getElementById("turn").value) * (Math.PI / 180)
            var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
            bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
            bullet1.position.y = 30 * Math.sin(theta2) + 15
            bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon1)
            client.emit("positiondata", {
                theta: theta,
                theta2: theta2,
                angle: angle
            })
        }
    }
    document.getElementById("angle").oninput = function () {
        if (player == 1) {
            scene.remove(cannon1)
            cannon1 = new Cannon()
            var cannon12 = cannon1
            angle = parseInt(document.getElementById("angle").value) * (Math.PI / 180)
            cannon1 = cannon1.rotatelufa((Math.PI / 2) - angle)
            cannon1 = cannon12.rotatearmata(parseInt(document.getElementById("turn").value) * Math.PI / 180)
            var theta = (document.getElementById("turn").value) * (Math.PI / 180)
            var theta2 = (document.getElementById("angle").value) * (Math.PI / 180)
            bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
            bullet1.position.y = 30 * Math.sin(theta2) + 15
            bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon1)
            client.emit("positiondata", {
                theta: theta,
                theta2: theta2,
                angle: angle
            })
        }
    }

    this.updateCannon = function (angle, theta, theta2) {

            scene.remove(cannon1)
            cannon1 = new Cannon()
            var cannon12 = cannon1
            cannon1 = cannon1.rotatelufa((Math.PI / 2) - angle)
            cannon1 = cannon12.rotatearmata(theta)
            bullet1.position.x = 30 * Math.cos(theta2) * Math.sin(theta)
            bullet1.position.y = 30 * Math.sin(theta2) + 15
            bullet1.position.z = 30 * Math.cos(theta2) * Math.cos(theta)
            scene.add(cannon1)
        
    }

    this.updateShot = function (bulletx, bullety, bulletz, camerarot, cannonx, cannony, cannonz) {

            bullet1.position.x = bulletx
            bullet1.position.y = bullety
            bullet1.position.z = bulletz
            camera.rotation.z = camerarot
            cannon1.position.x = cannonx
            cannon1.position.y = cannony
            cannon1.position.z = cannonz
        
    }
    this.comeback = function (boomer) {
        camera.rotation.z = Math.PI
    }
    document.getElementById("boom").onclick = function () {
        boom = true
        odrzutbool = true
    }

    initEngine()
    initObjects()
    initBullet()
    initCannon()
    animateScene()

}