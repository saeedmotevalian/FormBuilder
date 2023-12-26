const express = require('express');
const router = express.Router();
const AuthenticationMiddleware = require('./../../middleware/AuthenticationMiddleware');

const AuthenticationRoutes = require('./AuthenticationRoutes');
const FormsRoutes = require('./FormsRoutes');
const UserFormsRoutes = require('./UserFormsRoutes');
const UsersRoutes = require('./UsersRoutes');

router.use('/authentication', AuthenticationRoutes);

router.use((req, res, next) => {
    AuthenticationMiddleware.uaa(req, res, next);
});

router.use('/forms', FormsRoutes);
router.use('/userForms', UserFormsRoutes);
router.use('/users', UsersRoutes);

module.exports = router;