module.exports= new class HomeController{
    async indexPage(req, res, next){
        try {
            return res.status(200).send("Index Home Page");
            
        } catch (error) {
            next(error)
        }
    }
}