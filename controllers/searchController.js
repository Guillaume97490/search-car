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

    await Search.create({
      brand: req.body.brand,
      model: req.body.model

    });


}

module.exports = searchController;