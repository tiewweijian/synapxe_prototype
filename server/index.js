import * as https from 'https'
import * as http from 'http'
import express from 'express';
import { addAppointment, addOrders, getAppointments, storeUser } from './project_controller.js';
import cors from 'cors';


const PORT = process.env.PORT || 3001;

const app = express();



const router = express.Router()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
    credentials: true,
})) // config cors so that front-end can use

router.get('/', (_, res) => res.send('Hello World from API service'))

app.use('/api', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, authorization, content-type, accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
})

router.post('/storeuser', storeUser)
router.post('/newappointment', addAppointment)
router.get('/getappointments', getAppointments)
router.post('/addorder', addOrders)

if (process.env.NODE_ENV === 'production') {
  https.createServer(credentials, app).listen(3001, () => {
      console.log(`HTTPS server currently running, listening on port ${3001}`)
  })
} else {
  http.createServer(app).listen(3001, () => {
      console.log(`HTTP server currently running, listening on port ${3001}`)
  })
}
