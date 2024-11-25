// Import required modules
const USER = require('../Models/users.models');

// Import utility modules
const asyncHandler = require('../utils/AsyncHandler');
const CustomApiError = require('../utils/CustomApiErros');
const CustomApiResponse = require('../utils/CustomApiResponse');

/**
 * User SignUp Controller
 * @route POST /api/v1/user/signup
 * @access Public
 */
const SignUpUser = asyncHandler(async (req, res) => {
    // Destructure user registration details
    const { email, password, username } = req.body;

    // Check if email already exists
    const emailCheck = await USER.findOne({ email });
    if (emailCheck) {
        throw new CustomApiError(
            400,
            'User with this email already exists!'
        );
    }

    // Check if username already exists
    const usernameCheck = await USER.findOne({ username });
    if (usernameCheck) {
        throw new CustomApiError(
            400,
            'User with this username already exists!'
        );
    }

    // Create new user
    const CreateUser = await USER.create({
        username,
        email,
        password
    });

    // Verify user creation and exclude password
    const FindUser = await USER.findById(CreateUser._id).select('-password');
    if (!FindUser) {
        throw new CustomApiError(
            500, // Changed to 500 for server error
            'Something went wrong while creating the user'
        );
    }

    // Redirect to signin page
    return res.status(200).redirect('/api/v1/user/signin');
});

/**
 * User SignIn Controller
 * @route POST /api/v1/user/signin
 * @access Public
 */
const SignInUser = asyncHandler(async (req, res) => {
    // Destructure login credentials
    const { email, password, username } = req.body;

    // Find user by email or username
    const user = await USER.findOne({
        $or: [{ email }, { username }]
    });

    // Validate user existence
    if (!user) {
        throw new CustomApiError(
            404, // Changed to 404 for not found
            'User not found!'
        );
    }

    // Verify password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new CustomApiError(
            401, // Changed to 401 for unauthorized
            'Incorrect username or password!'
        );
    }

    // Find logged-in user and generate access token
    const LoggedUser = await USER.findById(user._id).select('-password');
    const accessToken = await LoggedUser.CreateAccessToken();

    // Set access token in cookie and redirect to home
    return res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
        .redirect('/home');
});

/**
 * User SignOut Controller
 * @route GET /api/v1/user/signout
 * @access Private
 */
const SignOutUser = asyncHandler(async (req, res) => {
    // Clear access token cookie and redirect to signin
    return res.clearCookie('accessToken').redirect('/api/v1/user/signin');
});

/**
 * Get User Profile Controller
 * @route GET /api/v1/user/profile
 * @access Private
 */
const getuserprofile = asyncHandler(async (req, res) => {
    // Extract user ID from authenticated request
    const userId = req.user._id;

    // Validate user ID
    if (!userId) {
        throw new CustomApiError(
            401,
            'Unauthorized: Invalid user ID'
        );
    }

    // Fetch user profile
    const user = await USER.findById(userId);

    // Render profile view
    return res.status(200).render('Profile', {
        user: user
    });
});

module.exports = {
    SignUpUser,
    SignInUser,
    SignOutUser,
    getuserprofile
};