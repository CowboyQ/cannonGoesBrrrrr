var http = require("http");
var fs = require("fs");
var server = http.createServer(function (request, response) {
    switch (request.method) {
        case "GET":
            if (request.url === "/index.html") {
                fs.readFile("staticDir/index.html", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/Main.js") {
                fs.readFile("staticDir/js/Main.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/Cannon.js") {
                fs.readFile("staticDir/js/Cannon.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/Bullet.js") {
                fs.readFile("staticDir/js/Bullet.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/js/Plain.js") {
                fs.readFile("staticDir/js/Plain.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else if (request.url === "/libs/three.js") {
                fs.readFile("staticDir/libs/three.js", function (error, data) {
                    response.writeHead(200, { 'Content-Type': 'application/javascript' });
                    response.write(data);
                    response.end();
                })
            }
            else {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.write("<h1>404 - brak takiej strony</h1>");
                response.end();

            }
            break;
    }
})

server.listen(3000);
var socketio = require("socket.io")
var io = socketio.listen(server)
var clientcount = 0
io.sockets.on("connection", function (client) {
    console.log("klient sie podłączył" + client.id)
    clientcount++
    if (clientcount > 2) {
        clientcount = 1
    }
    client.emit("onconnect", {
        ilosc: clientcount
    })
    client.on("positiondata", function (data) {
        client.broadcast.emit("angle", { angle: data.angle, theta: data.theta, theta2: data.theta2 });
    })
    client.on("shotdata", function (data) {
        client.broadcast.emit("takingshot", { bulletx: data.bulletx, bullety: data.bullety, bulletz: data.bulletz, camerarot: data.camerarot, cannonx: data.cannonx, cannony: data.cannony, cannonz: data.cannonz});
    })
    client.on("boom", function (data) {
        client.broadcast.emit("boom", { boom: data.boom});
    })
    client.on("disconnect", function () {
        console.log("klient się rozłącza")
    })

})
console.log("serwer startuje na porcie 3000 - ten komunikat zobaczysz tylko raz")
