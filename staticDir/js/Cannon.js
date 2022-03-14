var Cannon = function (scene) {
    var object = new THREE.Object3D()
    var mesh3
    function init() {
        var geometry = new THREE.CylinderGeometry(15, 15, 5, 18);
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ffff, side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh(geometry, material)
        mesh.rotateX(Math.PI / 2)
        mesh.rotateZ(Math.PI / 2)
        mesh.position.x = 7
        object.add(mesh)

        var mesh2 = new THREE.Mesh(geometry, material)
        mesh2.rotateX(Math.PI / 2)
        mesh2.rotateZ(Math.PI / 2)
        mesh2.position.x = -7
        object.add(mesh2)

        var geometry2 = new THREE.CylinderGeometry(5, 5, 50, 18);
        var material3 = new THREE.MeshBasicMaterial({
            color: 0x00ff00, side: THREE.DoubleSide
        });
        mesh3 = new THREE.Mesh(geometry2, material3)
        mesh3.rotateX(Math.PI / 4)
        mesh3.position.y = 15
        object.add(mesh3)
    }
    init()
    this.create = function () {
        return object
    }
    this.rotatelufa = function (angle) {
        mesh3.rotation.x = angle
        return object
    }
    this.rotatearmata = function (angle) {
        object.rotation.y = angle
        return object
    }
}