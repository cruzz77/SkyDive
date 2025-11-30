import express from 'express';
import { loginUser, registerUser, getProfile, updateProfile, bookings, listAppointment, cancelBooking } from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/booking", authUser, bookings)
userRouter.get("/listBookings", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelBooking)

export default userRouter;