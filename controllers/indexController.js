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
      });
      result.on('end', () => {
        let makes = JSON.parse(data).Makes;
        res.render('index', { title: 'Search car', brands: makes });
      });
    }).on("error", (err) => {
      console.log("Error: " + err)
    });
  };

/**
 * 
 * get CarQuery api datas for car models of one brand
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof indexController
 */
indexController.getModels = async (req, res) => {
  let brand = req.params.brand.toLowerCase();
  https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${brand}`, function(result) {
  let data = '';
    result.on('data', function(chunk) {
      data += chunk;
    });
    result.on('end', () => {
      let makes = JSON.parse(data);
      res.json({ models : makes });
    });
  }).on("error", (err) => {
    console.log("Error: " + err)
  });
}

/**
 * get datas for car information
 * 
 * @static
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof indexController
 */
  indexController.getTrims = async (req, res) => {
  let brand = req.params.brand;
  let model = req.params.model; 
  https.get(`https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${brand}&model=${model}`, function(result) {
    let data = '';
    result.on('data', function(chunk) {
      data += chunk;
    });
    result.on('end', () => {
      let infos = JSON.parse(data);
      res.send({ infos });
    });
  }).on("error", (err) => {
    console.log("Error: " + err);
  });
}
   
module.exports = indexController;