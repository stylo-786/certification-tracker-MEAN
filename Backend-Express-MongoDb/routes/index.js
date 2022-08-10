var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
const Students=require('../Model/Students')

/* GET home page. */
 

router.get('/', function(req, res, next) {
    Students.find().then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(500).json({
            "error":error
        })
    })
  
});

router.post('/addUser', function(req, res, next) {
    const Student=new Students({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        cname:[{
            _id:new mongoose.Types.ObjectId,
            certification:req.body.cname.certification,
            status:req.body.cname.status
        }]
        })
        
        Student.save().then(result=>{
            res.status(200).send(result)
        }).catch(error=>{
            res.status(500).json({
                "error":error
            })
            console.log(error);
        })

  });

router.post('/addCertificate/:id', function(req, res, next) {
        id=req.params.id
    
        Students.updateOne({_id:id},{
            $push:{
                cname:[{
                    _id:new mongoose.Types.ObjectId,
                    certification:req.body.certification,
                    status:req.body.status
                }]
            }
        }).then(result=>{
            res.status(200).send(result)
        }).catch(error=>{
            res.status(500).json({
                "error":error
            })
            console.log(error);
        })
    
    
  });

router.delete('/delCertificate/:id/:cid', function(req, res, next) {
    id=req.params.id
    cid=req.params.cid
    
        Students.updateOne({_id:id},{
            $pull:{
                cname:{
                    _id:cid
                }
            }
        }).then(result=>{
            res.status(200).send(result)
        }).catch(error=>{
            res.status(500).json({
                "error":error
            })
            console.log(error);
        })

  });

  router.delete('/delUser/:id', function(req, res, next) {
    id=req.params.id
    
        Students.deleteOne({_id:id}).then(result=>{
            res.status(200).send(result)
        }).catch(error=>{
            res.status(500).json({
                "error":error
            })
            console.log(error);
        })

  });

router.put('/editCertificate/:id/:cid', function(req, res, next) {
    id=req.params.id
    cid=req.params.cid
    Students.updateOne({"_id" : id, "cname._id" : cid},{$set : {"cname.$.status" : req.body.status}}).then(result=>{
        res.status(200).send(result)
    }).catch(error=>{
        res.status(500).json({
            "error":error
        })
    })
  });


module.exports = router;
