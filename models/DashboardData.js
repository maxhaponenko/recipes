const { Schema, model } = require('mongoose')

const schema = new Schema ({
    data1: {
        type: Number
    },
    data2: {
        type: Number
    },
    data3: {
        type: Number
    },
    userId: {
        type: String,
        require: true
    },
    
})

const DashboardData = model('DashboardData', schema, 'dashboard_data')

module.exports = DashboardData