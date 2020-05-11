const { Router } = require('express');
const router = Router();
const Ingredient = require('../../models/Ingredient');
const IngredientType = require('../../models/IngredientType');
const IngredientUnit = require('../../models/IngredientUnit');
const checkToken = require('../../helpers/check-token');

router.get(
    '/ingredients/GetFullIngredientsList',
    checkToken,
    async (req, res) => {
        try {
            const data = await getIngredients()
            res.status(200).json({
                data: data,
                toastType: 1,
                toastMessage: '+++++>'
            })
        } catch(e) {
            console.log(e)
        }
    }
)

const getIngredients = async () => {
    let ingredients = await Ingredient.find({}).lean()
    let ingredientTypes = await IngredientType.find({}).lean()
    let ingredientUnits = await IngredientUnit.find({}).lean()
    let result = {
        items: [],
        types: [],
        units: []
    }
    result.items = ingredients.map(item => {
        let type = ingredientTypes.find(e => {
            if (e.uid === item.type) {
                return true
            }
        })
        let unit = ingredientUnits.find(e => {
            if (e.uid === item.unit) {
                return true
            }
        })
        item.type = type.name
        item.unit = unit.name
        
        return item
    })
    result.types = ingredientTypes.map(item => ({uid: item.uid, name: item.name, imgSrc: item.imgSrc}))
    result.units = ingredientUnits.map(item => ({uid: item.uid, name: item.name, type: item.type}))
    debugger
    return result

}



module.exports = router