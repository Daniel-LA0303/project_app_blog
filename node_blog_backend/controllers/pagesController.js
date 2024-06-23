import { getAllCategorisInfo, getCategories, getCategoriesNotZero, getOneCategory } from "./categoriesController.js";
import { getAllCommentsByPost } from "./commentsController.js";
import { filterPostByCategory, getAllPosts, getAllPostsCard, getEditOnePost, getUserPost, getViewPost } from "./postController.js"
import { getOneUserEditProfile, getOneUserFollow, getOneUserProfile, getOneUserShortInfo, getUserLikePosts, getUserPosts, getUserSavePosts, getUserTags } from "./usersController.js";


/**
 * Get Home Page
 * @param {*} req 
 * @param {*} res 
 */
const getPageHome = async (req, res) => {
    try {
        console.log("waiting Home");
        const [posts, categories] = await Promise.all([getAllPostsCard(), getCategoriesNotZero()]);
        res.status(200).json({
            posts,
            categories,
        });
        console.log("success Home");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Categories Page
 * @param {*} req 
 * @param {*} res 
 */
const getCategoriesPage = async (req, res) => {
    try {
        console.log("waiting Categories");
        const categories = await getAllCategorisInfo();
        res.status(200).json({
            categories
        });
        console.log("success Categories");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Category Post Page
 * @param {*} req 
 * @param {*} res 
 */
const getCategoryPostPage = async (req, res) => {
    try {
        console.log("waiting CategoryPost");
        const [posts, category] = await Promise.all([filterPostByCategory(req.params.id), getOneCategory(req.params.id)]);
        res.status(200).json({
            posts,
            category
        });
        console.log("success CategoryPost");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Dashboard Page
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardPage = async (req, res) => {
    try {
        console.log("waiting Dashboard");
        const userInfo = await getOneUserShortInfo(req.params.id);
        res.status(200).json({
            userInfo
        });
        console.log("success Dashboard");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}


/**
 * Get Dashboard Posts User Page
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardPostsUserPage = async (req, res) => {
    try {
        console.log("waiting DashboardPosts");
        const posts = await getUserPosts(req.params.id);
        res.status(200).json({posts});
        console.log("success DashboardPosts");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Dashboard Follow User Page
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardFollowUserPage = async (req, res) => {
    try {
        console.log("waiting DashboardFollow");
        const userInfo = await getOneUserFollow(req.params.id);
        res.status(200).json({
            followers: userInfo.followers,
            followed: userInfo.followed
        });
        console.log("success DashboardFollow");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Dashboard Like Post User Page
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardLikePostUserPage = async (req, res) => {
    try {
        console.log("waiting DashboardLike");
        const userInfo = await getUserLikePosts(req.params.id);
        res.status(200).json({
            userInfo
        });
        console.log("success DashboardLike");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Dashboard Saved Post User Page
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardSavedPostUserPage = async (req, res) => {
    try {
        console.log("waiting DashboardSaved");
        const posts = await getUserSavePosts(req.params.id);
        res.status(200).json({
            posts
        });
        console.log("success DashboardSaved");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }

}

/**
 * Get Dashboard Tags User Page
 * @param {*} req 
 * @param {*} res 
 */
const getDashboardTagsUserPage = async (req, res) => {
    try {
        console.log("waiting DashboardTags");
        const categories = await getUserTags(req.params.id);
        res.status(200).json({
            categories
        });
        console.log("success DashboardTags");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Profile Info Page
 * @param {*} req 
 * @param {*} res 
 */
const getProfileInfoPage = async (req, res) => {
    try {
        console.log("waiting ProfileInfo");
        const [posts, user] = await Promise.all([getUserPosts(req.params.id), getOneUserProfile(req.params.id)]);
        res.status(200).json({
            posts,
            user
        });
        console.log("success ProfileInfo");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }

}

/**
 * Get Categories New Post Page
 * @param {*} req 
 * @param {*} res 
 */
const getCategoriesNewPostPage = async (req, res) => {
    try {
        console.log("waiting CategoriesNewPost");
        const categories = await getCategories();
        res.status(200).json({
            categories
        });
        console.log("success CategoriesNewPost");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Profile Edit User Page
 * @param {*} req 
 * @param {*} res 
 */
const getProfileEditUserPage = async (req, res) => {
    try {
        console.log("waiting ProfileEdit");
        const user = await getOneUserEditProfile(req.params.id);   
        res.status(200).json({
            user
        });
        console.log("success ProfileEdit");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }
}

/**
 * Get Edit Post Page
 * @param {*} req 
 * @param {*} res 
 */
const getEditPostPage = async (req, res) => {
    try {
        console.log("waiting EditPost");
        const [post, categories] = await Promise.all([getEditOnePost(req.params.id), getAllCategorisInfo()]);
        res.status(200).json({
            post,
            categories
        });
        console.log("success EditPost");
    } catch (error) {
        res.status(500).json({ error: 'Error', details: error });
    }

}

/**
 * Get View Post Page
 */
const getViewPostPage = async (req, res) => {
    try {
        console.log("waiting ViewPost");
        const [comments, post] = await Promise.all([
            getAllCommentsByPost(req.params.id),
            getViewPost(req.params.id)
        ]);
        res.status(200).json({
            comments,
            post,
        });
        console.log("success ViewPost");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Error', details: error.message });
    }
}
export {
    /**
     * 
     */
    getPageHome,
    getCategoriesPage,
    getCategoryPostPage,
    getCategoriesNewPostPage,
    /**
     * 
     */
    getDashboardPage,
    getDashboardPostsUserPage,
    getDashboardFollowUserPage,
    getDashboardLikePostUserPage,
    getDashboardSavedPostUserPage,
    getDashboardTagsUserPage,
    /**
     * 
     */
    getProfileInfoPage,
    getProfileEditUserPage,
    getEditPostPage,
    getViewPostPage
}
