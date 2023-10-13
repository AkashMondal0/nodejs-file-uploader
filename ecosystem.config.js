module.exports = {
  apps : [{
    name   : "SkyStorage",
    script    : "./dist/index.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}
