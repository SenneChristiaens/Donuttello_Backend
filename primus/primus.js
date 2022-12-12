const Primus = require("primus");

let go = (server) => {
  let primus = new Primus(server, {});
  //primus.save(__dirname +'/primuslib.js')

  primus.on("connection", (spark) => {
    console.log("yoepie");
    spark.on("data", (data) => {
        console.log(data);
        primus.write(data);
        }
    );
  });
};

module.exports.go = go;
