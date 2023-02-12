const mongoose= require("mongoose");

const QuestionSchema= new mongoose.Schema({
        questionText: {type: String},
        answerOptions: {type: [String]},
        correctAnswer: {type: String},
        testID: {type: mongoose.Types.ObjectId}
})

const TestSchema= new mongoose.Schema({
    title: {type: String, required: true, lowercase: true},
    introduction:{type: String, default: ""},
    questions:{type: [mongoose.Types.ObjectId]},
    link: {type: String},
    public: {type: Boolean, default: true},
    owner: {type: mongoose.Types.ObjectId, required: true},
    attendees: {type: [mongoose.Types.ObjectId], default: []}
},{
    timestamps: true
})

module.exports={
    TestModel: mongoose.model("test", TestSchema),
    QuestionModel: mongoose.model("question", QuestionSchema)
}       