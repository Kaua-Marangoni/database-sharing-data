import { v4 } from "uuid"
import * as Yup from "yup"

import User from "../models/User"

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      number: Yup.string().required().length(15),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, number } = request.body

    const numberExist = await User.findOne({
      where: {
        number,
      },
    })

    if (numberExist) {
      return response.status(400).json({ error: "Number already exists" })
    }

    const user = await User.create({
      id: v4(),
      name,
      number,
    })

    return response.status(201).json({ id: user.id, name, number })
  }

  async index(request, response) {
    const users = await User.findAll()

    return response.json(users)
  }

  async indexOne(request, response) {
    const { id } = request.params
    const user = await User.findByPk(id)

    return response.json(user)
  }

  async delete(request, response) {
    const { id } = request.params
    try {
      await User.destroy({
        where: {
          id,
        },
      })
      return response.status(200).json({ success: "User deleted" })
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async update(request, response) {
    const { id } = request.params
    const { name, number } = request.body
    const user = await User.findByPk(id)

    user.name = name
    user.number = number
    await user.save()

    return response.status(200).json(user)
  }
}

export default new UserController()
