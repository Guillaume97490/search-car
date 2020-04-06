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
    res.render("index", { title: "Express" });
  };


module.exports = indexController;
