/*
API KEY: f4dfec0448c504c9ecd0c0e4dff767de
userID: 6162
shortcodeID: 53
CarrierID: 866

*/
const Cellforce = require("cellforce")
const settings = {
  user:"shippifymexico",
  password:"shippifymexico",
  apiKey:"ef778f3272682034945be49effb1240b",
  userId:6163
  shortCode:53
  carrierId: 866
}

const cfApi =  new Cellforce(settings);
cfApi.login( (err , data )=>{
  ////{"data":{"user_key":"d2bf6d00231b47a2555b4023214c758a","client_id":"6162"},"status":"success"}

    console.log(err, "data ",data)

} )
