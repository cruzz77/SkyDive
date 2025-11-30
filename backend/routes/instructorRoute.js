import express from 'express';
import { loginInstructor, bookingInstructor, bookingCancel, instructorList, changeAvailablity, bookingComplete, instructorDashboard, instructorProfile, updateInstructorProfile } from '../controllers/instructorController.js';
import authInstructor from '../middlewares/authInstructor.js';

const instructorRoute = express.Router();

instructorRoute.post("/login", loginInstructor)
instructorRoute.post("/cancel-booking", authInstructor, bookingCancel)
instructorRoute.get("/bookings", authInstructor, bookingInstructor)
instructorRoute.get("/list", instructorList)
instructorRoute.post("/change-availability", authInstructor, changeAvailablity)
instructorRoute.post("/complete-booking", authInstructor, bookingComplete)
instructorRoute.get("/dashboard", authInstructor, instructorDashboard)
instructorRoute.get("/profile", authInstructor, instructorProfile)
instructorRoute.post("/update-profile", authInstructor, updateInstructorProfile)

export default instructorRoute;