import ApiError from "../api-error.js"
import ContactService from "../services/contact.service.js"
import MongoDB from "../utils/mongodb.utils.js"

export default {
  create: async (req, res, next) => {
    if (!req.body?.name) {
      return next(new ApiError(400, "Name can not be empty"))
    }

    try {
      const contactService = new ContactService(MongoDB.client)
      const document = await contactService.create(req.body)
      return res.send(document)
    } catch (err) {
      console.log("MongoDB error!", err)
      return next(new ApiError(500, "An error occurred while creating the contact"))
    }
  },
  findAll: async (req, res, next) => {
    let documents = []

    try {
      const contactService = new ContactService(MongoDB.client)
      console.log(req.query)
      const { name } = req.query
      if (name) {
        documents = await contactService.findByName(name)
      } else {
        documents = await contactService.find({})
      }
    } catch (err) {
      return next(
        new ApiError(500, "An error occurred while retrieving contacts")
      )
    }

    return res.send(documents)
  },
  findOne: async (req, res, next) => {
    console.log("in find one", req.params)
    try {
      const contactService = new ContactService(MongoDB.client)
      const document = await contactService.findById(req.params.id)

      if (!document) {
        return next(new ApiError(404, "Contact not found"))
      }

      return res.send(document)
    } catch (err) {
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    }
  },
  update: async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Data to update can not be empty"))
    }

    try {
      const contactService = new ContactService(MongoDB.client)
      const document = await contactService.update(req.params.id, req.body)
      console.log(req.params.id)
      if (!document) {
        return next(new ApiError(404, "Contact not found"))
      }

      return res.send({ message: "Contact was updated successfully" })
    } catch (err) {
      return next(new ApiError(500), `Error updating contact with id=${req.paramsid}`)

    }
  },
  delete: async (req, res) => {
    try {
      const contactService = new ContactService(MongoDB.client)
      const document = await contactService.delete(req.params.id)

      if (!document) {
        return next(new ApiError(404, "Contact not found"))
      }

      return res.send({ message: "Contact was deleted successfully" })
    } catch (err) {
      return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`))
    }
  },
  deleteAll: async (req, res) => {
    try {
      const contactService = new ContactService(MongoDB.client)
      const deleteCount = await contactService.deleteAll()
      return res.send({ message: `${deleteCount} contacts were deleted successfully` })
    } catch (err) {
      return next(new ApiError(500, "An error occurred while removing all contacts"))
    }
  },
  findAllFavorite: async (req, res) => {
    try {
      const contactService = new ContactService(MongoDB.client)
      const documents = await contactService.findFavorite()
      return res.send(documents)
    } catch (err) {
      return next(new ApiError(500, "An error occurred while retrieving favorite contacts"))
    }
  }
}