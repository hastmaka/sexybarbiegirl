const {getAuth} = require("firebase-admin/auth");

const appCheckVerification = async (req, res, next) => {
    const {authtoken, uid} = req.headers;

    if (!authtoken) {
        res.status(401);
        return next('Unauthorized');
    }

    try {
        const authUser = await getAuth().verifyIdToken(authtoken);
        if(uid !== authUser.uid) {
            return res.status(403)
        }
        next()
    } catch (err) {
        res.status(401);
        return next('Unauthorized');
    }
}

module.exports = {appCheckVerification}