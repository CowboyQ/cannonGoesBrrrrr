var Plain = function() {

    var object = new THREE.Object3D()

    createPlain = function () {
        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 0));
        geometry.vertices.push(new THREE.Vector3(10, 0, 10));
        geometry.vertices.push(new THREE.Vector3(0, 0, 10));
        geometry.vertices.push(new THREE.Vector3(0, 0, 0));
        var line = new THREE.Line(geometry, lineMaterial);
        var lineClone = line.clone() 
        object.add(lineClone)
    }
    createPlain()
    this.create = function () {
        return object
    }

}