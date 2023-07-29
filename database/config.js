const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

        await mongoose.connect(process.env.MONGODB,{
            //Obsoleto del curso ya no es necesario
            //useNewUrlParser: true,
            //useUnifiedTopology:true,
            //useCreateIndex:true,
            //useFindAndModify:false
        })

        console.log('Base de datos online');

        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la Base de Datos')
    }

}

module.exports = {
    dbConnection
}