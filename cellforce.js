
const request = require('request');
const async = require('async');
const domainUrl = 'www.latammessaging.com';
const loginUrl = "/exlapiservice/users/login"
const sendSmsUrl = "/exlapi/sms/sendsms_tags"


class Cellforce {

  constructor(settings) {
    this.username =  settings.user
    this.password = settings.password
    this.apiKey = settings.apiKey
    this.userId = settings.userId
    this.shortCode = settings.shortCode
    this.carrierId = settings.carrierId

    this.debug = settings.debug ? settings.debug:false
  }

  sendMessage(text, phone,callback){

      async.waterfall([
        (cb)=>{
          this.login(cb)
        },
        (dataInfo,cb)=>{
          ////{"data":{"user_key":"d2bf6d00231b47a2555b4023214c758a","client_id":"6162"},"status":"success"}
          this.sms(dataInfo.user_key,dataInfo.client_id, text, phone,cb)

        }
      ],callback)
  }

  sms(userKey, clientId,text, phone, callback){

    let endpointUrl = sendSmsUrl
    const requestObj={
        method : "POST",
        url : `https://${domainUrl}${endpointUrl}`,
        json : true,
        headers : {
          "apikey" : this.apiKey
        },
        body : {
          	"data": {
          		"user_key":userKey,
          		"client_id":clientId,
          		"message":"##texto##",
          		"taglist": ["texto"],
          		"shortcode_id": this.shortCode,
          		"cellphones": [{
          			"number": phone,
          			"carrier_id": this.carrierId,
          			"texto":text
          		}]
          	}
          }
      }

      request.post(requestObj,function (error, response, body) {

        if(this.debug)
        {
          console.log("RESPONSE in SMS ",error,body )
        }

        if(error || !body){
          return callback(error)
        }

        let data = null
        try{
          data = (typeof body == "string") ? JSON.parse(body):body
        }catch(e){
          console.log("Parse Error in sending sms ",e)
          callback(e)
        }
        callback(error, data);
      });

  }

  login(callback) {

    let endpointUrl = loginUrl
    const requestObj={
        method : "POST",
        url : `https://${domainUrl}${endpointUrl}`,
        headers : {
          "apikey" : this.apiKey,
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form:{
          username:this.username,
          password:this.password
        }
      }

    request.post(requestObj,function (error, response, body) {

      if(this.debug)
      {
        console.log("RESPONSE in LOGIN ",error,body )
      }
      if(error || !body){
        return callback(error)
      }

      let data = null
      try{
        data = (typeof body == "string") ? JSON.parse(body).data:body.data
      }catch(e){
        callback(e)
        console.log("Parse Error login in",e)
      }
      callback(error, data);

    });

  }

}


module.exports = Cellforce;
