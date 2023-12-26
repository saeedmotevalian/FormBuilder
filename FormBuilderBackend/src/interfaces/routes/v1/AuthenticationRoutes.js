const express = require('express');
const {
    query,
    body
} = require('express-validator');
const {validate} = require('../../../shared/validation/Validator');
const AuthenticationController = require('../../controllers/v1/AuthenticationController');
const ReturnMiddleware = require('../../middleware/ReturnMiddleware');
const SequelizeAuthenticationRepository = require('../../../infrastructure/database/repositories/SequelizeAuthenticationRepository');
const SequelizeUsersRepository = require('../../../infrastructure/database/repositories/SequelizeUsersRepository');
const AuthenticationUseCase = require('../../../application/usecase/AuthenticationUseCase');
const UsersUseCase = require('../../../application/usecase/UsersUseCase');

const router = express.Router();

const authenticationRepository = new SequelizeAuthenticationRepository('Accounts');
const usersRepository = new SequelizeUsersRepository('Users');
const authenticationUseCase = new AuthenticationUseCase(authenticationRepository, usersRepository);
const authenticationController = new AuthenticationController(authenticationUseCase);

/**
 * @swagger
 * /authentication/login:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - authentication
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
router.post('/login', query(['username', 'password']).notEmpty().withMessage('Data is required'), validate, authenticationController.login.bind(authenticationController), ReturnMiddleware.return);
/**
 * @swagger
 * /authentication/register:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - authentication
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [UserName, Password]
 *             properties:
 *               UserName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
router.post('/register', body(['UserName', 'Password']).notEmpty().withMessage('Data is required'), validate, authenticationController.register.bind(authenticationController), ReturnMiddleware.return);

module.exports = router;