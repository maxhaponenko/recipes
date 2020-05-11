const { Schema, model } = require('mongoose')

const schema = new Schema({
    id: {
        type: Number,
        require: true
    },
    name: { 
        type: String,
        require: true
    },
    type: { // Овощь, мясо, приправа и т.д.
        type: Number, // id from IngredientType Model
        require: true, 
        unique: true
    },
    imgSrc: {
        type: [String], 
        require: false
    },
    unit: {  // Грамм, милилитр, щепотка, столовая ложка и т.д.
        type: Number,
        require: true
    }
})

const Ingredient = model('Ingredient', schema, 'ingredients')

module.exports = Ingredient