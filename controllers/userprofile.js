const UserProfile = require('../models/userporfile');
const { check, validationResult } = require('express-validator');
exports.getUserProfile = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add UserProfile',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postUserProfile = async (req, res, next) => {
    const userProfileData = req.body;
    const errors = validationResult(req);   // need to create a different util for validation
    if(!errors.isEmpty()){
        console.log(errors.array());
        return res.status(422).render("auth/signup",{
          path: 'auth/signup',
          pageTitle: 'Signup',
          errorMessage: errors.array()[0].msg,
          oldInput: userProfileData,
          validationErrors: errors.array()
        })
      }
    try {
      
        // Create a new user profile document
        const userProfile = new UserProfile(userProfileData);
    
        // Save the user profile to the database
        await userProfile.save();
    
        res.status(201).json(userProfile);
      } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ error: 'Error creating user profile' });
      }


};

exports.getEditProfile = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const userId = req.params.userId;
  UserProfile.findById(userId._id)
    .then(UserProfile => {
      if (!UserProfile) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        UserProfile: UserProfile
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProfile = (req, res, next) => {
   const userProfileData = req.body;

   UserProfile.findById(userProfileData.userId)
    .then(UserProfile => {
        UserProfile = userProfileData;
         return UserProfile.save();
    })
    .then(result => {
      console.log('UPDATED USERPROFILE !');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getUserProfileDisplay = async (req, res, next) => {

 const user = await UserProfile.findOne({ firstName: 'John' });
const sortedExperience = user.experience.reverse();
const sortedEducation = user.education.reverse();
const sortedSkills = user.skills.reverse();

console.log(sortedExperience);
console.log(sortedEducation);
console.log(sortedSkills);


    const userId = req.params.userId;
    UserProfile.findById(userId._id)
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(UserProfile => {
      console.log(UserProfile);
      res.render('admin/products', {
        UserProfile: UserProfile,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteUserProfile = (req, res, next) => {
  const userId = req.body.userId;
  UserProfile.findByIdAndRemove(userId._id)
    .then(() => {
      console.log('DESTROYED UserProfile');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
