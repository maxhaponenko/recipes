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
    type: { // Жидкий или твердый ('liquid', 'solid')
        type: String,  
        require: false
    }
})

const IngredientUnit = model('IngredientUnit', schema, 'ingredient_units')

module.exports = IngredientUnit