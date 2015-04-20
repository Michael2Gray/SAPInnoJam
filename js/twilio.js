/*********************************
* Twilio Client Library
* Based on the Twilio REST API: https://www.twilio.com/docs/api/rest
* Version 1.0
* Created By: Russ Savage
* FreeAdWordsScripts.com
*********************************/
function Twilio(accountSid, authToken) {
  this.ACCOUNT_SID = accountSid;
  this.AUTH_TOKEN = authToken;
   
  this.MESSAGES_ENDPOINT = 'https://api.twilio.com/2010-04-01/Accounts/'+this.ACCOUNT_SID+'/Messages.json';
  this.CALLS_ENDPOINT = 'https://api.twilio.com/2010-04-01/Accounts/'+this.ACCOUNT_SID+'/Calls.json';
 
  this.sendMessage = function(to,from,body) {
    var httpOptions = {
      method : 'POST',
      payload : {
        To: to,
        From: from,
        Body: body
      },
      headers : getBasicAuth(this)
    };
    var resp = UrlFetchApp.fetch(this.MESSAGES_ENDPOINT, httpOptions).getContentText();
    return JSON.parse(resp)['sid'];
  }
   
  this.makeCall = function(to,from,whatToSay) {
    var url = 'http://proj.rjsavage.com/savageautomation/twilio_script/dynamicSay.php?alert='+encodeURIComponent(whatToSay);
    var httpOptions = {
      method : 'POST',
      payload : {
        To: to,
        From: from,
        Url: url
      },
      headers : getBasicAuth(this)
    };
    var resp = UrlFetchApp.fetch(this.CALLS_ENDPOINT, httpOptions).getContentText();
    return JSON.parse(resp)['sid'];
  }
   
  function getBasicAuth(context) {
    return {
      'Authorization': 'Basic ' + Utilities.base64Encode(context.ACCOUNT_SID+':'+context.AUTH_TOKEN)
    };
  }
}

var sid = 'AC94643a901881309fa0b45ad284c9c59f';
var auth = '732743d8bad37d3fd78daa00bbe45321';

var client = new Twilio(sid, auth);

function sendText()
{
  document.getElementById("busForm");
  client.sendMessage('+353877456837', '+16122605510', 'This is a test');
  console.log("tst");
}