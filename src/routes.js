import { Router } from "express"
import UserController from "./app/controllers/UserController"
import existsMiddleware from "./app/middlewares/exists"

const routes = new Router()

routes.post("/numbers", UserController.store)
routes.get("/numbers", UserController.index)
routes.get("/numbers/:id", UserController.indexOne)
routes.delete("/numbers/:id", existsMiddleware, UserController.delete)
routes.put("/numbers/:id", UserController.update)

export default routes
