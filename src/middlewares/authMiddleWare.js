const authMiddleware = (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.session || !req.session.user) {
            // If session or user data doesn't exist, or session is invalid, clear the session and return unauthorized
            if (req.sessionID) {
                // Destroy the session and clear the session cookie
                req.session.destroy(err => {
                    if (err) {
                        console.error('Error destroying session:', err);
                    }
                    // Clear the session cookie
                    res.clearCookie('connect.sid');
                    // Send unauthorized response
                    return res.status(401).json({ message: 'Unauthorized' });
                });
            } else {
                // If sessionID is missing, just send unauthorized response
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }

        // User is authenticated, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error({ message: 'Error in authMiddleware:' }, error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default authMiddleware;
