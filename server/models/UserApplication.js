import mongoose from 'mongoose';


const userApplicationSchema = new mongoose.Schema({
  designationName: String,
  workingArea: String,
  yourHonor: String,
  fullName: String,
  motherName: String,
  fatherName: String,
  dateOfBirth: Date,
  selectGender: String,
  localAddress: String,
  localPincode: String,
  permanentAddress: String,
  permanentPincode: String,
  caste: String,
  marriedStatus: String,
  mobileNo: String,
  emailId: String,
  academicQualification: String,
  technicalQualification: String,
  workingKnowledge: String,

  // Uploaded file paths
  profileImage: String,
  aadharFrontImage: String,
  aadharBackImage: String,
  panCardImage: String,
  tenthMarksheetImage: String,
  twelthMarksheetImage: String,
  postGraduateImage: String,
  graduateImage: String,
  bankCheque: String,
  technicalCertification: String,
  academicCertification: String,

  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('UserApplication', userApplicationSchema);
