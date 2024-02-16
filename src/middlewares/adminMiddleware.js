const adminMiddleware = (req, res, next) => {
    try {
        // Check if the user is authenticated (you might need to customize this based on your session structure)
        if (req.session.user.group !== "Admin") {
            return res.status(401).json({ message: 'You dont have the required Permissions' });
        }

        // User is authenticated, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error({ message: 'Error in Admin MiddleWare:' }, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default adminMiddleware;
