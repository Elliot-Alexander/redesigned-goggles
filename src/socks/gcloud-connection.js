const { spawn } = require("child_process");

const login = spawn("gcloud.cmd", ["container", "clusters", "get-credentials", "cluster-1", "--zone", "us-central1-c", "--project", "hackathon2020-292800"])
// const login = spawn("gcloud container clusters get-credentials cluster-1 --zone us-central1-c --project hackathon2020-292800")

login.stdout.on('data', (data) => {
    console.log(data.toString())
})

login.stderr.on('data', (data) => {
    console.error(data.toString());
})

login.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
})

const  getServices = spawn("kubectl", ["get", "svc","-o", "json"])

getServices.stdout.on('data', (data) => {
    console.log(data.toString())
    let services = JSON.parse(data.toString())
    console.log(services)
})

getServices.stderr.on('data', (data) => {
    console.error(data.toString());
})

getServices.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
})

const  getPods = spawn("kubectl", ["get", "pods","-o", "json"])