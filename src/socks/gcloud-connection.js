    // const { spawn } = require("child_process");
var options = {
    tcp: true,       // false for UDP, true for TCP (default true)
    challenge: false  // true to use the challenge protocol (default true)
};
const rcon = require("rcon")

let conn = new rcon('localhost', "25575", "minecraft")
let playerNum = 0;

conn.on('auth', function() {
    console.log("Authed!");
    conn.send("list")
}).on('response', function(str) {
    console.log("Got response: " + str);
    let tempNum = str.split(' ')
    console.log(tempNum)
    playerNum = tempNum[2]
    console.log(playerNum)
}).on('end', function() {
    console.log("Socket closed!");
    process.exit();
});

conn.connect();


// const login = spawn("gcloud.cmd", ["container", "clusters", "get-credentials", "cluster-1", "--zone", "us-central1-c", "--project", "hackathon2020-292800"])
// // const login = spawn("gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project hackathon2020-292800")
//
// login.stdout.on('data', (data) => {
//     console.log(data.toString())
// })
//
// login.stderr.on('data', (data) => {
//     console.error(data.toString());
// })
//
// login.on('exit', (code) => {
//     console.log(`Child exited with code ${code}`);
// })
//
// const  getServices = spawn("kubectl", ["get", "svc","-o", "json"])
//
// getServices.stdout.on('data', (data) => {
//     console.log(data.toString())
//     let services = JSON.parse(data.toString())
//     console.log(services)
// })
//
// getServices.stderr.on('data', (data) => {
//     console.error(data.toString());
// })
//
// getServices.on('exit', (code) => {
//     console.log(`Child exited with code ${code}`);
// })
//
// const login = spawn("gcloud.cmd", ["container", "clusters", "get-credentials", "cluster-1", "--zone", "us-central1-c", "--project", "hackathon2020-292800"])
// const  getServices = spawn("kubectl", ["get", "svc","-o", "json"])
// const  getPods = spawn("kubectl", ["get", "pods","-o", "json"])
//     getPods.stdout.on('data', (data) => {
//         console.log(data.toString())
//         let services = JSON.parse(data.toString())
//         console.log(services)
//     })
//
//     getPods.stderr.on('data', (data) => {
//         console.error(data.toString());
//     })
//
//     getPods.on('exit', (code) => {
//         console.log(`Child exited with code ${code}`);
//     })
// const  exposePod = spawn("kubectl", ["expose", "pod","{{Pod Name}}", "type=LoadBalancer"])
// const scaleUpSet = spawn("kubectl", ["scale", "sts", "minecraft-server-set", "--replicas={replica_number}"])
// const scaleDownSet = spawn("kubectl", ["patch", "sts", "minecraft-server-set", "-p", "\'{\"spec\":{\"replicas\":3}}\'"])
// //

