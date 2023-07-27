const express = require('express');
const router = express.Router();
const { User } = require("../models")
const bcrypt = require('bcrypt');

const {sign} = require('jsonwebtoken')

const { validateToken } = require ('../middlewares/AuthMiddleware')

// Get all Users
router.get("/", async (req, res) => {
  try {
    const listOfUsers = await User.findAll();
    res.json(listOfUsers);
  } catch (error) { 
    console.error('Error fetching Users:', error);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
 
  const UserData = await User.findOne({ where: { Email: Email } });

  if (!UserData) {
   
    return res.status(404).json({ error: 'User not found' });
  }
 
  bcrypt.compare(Password, UserData.Password)
    .then((match) => {
      if (!match) {
        return res.status(401).json({ error: 'Wrong Email and Password Combination!' }); 
      }
      const accessToken = sign({Email:UserData.Email, Role:UserData.UserRole},
        "jsonwebtokensecret"
        );

      res.json({token: accessToken, username: UserData.Email, Role: UserData.UserRole});
      
    })
    .catch((error) => {
      console.error('Error comparing passwords:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// router.post("/login", async (req, res) => {
//   const { Password, Email } = req.body;
//   const existingUser = await User.findOne({ where: { Email: Email } });
//   if (!existingUser) {
//     res.json({ error: "User Doesn't Exist" });
//   } else {
//     bcrypt.compare(Password, existingUser.Password).then((match) => {
//       if (!match) {
//         res.json({ error: "Wrong Username and Password Combination" });
//       } else {
//         const accessToken = sign(
//           { Email: existingUser.Email, UserRole: existingUser.UserRole },
//           "jsonwebtokensecret"
//         );
//         res.json(accessToken);
//       }
//     });
//   }
// });

// Create a new User
router.post("/", async (req, res) => {
  try {
    const UserData = req.body;
    const hash = await bcrypt.hash(UserData.Password, 10);
    await User.create({
      UserID: UserData.UserID,
      Email: UserData.Email,
      Password: hash,
      UserRole: UserData.UserRole,
    });

    res.json("User created successfully");
  } catch (error) {
    console.error('Error creating User:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// router.post("/login", async (req, res) => {
//   const { Email, Password } = req.body;
//   const UserData = await User.findOne({ where: { Email: Email } });

//   if (!UserData) {
//     return res.status(404).json({ error: 'User not found' });
//   }

//   bcrypt.compare(Password, UserData.Password)
//     .then((match) => {
//       if (!match) {
//         return res.status(401).json({ error: 'Wrong Email and Password Combination!' }); 
//       }
//       const accessToken = sign({Email:UserData.Email, Role:UserData.UserRole, id: UserData.UserID},
//         "jsonwebtokensecret"
//         );

//       res.json({token: accessToken, username: UserData.Email, Role: UserData.UserRole, id: UserData.UserID});
      
//     })
//     .catch((error) => {
//       console.error('Error comparing passwords:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });

// Update an User
router.put("/:id", async (req, res) => {
  try {
    const UserId = req.params.id;
    const updatedUserData = req.body;
    const [rowsUpdated] = await User.update(updatedUserData, {
      where: { id: UserId }
    });
    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating User:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an User
router.delete("/:id", async (req, res) => {
    try {
      const UserId = req.params.id;
      const rowsDeleted = await User.destroy({
        where: { UserID: UserId } // Update the field name to match your database column name
      });
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting User:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/Authentication', validateToken,(req,res) =>{
    res.json(req.user)
  })
  
module.exports = router;
 