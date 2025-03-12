import {Router} from 'express';
import { student } from '../model/student.js';

const adminauth = Router();

adminauth.post('/addstudent', async (req, res) => {
    try {
        const { StudentName, EnrollmentNumber, Course, DateOfEnrollment } = req.body;

        if (!StudentName || !EnrollmentNumber || !Course || !DateOfEnrollment) {
            return res.status(400).json({ msg: 'All fields are required!' });
        }

        const existingStudent = await student.findOne({ S_EnrollmentNo: EnrollmentNumber });

        if (existingStudent) {
            return res.status(409).json({ msg: 'Student details already exist' });
        }

        const newStudent = new student({
            S_name: StudentName,
            S_EnrollmentNo: EnrollmentNumber,
            S_coures: Course,  
            S_dateOfEnrollment: DateOfEnrollment,
        });

        await newStudent.save();
        res.status(201).json({ msg: 'Student added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

adminauth.get('/getStudent', async (req, res) => {
    try {
        if (req.query.S_EnrollmentNo) {
            const studentData = await student.findOne({ S_EnrollmentNo: req.query.S_EnrollmentNo });

            if (!studentData) {
                return res.status(404).json({ msg: 'Student not found' });
            }

            return res.status(200).json({ data: studentData });
        } else {
            const students = await student.find();

            if (!students.length) {
                return res.status(404).json({ msg: 'No students found' });
            }

            res.status(200).json({ data: students });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

export { adminauth };
