import { loginAdmin, bookingsAdmin, bookingCancel, addInstructor, allInstructors, adminDashboard} from "../controllers/adminController.js"
import { changeAvailablity } from "../controllers/instructorController.js";

import express from 'express';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-instructor", authAdmin, upload.single('image'), addInstructor)
adminRouter.get("/bookings", authAdmin, bookingsAdmin)
adminRouter.post("/cancel-booking", authAdmin, bookingCancel)
adminRouter.get("/all-instructors", authAdmin, allInstructors)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;