import app from "./app.js";
import config from "./app/config.js";

const PORT = config.app.port

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
})