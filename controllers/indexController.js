/**
 * The Index controller
 *
 * @class indexController
 */
class indexController {
  /**
   * Show the home page
   * @param {object} req Express request object
   * @param {object} res Express response object
   *
   * @memberof indexController
   */
  home = async (req, res) => {
    res.render("index", { title: "Express" });
  };
}

module.exports = new indexController();
