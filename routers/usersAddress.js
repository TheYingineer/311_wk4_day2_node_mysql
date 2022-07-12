    const express = require('express')
    const addressController = require('../controllers/usersAddress')
    const router = express.Router()
    
    router.get('/usersAddress', addressController.getAllAddress)
    
    router.get('/usersAddress/:id', addressController.getAddressById)
    
    router.post('/usersAddress', addressController.createAddress)
    
    router.put('/usersAddress/:id', addressController.updateAddressById)
    
    router.delete('/usersAddress/:id', addressController.deleteAddressById)
    
    module.exports = router