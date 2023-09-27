import { client } from './config.js'

export async function storeUser(req, res) {

    console.log(req)
    const query = { nric: req.body.nric };

    const responseAfterEntry = await client.db("Prototype").collection("Users").replaceOne(query, {nric: req.body.nric, user: "Tan Book Kee"}, {upsert: true})

    return res.json("Completed")
}


export async function addAppointment(req, res) {
    const response = await client.db("Prototype").collection("Appointments")
    .insertOne({nric: req.body.nric, date: req.body.date, location: req.body.location, reason: req.body.reason, time: req.body.time})
    return res.json("Completed")
}

export async function getAppointments(req, res) {
    console.log(req.query.nric)
    const response = await client.db("Prototype").collection("Appointments").find({nric: req.query.nric}).toArray()
    return res.send(response)
}

export async function addOrders(req, res) {
    const response = await client.db("Prototype").collection("Medications").insertOne({nric: req.body.nric, medication: req.body.medication, dropoff: req.body.dropoff})
    return res.json("Completed")
}