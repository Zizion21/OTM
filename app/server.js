const { AllRoutes } = require("./router/router");
const swaggerUI= require("swagger-ui-express");
const swaggerJsDoc= require("swagger-jsdoc");
module.exports= class Application{
    #express= require ("express");
    #app= this.#express();
    constructor(PORT, DB_URL){
        this.configDatabase(DB_URL);
        this.configApplication();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandler();

    }

    configApplication(){
        const path= require("path");
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended: true}));
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition:{
                info:{
                    title: "ZIZION OTM",
                    version: "1.0.0",
                    description: "WRITTEN BY ZIZION"
                },
                servers:[
                    {
                        url: "http://localhost:4500"
                    }
                ]
            },
            apis: [`${__dirname}/router/*.js`]
        })))
    }

    createServer(PORT){
        const http= require("http");
        const server= http.createServer(this.#app);
        server.listen(PORT, ()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        })

    }

    configDatabase(DB_URL){
        const mongoose= require("mongoose");
        mongoose.set('strictQuery',false);
        mongoose.connect(DB_URL, {useNewUrlParser: true}, (error)=>{
            if(error) throw error
            console.log("Connected to DB successfully.");
        })
    }

    errorHandler(){
        this.#app.use((req, res, next)=>{
            return res.status(404).json({
                status: 404,
                success: false,
                message:"Not Found!"
            })
        })
        this.#app.use((error, req, res, next)=>{
            const status= error?.status || 500;
            const message= error?.message || "InternalServerError";
            return res.status(status).json({
                status,
                success: false,
                message
            })
        })
    }

    createRoutes(){
        this.#app.get("/", (req, res, next)=>{
            return res.json({
                message: "This is a new express Application"
            })
        })
        this.#app.use(AllRoutes)
    }
}