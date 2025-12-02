import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import bookingModel from "../models/bookingModel.js";
import { v2 as cloudinary } from 'cloudinary'
import instructorModel from "../models/instructorModel.js";


// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
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

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name && !phone && !dob && !gender && !imageFile) {
            return res.json({ success: false, message: "Data Missing" })
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = JSON.parse(address);
        if (dob) updateData.dob = dob;
        if (gender) updateData.gender = gender;

        await userModel.findByIdAndUpdate(userId, updateData)

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
const bookings = async (req, res) => {

    try {

        const { userId, instrId, slotDate, slotTime } = req.body
        const instructorData = await instructorModel.findById(instrId).select("-password")

        if (!instructorData.available) {
            return res.json({ success: false, message: 'Instructor Not Available' })
        }

        let slots_booked = instructorData.slots_booked

        // checking for slot availablity 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password")

        delete instructorData.slots_booked

        const bookingData = {
            userId,
            instrId,
            userData,
            instructorData,
            amount: instructorData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newBookings = new bookingModel(bookingData)
        await newBookings.save()

        // save new slots data in instructorData
        await instructorModel.findByIdAndUpdate(instrId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to book a package
const bookPackage = async (req, res) => {
    try {
        const { userId, packageId, packageName, price, date, time, location, instructor } = req.body;

        const bookingData = {
            userId,
            packageId,
            packageName,
            amount: price,
            date: date, // Can be string now
            slotDate: date, // Map to slotDate for consistency if needed
            slotTime: time, // Map to slotTime
            location,
            instructorData: { name: instructor }, // Store instructor name in object
            status: 'confirmed',
            payment: false,
            isCompleted: false
        };

        // If we have a real instructor ID, we could fetch data, but for now let's just save the booking
        // You might want to update the bookingModel to support these fields if they don't exist

        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        res.json({ success: true, message: 'Package Booked Successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment
const cancelBooking = async (req, res) => {
    try {

        const { userId, bookingId } = req.body
        const bookingData = await bookingModel.findById(bookingId)

        if (!bookingData) {
            return res.json({ success: false, message: 'Booking not found' })
        }

        // verify appointment user 
        if (bookingData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        // releasing instructor slot if applicable
        const { instructorId, slotDate, slotTime } = bookingData

        if (instructorId && slotDate && slotTime) {
            const instructorData = await instructorModel.findById(instructorId)

            if (instructorData) {
                let slots_booked = instructorData.slots_booked || {}

                if (slots_booked[slotDate]) {
                    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
                    await instructorModel.findByIdAndUpdate(instructorId, { slots_booked })
                }
            }
        }

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const bookings = await bookingModel.find({ userId }).sort({ _id: -1 })

        res.json({ success: true, bookings, userId })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookings, listAppointment, cancelBooking, bookPackage }