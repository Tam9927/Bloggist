const express = require('express');
const BlogService = require('../services/blog.service');
require('dotenv').config();

async function getAllBlogs(req, res) {
    try {
        const blogs = await BlogService.getAllBlogs();
        console.log(blogs);
        if (!blogs) {
            res.status(200).send('Blog list empty!');
        }
        res.status(200).send(blogs);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

async function createBlog(req, res) {
    try {
        const createdBlog = await BlogService.createBlog(req.body, req.username);
        res.status(200).send(createdBlog);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

async function getBlogByBlogId(req, res) {
    try {
        const blog = await BlogService.getBlogByBlogId(req.params.blogId);
        res.status(200).json(blog);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

async function updateBlog(req, res) {
    try {
        const data = await BlogService.updateBlog(req.params.blogId, req.body);
        console.log(data);
        if (data.message[0] == 1) {
            res.status(200).json('Blog edited successfully');
        } else {
            res.status(400).json('Blog could not be edited. Please try again');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function deleteBlog(req, res) {
    try {
        const deleteBlog = await BlogService.deleteBlog(req.params.blogId, req.username);
        if (deleteBlog) {
            res.status(200).send('Deleted Successfully');
        } else {
            res.status(404).send('Blog not found');
        }
        res.status(200).send('deleted');
    } catch (err) {
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    getAllBlogs,
    createBlog,
    getBlogByBlogId,
    updateBlog,
    deleteBlog,
};
