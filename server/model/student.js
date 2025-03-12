import { Schema, model } from 'mongoose';

const Sdetails = new Schema({
  S_name: { type: String, required: true },
  S_EnrollmentNo: { type: String, required: true, unique: true },
  S_coures: { type: String, required: true },
  S_dateOfEnrollment: { type: String, default: Date.now },
});

const student = model('StudentDetails', Sdetails);
export { student };
