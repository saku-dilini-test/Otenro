module.exports = {
  apps : [{
    name   : "ideadroid",
    script : "./app.js",
    env:{
          NODE_ENV : "stage", "ID": "0"
        },
    log_date_format : "DD/MM/YYYY HH:mm:ss.SSS"
  }]
}
