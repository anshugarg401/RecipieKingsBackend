const mongoose = require("mongoose");
const { check } = require("express-validator");
const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
  },
});
const school10Schema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
      },
      
      board: {
        type: String,
        required:true
      },
      percentage: {
        type: Number,
        required:true
      },
      passingYear: {
        type: Date,
        required: true,
      },
     
     
  });
const school12Schema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
      },
      
      board: {
        type: String,
        required:true
      },
      stream:{
        type:String,
        required:true,
      },
      percentage: {
        type: Number,
        required:true
      },
      passingYear: {
        type: Date,
        required: true,
      },
     
     
  });

  const addEducationSchema = new mongoose.Schema({
    institutionName: {
        type: String,
        required: true,
      },
    
      stream:{
        type:String,
        required:true,
      },
      percentage: {
        type: Number,
        required:true
      },
      passingYear: { 
        type: Date,
        required: true,
      },
     
     
  });

const educationSchema = new mongoose.Schema({
  school10th: {
    type: school10Schema,
    required: true,
  },
  school12th: {
    type: school12Schema,
    required: true,
  },
  educationLevel: {
    type:[ addEducationSchema],
   
  },

});



const phoneSchema = new mongoose.Schema({
    countryCode: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  });
const websiteSchema = new mongoose.Schema({
    linkedinURL: {
        type: String,
         validator: check(value,"invalid_URL").optional().isURL()  // value should be string
    
      },
    githubURL: {
        type: String,
         validator: check(value,"invalid_URL").optional().isURL()  // value should be string
    
      },
    link: {
        type: String,
         validator: check(value,"invalid_URL").optional().isURL()  // value should be string
    
      },
  });
  // Course Schema
const courseAndCertificationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cerificate: {
      type: websiteSchema
     
    },
    issuingAuthority: {
      type: String,
      required: true
    },
    
    dateIssued: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  


  


const userprofileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName:{
    type:String,
    
  },
  lastName: {
    type: String,
    required: true,
  },
  imageURL:{
    type:String,
    required : true
  },

  phone: {
    type: phoneSchema,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required:true,
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  website: {
    type: [websiteSchema],
  },

  headline: {
    type: String,
  },
  summary: {
    type: String,
  },
  experience: {
    type: [experienceSchema],
    default: undefined,
  },
  education: {
    type: [educationSchema],
    default: undefined,
  },
  courseAndCertification: {
    type: [courseAndCertificationSchema],
    default: undefined,
  },
 
  skills: {
    type: [String],
    default: undefined,
  },
  lastActive:{
    type :Date,
    default : Date.now
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

userSchema.index({
  firstName: "text",
  lastName: "text",
  headline: "text",
  summary: "text",
});

const UserProfile = mongoose.model("UserProfile", userprofileSchema);

module.exports = UserProfile;


