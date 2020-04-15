const https = require('https');
/**
 * The Index controller
 *
 * @class indexController
 */
 indexController = {}
  /**
   * Show the home page
   * @param {object} req Express request object
   * @param {object} res Express response object
   *
   * @memberof indexController
   */
    indexController.home = async (req, res) => {
 
      https.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes&year=2010', function(result) {
        let data = '';
        
        result.on('data', function(chunk) {
          data += chunk;
        })
    
        result.on('end', () => {
          let makes = JSON.parse(data).Makes
  
          
          res.render('index', { title: 'index', brands: makes });
    
        })
  
      }).on("error", (err) => {
        console.log("Error: " + err)
      })



  };



  
  /**
   * 
   * get CarQuery api datas for car models
   * 
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @memberof indexController
   */
  indexController.getModels = async (req, res) => {
 
    let brand = req.params.brand.toLowerCase();
/*    console.log(brand); */
       https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${brand}`, function(result) {
         
        
       
       let data = '';
         
         result.on('data', function(chunk) {
           data += chunk;
         })
     
         result.on('end', () => {
           let makes = JSON.parse(data)
   
          
           res.json({ models : makes });
     
         })
   
       }).on("error", (err) => {
         console.log("Error: " + err)
       })
       }




       
    /**
   * 1 Home page with a list of names json
   * 
   * @static
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @memberof indexController
   */
   indexController.getTrims = async (req, res) => {
    let brand = req.params.brand;
    let model = req.params.model; 
 /*    console.log(brand);
    console.log(model); */
  
    https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${brand}&model=${model}`, function(result) {
      // select only name of the car
      let data = '';
    
      result.on('data', function(chunk) {
        data += chunk;
      })
  
      result.on('end', () => {
        let infos = JSON.parse(data)
       /*  console.log(infos.Trims[0]); */
        res.send({ infos });
  
      })
      
    }).on("error", (err) => {
      console.log("Error: " + err)
    })
      
  
  }
   
   
   





module.exports = indexController;
