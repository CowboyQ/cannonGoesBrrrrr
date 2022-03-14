var Bullet = function(x,y,z) {
    
    var obj = new THREE.Object3D()
    function init() {
        var geometry = new THREE.SphereGeometry(5, 32, 32);
        var material = new THREE.MeshBasicMaterial({
            color: 0xffff00, side: THREE.DoubleSide
        });
        bullet = new THREE.Mesh(geometry, material)
        bullet.rotateX(Math.PI / 2)
        bullet.rotateZ(Math.PI / 2)
        obj.add(bullet)
    }
    init()
    this.create = function () {
        return obj
    }
}