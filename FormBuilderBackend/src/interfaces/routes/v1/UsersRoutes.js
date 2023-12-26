const express = require('express');
const {body} = require('express-validator');
const {validate} = require('../../../shared/validation/Validator');
const UsersController = require('../../controllers/v1/UsersController');
const ReturnMiddleware = require('../../middleware/ReturnMiddleware');
const SequelizeUsersRepository = require('../../../infrastructure/database/repositories/SequelizeUsersRepository');
const UsersUseCase = require('../../../application/usecase/UsersUseCase');

const router = express.Router();

const usersRepository = new SequelizeUsersRepository('Users');
const usersUseCase = new UsersUseCase(usersRepository);
const usersController = new UsersController(usersUseCase);

/**
 * @swagger
 * /users/get:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - users
 *     parameters:
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: extra
 *         description:
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: RequestType
 *         required: false
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Filter:
 *                 type: object
 *               Order:
 *                 type: object
 *             example:
 *               Filter: {Values: [{Field: UserId, Type: EQ, Value: number},{Field: UserName, Type: EQ, Value: string},{Field: Password, Type: EQ, Value: string},{Field: PasswordSalt, Type: EQ, Value: string}], Type: AND}
 *               Order: {Field: UserId, Type: ASC}
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
router.post('/get', usersController.get.bind(usersController), ReturnMiddleware.return);

module.exports = router;