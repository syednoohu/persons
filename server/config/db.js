const mongoose = require ('mongoose');
const config = require ('config');
const db = config.get('mongoURI');

options ={
  useNewUrlParser: true,
   useUnifiedTopology: true 
}
const connectDB = () =>{
  mongoose.connect(db, options)
  .then(() => {
    console.log(' !! Connected with Success!! ');
  },
    err => {
      console.log(err, ' DB Fails to connect!! ');
      process.exit(1);
    }
  );
}

module.exports = connectDB;