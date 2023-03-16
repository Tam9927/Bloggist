
const express = require("express");
const BlogService = require("../Services/blog.service");
require("dotenv").config();


async function getAllBlogs(){

    try {
        const blogs = await BlogService.getAllBlogs();
        if(!blogs){
            res.status(200).send("Blog list empty!");
        }
        res.status(200).send(blogs);
        } catch (err) {
            res.status(err.status).send({error: err.message});
        }
    }


async function createBlog(){



    
    
}

async function editBlog(){


    
}

async function getBlogById(){


    
}

async function updateBlog(){


    
}

async function deleteBlog(){





}

module.exports = {

    getAllBlogs,
    createBlog,
    editBlog,
    getBlogById,
    updateBlog,
    deleteBlog

};