const Search = require ('../models/search');
const validator = require('validator');
/**
 * The Search controller
 *
 * @class searchController
 */
searchController = {}


/**
 * 
 * save one search
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof searchController
 */
searchController.add = async (req, res) => {
  const search = await Search.create({
    brand: validator.escape(req.body.brand),
    model: validator.escape(req.body.model)
  });

  res.send(search);
}

/**
 * 
 * get the last five searchs ordered by date for history 
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof searchController
 */
searchController.list = async (req, res) => {
  const searchs = await Search.findAll({
    limit:5,
    order:[['created_at','desc']]
  });
  res.send(searchs);
}
    

/**
 * 
 * get dynamic Chart datas
 * 
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @memberof searchController
 */
searchController.getChartsData = async (req, res) => {
  // get parameters from url query
  const type = req.query.type;
  const limit = parseInt(req.query.limit);

  // if missing param return error message
  if (!type || !limit) return res.send({error:true, msg:'bad query params'});

  if (type == 'createdAt') {
    const datas = await Search.findAll({
      attributes:[
        [Search.sequelize.literal(`DATE(created_at)`), `${type}`],
        [Search.sequelize.literal('COUNT(*)'), `${type}_count`]
      ],
      order: Search.sequelize.literal(`${type} DESC`),
      group: type,
      limit: limit
    });

    const result = {
      datas,
      title: `Nombre de recherches des ${limit} derniers jours`
    }
    res.send(result);
  }

  if (type == "brand" || type == "model") {

    const datas = await Search.findAll({
      group: type,
      attributes:[type,[Search.sequelize.fn('count', Search.sequelize.col(type)), `${type}_count`]],
      order: Search.sequelize.literal(`${type}_count DESC`),
      limit: limit
    });

    let title = "";
    if (type == "brand") title = `Les ${limit} marques les plus recherchées`;
    if (type == "model") title = `Les ${limit} modèles les plus recherchés`;

    const result = {
      datas,
      title 
    }
    res.send(result);
  }


}

module.exports = searchController;