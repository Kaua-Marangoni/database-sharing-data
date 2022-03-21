module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5433,
  username: "postgres",
  password: "sharing-postgres",
  database: "sharing-data",
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
