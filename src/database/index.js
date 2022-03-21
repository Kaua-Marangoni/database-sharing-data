import Sequelize from "sequelize"

import User from "../app/models/User"
import configDatabase from "../config/database"

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    User.init(this.connection)
  }
}

export default new Database()
