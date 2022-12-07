const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');
const router = express.Router();


router.get("/api/members", (req, res) => {
  res.json(members);
});

router.get("/api/members/:id", (req, res) => {
  console.log(req.params.id);
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    res.json(members.filter((member) => member.id == req.params.id));
  } else {
    res.json("Not Found");
  }
});


// Create Member
router.post('/api/members', (req, res) => {
    const newMember = {
      ...req.body,
      id: uuid.v4(),
      status: 'active'
    };

    console.log(newMember);
  
    if (!newMember.name || !newMember.email) {
      return res.status(400).json({ msg: 'Please include a name and email' });
    }
  
    members.push(newMember);
    res.json(members);

    //With handbars instaed of displaying json we can redirect to a page
    // res.redirect('/index'); 
  });

 // Update Member
router.put('/api/members/:id', (req, res) => {
    const found = members.some((member) => member.id == req.params.id);
  
    // if (found) {
    //   members.forEach((member, i) => {
    //     if (member.id == req.params.id) {
    //       const updMember = {...member, ...req.body};
    //       members[i] = updMember
    //       res.json({ msg: 'Member updated', updMember });
    //     }
    //   });
    // } 



    if (found) {
        const updMember = req.body;
        members.forEach((member, i) => {
          if (member.id == req.params.id) {
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;
            res.json({ msg: 'Member updated', member });
          }
        });
        
      } 
    else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  }); 


  // Delete Member
router.delete('/api/members/:id', (req, res) => {
    const found = members.some((member) => member.id == req.params.id);
  
    //const idFilter = req => member => member.id === parseInt(req.params.id);

    function idFilter(req,member){
         if (member.id === parseInt(req.params.id)){
              return true;
         }
         else {
            return false;
         }
    }
    
    if (found) {
      res.json({
        msg: 'Member deleted',
        members: members.filter(member => ! idFilter(req,member))
      });
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });


module.exports = router;