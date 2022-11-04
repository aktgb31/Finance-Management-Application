const { spawnSync } = require("child_process");
const fs = require('fs');
const { ENVIRONMENT } = require("./config");

function runServer() {
    const logFile = ENVIRONMENT != "development" ? fs.openSync(`logs/server-${new Date().toISOString()}.log`, 'w') : 'inherit';
    let child = spawnSync("node", ["server.js"], { shell: false, stdio: ['ignore', logFile, logFile] });
    console.log(`Server stopped with code ${child.status}`);
}


async function start(limit) {
    let i = 1;
    while (i <= limit) {
        console.log(`Starting server for ${i} time`);
        i = i + 1;
        runServer();
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`Server failed to start ${limit} times`);

};

start(10);