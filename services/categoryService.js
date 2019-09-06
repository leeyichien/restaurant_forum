const db = require("../models");
const Category = db.Category;

const categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll().then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id).then(category => {
          callback({
            categories: categories,
            category: category
          });
        });
      } else {
        callback({ categories: categories });
      }
    });
  },
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: "error", message: "name didn't exist" });
    } else {
      return Category.create({
        name: req.body.name
      }).then(category => {
        callback({
          status: "success",
          message: "categories was successfully created"
        });
      });
    }
  }
};

module.exports = categoryService;
