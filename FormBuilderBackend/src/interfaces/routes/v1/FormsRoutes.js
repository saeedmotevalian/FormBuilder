const express = require('express');
const {body} = require('express-validator');
const {validate} = require('../../../shared/validation/Validator');
const FormsController = require('../../controllers/v1/FormsController');
const ReturnMiddleware = require('../../middleware/ReturnMiddleware');
const SequelizeFormsRepository = require('../../../infrastructure/database/repositories/SequelizeFormsRepository');
const FormsUseCase = require('../../../application/usecase/FormsUseCase');

const router = express.Router();

const formsRepository = new SequelizeFormsRepository('Forms');
const formsUseCase = new FormsUseCase(formsRepository);
const formsController = new FormsController(formsUseCase);

/**
 * @swagger
 * /forms/create:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - forms
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [Json]
 *             properties:
 *               Json:
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
router.post('/create', body(['Json']).notEmpty().withMessage('Data is required'), validate, formsController.create.bind(formsController), ReturnMiddleware.return);
/**
 * @swagger
 * /forms/get:
 *   post:
 *     summary:
 *     description:
 *     tags:
 *       - forms
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
 *               Filter: {Values: [{Field: FormId, Type: EQ, Value: number},{Field: Json, Type: EQ, Value: string}], Type: AND}
 *               Order: {Field: FormId, Type: ASC}
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
router.post('/get', formsController.get.bind(formsController), ReturnMiddleware.return);
/**
 * @swagger
 * /forms/update/{FormId}:
 *   put:
 *     summary:
 *     description:
 *     tags:
 *       - forms
 *     parameters:
 *       - in: path
 *         name: FormId
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
 *               Json:
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
router.put('/update/:FormId', body(['Json']).notEmpty().withMessage('Data is required'), validate, formsController.update.bind(formsController), ReturnMiddleware.return);
/**
 * @swagger
 * /forms/delete/{FormId}:
 *   delete:
 *     summary:
 *     description:
 *     tags:
 *       - forms
 *     parameters:
 *       - in: path
 *         name: FormId
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
router.delete('/delete/:FormId', formsController.delete.bind(formsController), ReturnMiddleware.return);

module.exports = router;