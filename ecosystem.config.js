module.exports = {
  apps : [{
    name   : "Sky-Storage",
    script    : "./dist/index.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}
