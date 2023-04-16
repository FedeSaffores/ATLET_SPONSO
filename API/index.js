const server = require("./src/app.js");
const { conn } = require("./src/db");

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server listening at ${process.env.PORT}`);
  });
});
