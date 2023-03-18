
const express = require("express");
const BlogService = require("../Services/blog.service");
require("dotenv").config();


async function getAllBlogs(req,res){

    try {
        const blogs = await BlogService.getAllBlogs();
        console.log(blogs)
        // if(!blogs){
        //     res.status(200).send("Blog list empty!");
        // }
        res.status(200).send(blogs);
        } catch (err) {
            res.status(err.status).send(err.message);
        }
    }


async function createBlog(req,res){

    try {
        const createdBlog = await BlogService.createBlog(req.body);
        res.status(200).send(createdBlog);
        } catch (err) {
            res.status(err.status).send(err.message);
        }

}

async function editBlog(req,res){

    try {
        const blog = await BlogService.editBlog(req.params.blogId,req.body.title,req.body.description);
        res.status(200).json(blog);
    } catch (err) {
        res.status(err.status).json(err.message);
    }

    
}

async function getBlogById(req,res){

    try {
        const blog = await BlogService.getBlogById(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


async function updateBlog(req,res){

    try {
        const data = await BlogService.updateBlog(req.params.blogId, req.body);
        res.status(data.status).send(data.message);
      } catch (err) {
        res.status(err.status).send(err.message);
      }

    
}

async function deleteBlog(req,res){

try{
    const deleteBlog = await BlogService.deleteBlog(req.params.blogId);
    // if(deleteBlog){
    //     res.status(200).send(deleteBlog.message);
    // }
    // else {
    //     res.status(404).send('Blog not found');
    // }
    res.status(200).send("deleted")

    } catch (err) {
        res.status(err.status).json(err.message);
    }



}

module.exports = {

    getAllBlogs,
    createBlog,
    editBlog,
    getBlogById,
    updateBlog,
    deleteBlog

};