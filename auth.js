const auth = (req, res, next)=>{


    // this middleware function delegated for logging logic
    console.log("Authenticating")
  
    // next(); - with this we are passing control to the next middleware function in the pipeline
  
    next();
  
  }


  module.exports = auth