const {getAuth} = require("firebase-admin/auth");

const appCheckVerification = async (req, res, next) => {
    next()
    // const {authtoken} = req.headers;
    //
    // if (!authtoken) {
    //     return res.status(401).send('Unauthorized');
    // }
    //
    // try {
    //     await getAuth().verifyIdToken(authtoken);
    //     return next()
    // } catch (err) {
    //     return res.status(401).send('Unauthorized');
    // }
}

module.exports = {appCheckVerification}