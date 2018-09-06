/*
Fill the settings parameters in order to test the sample script

*/
const Cellforce = require("cellforce")

const settings = {
  user:"",
  password:"",
  apiKey:"",
  userId:,
  shortCode:,
  carrierId:
}

const cfApi =  new Cellforce(settings);

const message = ""
const phoneNumber = ""

cfApi.sendMessage(message,phoneNumber, (err, res)=>{

      if(err){
        console.log("An error ocurred",err)
        return
      }
      console.log(" OBJ RESPONSE ",res.status == "success")
})

// cfApi.login( (err , dataInfo )=>{
//
//     console.log(err, "data ",dataInfo)
// } )
