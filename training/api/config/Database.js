import { Sequelize } from "sequelize";

const db = new Sequelize("lsp", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
