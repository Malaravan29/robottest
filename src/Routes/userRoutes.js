import { Router } from 'express';
import { getUserDetails, updateUserPhoneNumber } from '../Controllers/userControllers.js';

const router = Router();

// Route to get user details
router.get('/user/details', getUserDetails);

// Route to update user phone number
router.put('/user/phone', updateUserPhoneNumber);

export default router;
