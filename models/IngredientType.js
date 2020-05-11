const { Schema, model } = require('mongoose')

const schema = new Schema({
    uid: {
        type: Number,
        require: true
    },
    name: { 
        type: String,
        require: true
    },
    imgSrc: {
        type: [String], 
        require: false
    }
})

const IngredientType = model('IngredientType', schema, 'ingredient_types')

module.exports = IngredientType