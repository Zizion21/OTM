const mongoose= require("mongoose");

const Questions= mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String}
})
const TestSchema= new mongoose.Schema({
    title: {type: String, required: true, lowercase: true},
    introduction:{type: String, default: ""},
    questions:{type: [Questions]}, // An array included questions IDs?????? Consider multiple questions!*****
    link: {type: String},
    owner: {type: mongoose.Types.ObjectId, required: true}
},{
    timestamps: true
})

module.exports={
    TestModel: mongoose.model("test", TestSchema)
}