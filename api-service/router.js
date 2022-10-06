const express = require('express');
const validateEmail = require('./middleware');
const controller = require('./controller');

const router = express.Router();

/**
 * @api {get} /health Request App health
 * @apiVersion 0.3.0
 * @apiSampleRequest https://copenotes.herokuapp.com/health
 * @apiName GetHealth
 * @apiGroup Health
 *
 * @apiSuccess {String} message       success message
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "App is running successfully"
 *     }
 *
 * @apiErrorExample {json} Server-Error
 *     HTTP/1.1 500 Internal Error
 *     {
 *       "error: "Something went wrong"
 *     }
 */
router.get('/health', (req, res) => res.json({ message: 'App is running successfully' }));

/**
 * @api {post} /subscribe Subscribe new user
 * @apiVersion 0.3.0
 * @apiBody {String} email=sammiestt@gmail.com   mandatory email
 * @apiSampleRequest https://copenotes.herokuapp.com/subscribe
 * @apiName SubscribeUser
 * @apiGroup User
 *
 * @apiSuccess {String} message       success message
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "message": "You have successfully subscribed to Cope Notes, A new message will be sent to your email every minute"
 *     }
 *
 * @apiErrorExample {json} Error 400: Bad Request
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error: "Please submit a vaild email"
 *     }
 *
 * @apiErrorExample {json} Error 409: Conflict
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error: "Email already in use"
 *     }
 *
 * @apiErrorExample {json} Error 409: Server Error
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error: "Something went wrong"
 *     }
 */
router.post('/subscribe', validateEmail, controller);

module.exports = router;
