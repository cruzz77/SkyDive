import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import instructorModel from "../models/instructorModel.js";
import bookingModel from "../models/bookingModel.js";

// API for doctor Login 
const loginInstructor = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await instructorModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor bookings for instructor panel
const bookingInstructor = async (req, res) => {
    try {

        const { instructorId } = req.body
        const bookings = await bookingModel.find({ instructorId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for doctor panel
const bookingCancel = async (req, res) => {
    try {

        const { instructorId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)
        if (bookingData && bookingData.instructorId === instructorId) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })
            return res.json({ success: true, message: 'Booking Cancelled' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark booking completed for instructor panel
const bookingComplete = async (req, res) => {
    try {

        const { instructorId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)
        if (bookingData && bookingData.instructorId === instructorId) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true })
            return res.json({ success: true, message: 'Booking Completed' })
        }

        res.json({ success: false, message: 'Booking Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all instructors list for Frontend
const instructorList = async (req, res) => {
    try {

        const instructors = await instructorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, instructors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change instructor availablity for Admin and Instructor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { instructorId } = req.body

        const instrData = await instructorModel.findById(instructorId)
        await instructorModel.findByIdAndUpdate(instructorId, { available: !instrData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const instructorProfile = async (req, res) => {
    try {

        const { instructorId } = req.body
        const profileData = await instructorModel.findById(instructorId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update instructor profile data from  Instructor Panel
const updateInstructorProfile = async (req, res) => {
    try {

        const { instructorId, fees, address, available } = req.body

        await instructorModel.findByIdAndUpdate(instructorId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for doctor panel
const instructorDashboard = async (req, res) => {
    try {

        const { instructorId } = req.body

        const bookings = await bookingModel.find({ instructorId })

        let earnings = 0

        bookings.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let clients = []

        bookings.map((item) => {
            if (!clients.includes(item.userId)) {
                clients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            bookings: bookings.length,
            clients: clients.length,
            latestAppointments: bookings.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginInstructor,
    bookingInstructor,
    bookingCancel,
    instructorList,
    changeAvailablity,
    bookingComplete,
    instructorDashboard,
    instructorProfile,
    updateInstructorProfile
}