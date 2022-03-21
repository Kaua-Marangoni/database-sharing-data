import User from "../models/User"

export default async (request, response, next) => {
  const { id } = request.params

  const index = await User.findByPk(id)

  if (!index) return response.status(404).json({ error: "User not found" })

  next()
}
