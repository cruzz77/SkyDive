import jwt from "jsonwebtoken";
import instructorModel from "../models/instructorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import bookingModel from "../models/bookingModel.js";
import packageModel from "../models/packageModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === (process.env.ADMIN_EMAIL || 'sky@example.com') && password === (process.env.ADMIN_PASSWORD || '1234567')) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all bookings list
const bookingsAdmin = async (req, res) => {
    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for booking cancellation
const bookingCancel = async (req, res) => {
    try {

        const { bookingId } = req.body
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Instructor
const addInstructor = async (req, res) => {

    try {

        const { name, email, password, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add doctor
        if (!name || !email || !password || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const instructorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newInstructor = new instructorModel(instructorData)
        await newInstructor.save()
        res.json({ success: true, message: 'Instructor Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all Instructor list for admin panel
const allInstructors = async (req, res) => {
    try {

        const instructors = await instructorModel.find({}).select('-password')
        res.json({ success: true, instructors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const instructors = await instructorModel.find({})
        const users = await userModel.find({})
        const bookings = await bookingModel.find({})

        const dashData = {
            instructors: instructors.length,
            bookings: bookings.length,
            patients: users.length,
            latestAppointments: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to add package
const addPackage = async (req, res) => {
    try {
        const { name, price, altitude, difficulty, weather, features } = req.body;

        if (!name || !price || !altitude || !difficulty || !weather || !features) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const packageData = {
            name,
            price,
            altitude,
            difficulty,
            weather,
            features
        }

        const newPackage = new packageModel(packageData)
        await newPackage.save()

        res.json({ success: true, message: "Package Added Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    bookingsAdmin,
    bookingCancel,
    addInstructor,
    allInstructors,
    adminDashboard,
    addPackage
}