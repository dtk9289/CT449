export default {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGODB || "mongodb://127.0.0.1:27017/contactbook"
  }
}
