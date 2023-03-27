require('express');
const BlogService = require('../services/blog.service');
require('dotenv').config();
const contentNegotiation = require('../utils/content-negotiation');
const paginator = require('../utils/pagination');

async function getAllBlogs(req, res) {
    try {
        const [pageNumber, pageSize] = paginator(req);

        const blogs = await BlogService.getAllBlogs(pageNumber, pageSize);

        const status = 200;

        contentNegotiation.sendResponse(
            req,
            res,
            status,
            blogs.message.length ? blogs.message : 'Blog list is empty',
        );
    } catch (err) {
        res.status(401).send(err.message);
    }
}

async function createBlog(req, res) {
    try {
        const createdBlog = await BlogService.createBlog(req.body, req.username);
        contentNegotiation.sendResponse(req, res, 201, createdBlog);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

async function getBlogByBlogId(req, res) {
    try {
        const blog = await BlogService.getBlogByBlogId(req.params.blogId);
        contentNegotiation.sendResponse(req, res, 201, blog);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

async function updateBlog(req, res) {
    try {
        const data = await BlogService.updateBlog(req.params.blogId, req.body);

        if (data.message[0] === 1) {
            contentNegotiation.sendResponse(req, res, 200, 'Blog edited successfully');
        } else {
            res.status(400).json('Blog could not be edited. Please try again');
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function deleteBlog(req, res) {
    try {
        const deletedBlog = await BlogService.deleteBlog(req.params.blogId, req.username);
        if (deletedBlog) {
            contentNegotiation.sendResponse(req, res, 200, 'Blog deleted');
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
