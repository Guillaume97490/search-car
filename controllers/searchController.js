const Search = require ('../models/search');
searchController = {}


/**
 * 
 * get CarQuery api datas for car models
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof searchController
 */
searchController.add = async (req, res) => {
console.log(req.body);
   const search = await Search.create({
      brand: req.body.brand,
      model: req.body.model
    });

    res.send(search);
}

module.exports = searchController;



/**
 * 
 * get CarQuery api datas for car models
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof searchController
 */
searchController.list = async (req, res) => {
    /* console.log(req.body); */
       const searchs = await Search.findAll({
            limit:5,
            order:[['created_at','desc']]
        });
    /* console.log(searchs); */
    res.send(searchs);
    }
    
    module.exports = searchController;