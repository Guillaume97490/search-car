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
 
    let idbrand = req.params.idbrand.toLowerCase();
   console.log(idbrand);
       https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${idbrand}`, function(result) {
         
        
       
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
   
   
   





module.exports = indexController;
