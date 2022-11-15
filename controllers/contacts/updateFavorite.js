const Joi = require('joi');
const { NotFound, BadRequest } = require('http-errors');
const { Contact } = require("../../model");

const updateFavorite = async (req, res) => {
      const { id } = req.params; 
      const { favorite } = req.body;
      if(!req.body) {
        throw new BadRequest("missing field favorite");
      }
      const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
      if(!result) {
        throw new NotFound("Not found");
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      }); 
  }

  module.exports = updateFavorite;