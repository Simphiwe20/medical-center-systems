
const doctor = require('../models/doctor')
const patient = require('../models/patient')
const receptionist = require('../models/receptionist')

// const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send(req);
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getPatient: async (req, res) => {
        try {

            const result = await patient.findAll(req.params)
            // console.log(result)
            console.log(req.params)
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addPatient: async (req, res) => {
        try {
            let payload = { ...req.body };
            const newPatient = new patient(payload)
            const result = await newPatient.save()
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getDoctor: async (req, res) => {
        try {
            const result = await Doctor.findOne(req.params)
            console.log(result)
            console.log(req.params)
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addDoctor: async (req, res) => {
        try {
            let payload = { ...req.body };
            const newDoctor = new doctor(payload)
            const result = await newDoctor.save()
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getReceptionist: async (req, res) => {
        try {
            const result = await receptionist.findOne(req.params)
            console.log(result)
            console.log(req.params)
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addReceptionist: async (req, res) => {
        try {
            let payload = { ...req.body };
            const newDoctor = new receptionist(payload)
            const result = await newDoctor.save()
            res.send(result);
        } catch (error) {
            res.status(500).send(error)
        }
    }

}
