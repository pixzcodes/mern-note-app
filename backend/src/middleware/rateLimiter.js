import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        //TODO: replace "my-rate-limit" with userid from auth or ip addresses
        const {success} = await ratelimit.limit("my-rate-limit"); 
        if (!success){
            return res.status(429).json({
                message: "Too many request please try again later"
            });
        }
        next();

    } catch (error) {
        console.error("Rate limit error", error);
        next(error);
    }
};

export default rateLimiter;