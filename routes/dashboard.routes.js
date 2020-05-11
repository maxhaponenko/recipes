const { Router } = require('express')
const router = Router()
const DashboardData = require('../models/DashboardData')
const checkToken = require('../helpers/check-token')

router.get(
    '/GetData/:userId',
    checkToken,
    async (req, res) => {
        const userId = req.params.userId
        const data = await DashboardData.findOne({ userId: userId })
        try {
            res.status(200).json({
                data1: data.data1,
                data2: data.data2,
                data3: data.data3,
                toastType: 1,
                toastMessage: '------ Some data from API ---------->'
            })
        } catch(e) {
            console.log(e)
        }
    }
)

module.exports = router