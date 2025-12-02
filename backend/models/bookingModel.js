import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    instructorId: { type: String, required: false }, // Optional for package bookings
    slotDate: { type: String, required: false },     // Optional for package bookings
    slotTime: { type: String, required: false },     // Optional for package bookings
    userData: { type: Object, required: false },     // Optional, can be fetched via userId
    instructorData: { type: Object, required: false }, // Optional for package bookings
    amount: { type: Number, required: true },
    date: { type: mongoose.Schema.Types.Mixed, required: true }, // Allow String (ISO date) or Number (timestamp)
    packageName: { type: String, required: false },  // Added for package bookings
    packageId: { type: String, required: false },    // Added for package bookings
    location: { type: String, required: false },     // Added for package bookings
    status: { type: String, default: 'pending' },    // Added status field
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
})

const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema)
export default bookingModel