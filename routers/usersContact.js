const express = require('express')
const contactController = require('../controllers/usersContact')
const router = express.Router()

router.get('/usersContact', contactController.getAllContact)

router.get('/usersContact:id', contactController.getContactById)

router.post('/usersContact', contactController.createContact)

router.put('/usersContact:id', contactController.updateContactById)

router.delete('/usersContact:id', contactController.deleteContactById)

module.exports = router