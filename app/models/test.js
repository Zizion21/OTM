const mongoose= require("mongoose");
const TestSchema= new mongoose.Schema({
    title: {type: String, required: true, lowercase: true},
    introduction:{type: String, default: ""},
    questions:{type: {
        _id: ObjectId,
        questionText: String,
        answerOptions: [String],
        correctAnswer: String
    }},
    link: {type: String},
    owner: {type: mongoose.Types.ObjectId, required: true}
},{
    timestamps: true
})

module.exports={
    TestModel: mongoose.model("test", TestSchema)
}