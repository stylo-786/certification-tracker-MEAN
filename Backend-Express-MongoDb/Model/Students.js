var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    _id:Schema.Types.ObjectId,
    name:String,
    cname:[{
        _id:Schema.Types.ObjectId,
    certification:String,
    status:String
    }]
});


const Students=mongoose.model('Students',StudentSchema);

module.exports=Students;