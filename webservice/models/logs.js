var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var LogSchema = new Schema(
    {
        // _id : ObjectId, // Mongoose assigns each of your schemas an _id field by default
        user_timestamp : Date,
        sessionid: String,
        action : String,
        username : String,
        origin : String,
        result: String, // success, blocked, failed
        level: String,
        resource: String,
        requestmethod: String,
        system_timestamp: Date
    }
);

LogSchema.plugin(mongoosePaginate);

var Logs = mongoose.model('logs', LogSchema);

module.exports = Logs
