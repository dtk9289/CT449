import app from "./app.js";
import config from "./app/config.js";
import MongoDB from "./app/utils/mongodb.utils.js"

async function startServer(){
  try{
    await MongoDB.connect(config.db.uri)
    console.log("Connected to the database")

    const PORT = config.app.port
    app.listen(PORT, ()=>{
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err){
    console.log("Cannot connect to the databse!", err)
    process.exit()
  }
}

startServer()