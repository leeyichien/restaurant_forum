const db = require("../models");
const Restaurant = db.Restaurant;
const User = db.User;
const Category = db.Category;
const fs = require("fs");
const imgur = require("imgur-node-api");
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

const adminService = require("../services/adminService.js");

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, data => {
      return res.render("admin/restaurants", data);
    });
  },
  //使用者權限管理
  //顯示使用者清單
  editUsers: (req, res) => {
    return User.findAll().then(users => {
      return res.render("admin/users", { users: users });
    });
  },
  //修改使用者權限
  putUsers: (req, res) => {
    return User.findByPk(req.params.id).then(user => {
      user
        .update({
          isAdmin: !user.isAdmin
        })
        .then(user => {
          req.flash("success_messages", "user was successfully to update");
          return res.redirect("/admin/users");
        });
    });
  },
  //新增餐廳
  createRestaurant: (req, res) => {
    Category.findAll().then(categories => {
      return res.render("admin/create", {
        categories: categories
      });
    });
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, data => {
      if (data["status"] === "error") {
        req.flash("error_messages", data["message"]);
        return res.redirect("back");
      }
      req.flash("success_messages", data["message"]);
      res.redirect("/admin/restaurants");
    });
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, data => {
      return res.render("admin/restaurant", data);
    });
  },
  //編輯餐廳
  editRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      Category.findAll().then(categories => {
        return res.render("admin/create", {
          categories: categories,
          restaurant: restaurant
        });
      });
    });
  },
  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, data => {
      if (data["status"] === "error") {
        req.flash("error_messages", data["message"]);
        return res.redirect("back");
      }
      req.flash("success_messages", data["message"]);
      res.redirect("/admin/restaurants");
    });
  },
  deleteRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id).then(restaurant => {
      restaurant.destroy().then(restaurant => {
        res.redirect("/admin/restaurants");
      });
    });
  }
};
module.exports = adminController;
