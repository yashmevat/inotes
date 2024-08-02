const express = require("express")
const user = require("../models/userModel");
const checkAuth = require("../middleware/checkAuth");
const notes = require("../models/notesModel");
const router = express.Router();

router.post("/add",checkAuth,async (req,res)=>{
        const {title,description} = req.body;
        let myuser = req.user;
        try {
            if(title!="" && description!=""){
                const newnote = await notes.create({
                    title,description,userId:myuser.id
                })
                if(newnote)
                {
                    req.flash("success_msg","Added Successfully")
                    res.redirect("/note/show");
                }
                else{
                    req.flash("error_msg","unsuccessfull to Add")
                    return res.redirect("/user/dashboard");
                }
            }
            else{
                req.flash("error_msg","Both Fields are mandatory")
                return res.render("dashboard")
            }
        } catch (error) {
        res.send({error});
        }
})
router.get("/show",checkAuth,async (req,res)=>{
    try {
        let allNotes = await notes.find({userId : req.user.id});
        if(allNotes.length >= 1){
            req.flash("success_msg","succesfully Fetched")
            res.render("showNotes",{notes:allNotes})
        }else{
            req.flash("error_msg","Sorry No Notes To Show")
           return res.redirect("/user/dashboard")
        }
    } catch (error) {
        res.send({error});
    }

})
router.get("/edit/:id",checkAuth,async(req,res)=>{
    try {
        let editNote = await notes.findById({_id:req.params.id})
        res.render("editNote",{editNote});
    } catch (error) {
        console.log(error)
    }
})
router.post("/edit/:id",checkAuth,async(req,res)=>{
    try {
        let {title,description} = req.body;
        let noteId = req.params.id;
        let editNote = await notes.findByIdAndUpdate({_id:noteId},{$set:{title:title,description:description}})
        if(editNote){
            let allNotes = await notes.find({userId:String(req.user.id)})
            req.flash("success_msg","edited Successfully")
            res.render("showNotes",{notes:allNotes})
        }else{
            req.flash("error_msg","Unable to edit The Note")
           return res.redirect("/note/show")
        }
    } catch (error) {
        console.log(error)
    }
})
router.get("/delete/:id",checkAuth,async (req,res)=>{
    try {
        let noteid = req.params.id
        let deletednote = await notes.findByIdAndDelete({_id:noteid});
        if(deletednote){
            let allNotes = await notes.find({userId:String(req.user.id)})
            req.flash("success_msg","succesfully deleted")
            res.render("showNotes",{notes:allNotes})
        }else{
            req.flash("error_msg","Unable to delete The Note")
           return res.redirect("/note/show")
        }
    } catch (error) {
        console.log(error)
    }

})
module.exports  = router