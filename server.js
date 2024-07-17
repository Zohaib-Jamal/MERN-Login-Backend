const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const { registerUser, signInUser } = require("./controller/authController")
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/sign-up', async (req, res) => {
  try{
    const formData = req.body;
    console.log(formData)

    if(!formData.username || !formData.email || !formData.password)
      return res.status(400).json({message: "Incomplete Fields"})
    
    await registerUser(formData.username, formData.email, formData.password, res)
    if(!res.headersSent)
    res.status(201).json({message: "Success"})
  }catch(err){
    res.status(500).json({message: `Error Occured ${err.message}` })
  }
})

app.post('/api/sign-in', async (req, res) => {
  try {
    const formData = req.body
    console.log(formData)

    await signInUser(formData.email, formData.password, res)
    

  }catch(e) {
    res.status(500).json({message: `Error Occured: ${e.message}`})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})