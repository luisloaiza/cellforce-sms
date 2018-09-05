
const request = require('request');
const async = require('async');

const domainUrl = 'www.latammessaging.com';

const loginUrl = "/exlapiservice/users/login"
const sendSmsUrl = "/exlapi/sms/sendsms_tags"


class CellForce {

  constructor(settings) {
    this.user =  settings.user
    this.password = settings.password
    this.apiKey = settings.apiKey
    this.userId = settings.userId
    this.shortCode = settings.shortCode
    this.carrierId = settings.carrierId

  }

  sendMessage(text,callback){

      async.waterfall([
        (cb)=>{
          this.login(cb)
        },
        (dataInfo,cb)=>{

          console.log("WATER 2 ", dataInfo)
          this.sms(dataInfo.user_key,dataInfo.client_id,cb)

        }
      ],(err, result)=>{

          console.log("RES ",err, result)

        return callback(result)
      })
  }

  sms(userKey, clientId,text, phone, callback){

    let endpointUrl = sendSmsUrl
    const requestObj={
        method : "POST",
        url : `https://${domainUrl}${endpointUrl}`,
        json : true,
        headers : {
          "apikey" : this.apiKey,
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body = {
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

      //  requestObj.body= {data: JSON.stringify(dataObj)};

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

    console.log('Sending request ' + requestObj);
    //{"data":{"user_key":"d2bf6d00231b47a2555b4023214c758a","client_id":"6162"},"status":"success"}
    request(requestObj,function (error, response, body) {
        callback(error, body);
    });

  }

}
