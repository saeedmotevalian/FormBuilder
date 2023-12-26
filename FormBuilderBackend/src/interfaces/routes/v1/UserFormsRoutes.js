const express = require('express');
const {body} = require('express-validator');
const {validate} = require('../../../shared/validation/Validator');
const UserFormsController = require('../../controllers/v1/UserFormsController');
const ReturnMiddleware = require('../../middleware/ReturnMiddleware');
const SequelizeUserFormsRepository = require('../../../infrastructure/database/repositories/SequelizeUserFormsRepository');
const UserFormsUseCase = require('../../../application/usecase/UserFormsUseCase');

const router = express.Router();

const userFormsRepository = new SequelizeUserFormsRepository('UserForms');
const userFormsUseCase = new UserFormsUseCase(userFormsRepository);
const userFormsController = new UserFormsController(userFormsUseCase);

/**
 * @swagger
 * /userForms/create:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - userForms
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [FormId, Data]
 *             properties:
 *               UserId:
 *                 type: number
 *               FormId:
 *                 type: number
 *               Data:
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
router.post('/create', body(['FormId', 'Data']).notEmpty().withMessage('Data is required'), validate, userFormsController.create.bind(userFormsController), ReturnMiddleware.return);
/**
 * @swagger
 * /userForms/get:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - userForms
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
 *               Filter: {Values: [{Field: UserFormId, Type: EQ, Value: number},{Field: UserId, Type: EQ, Value: number},{Field: FormId, Type: EQ, Value: number},{Field: Data, Type: EQ, Value: string}], Type: AND}
 *               Order: {Field: UserFormId, Type: ASC}
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
router.post('/get', userFormsController.get.bind(userFormsController), ReturnMiddleware.return);
/**
 * @swagger
 * /userForms/update/{UserFormId}:
 *   put:
 *     summary:
 *     description:
 *     tags:
 *       - userForms
 *     parameters:
 *       - in: path
 *         name: UserFormId
 *         required: true
 *         schema:
 *           type: number
 *           format: number
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FormId:
 *                 type: number
 *               Data:
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
router.put('/update/:UserFormId', body(['FormId', 'Data']).notEmpty().withMessage('Data is required'), validate, userFormsController.update.bind(userFormsController), ReturnMiddleware.return);
/**
 * @swagger
 * /userForms/delete/{UserFormId}:
 *   delete:
 *     summary:
 *     description:
 *     tags:
 *       - userForms
 *     parameters:
 *       - in: path
 *         name: UserFormId
 *         required: true
 *         schema:
 *           type: number
 *           format: number
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
router.delete('/delete/:UserFormId', userFormsController.delete.bind(userFormsController), ReturnMiddleware.return);

module.exports = router;