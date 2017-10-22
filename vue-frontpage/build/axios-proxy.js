
var axios = require('axios');

var url = '/fullStack';
var targetUrl = 'http://127.0.0.1:3000'+url;

exports.router = function (router) {
  router.get('/fullStack/register',(req,res,next)=>{
    axios.get('http://127.0.0.1:3000/fullStack/register',{
      params:req.query
    }).then((response)=>{
      //console.log(response);
      res.json(response.data)
    }).catch((e)=>{
      console.log(e);
    })
  })
}
//
// exports.router = function (router) {
//   router.post(url+'/login',(req,res,next)=>{
//     axios.post(targetUrl+'/login',{
//       params:req.query
//     }).then((response)=>{
//       //console.log(response);
//       res.json(response.data)
//     }).catch((e)=>{
//       console.log(e);
//     })
//   })
// }
