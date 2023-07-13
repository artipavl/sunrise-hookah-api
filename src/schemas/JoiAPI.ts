import Joi from 'joi'

class JoiAPI {
    private emailRegexp: RegExp =
        /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;

    //* Class methods

    public registerSchema = Joi.object({
        name: Joi.string().min(2).max(35).required().messages({
            "any.required": "Missing required 'name' field",
            "string.min": "The length of 'name' must be between 2 and 35 characters",
            "string.max": "The length of 'name' must be between 2 and 35 characters",
        }),

        email: Joi.string()
            .pattern(new RegExp(this.emailRegexp))
            .required()
            .messages({ "any.required": "Email is required" }),

        password: Joi.string().min(6).required().messages({
            "any.required": "Password is required",
            "string.min": "The length of 'password' must be min 6 characters",
        }),
    });

    public loginSchema = Joi.object({
        email: Joi.string()
            .pattern(new RegExp(this.emailRegexp))
            .required()
            .messages({ "any.required": "Email is required" }),

        password: Joi.string().min(6).required().messages({
            "any.required": "Password is required",
            "string.min": "The length of 'password' must be min 6 characters",
        }),
    });

    public refreshSchema = Joi.object({
        refreshToken: Joi.string()
            .required()
            .messages({ "any.required": "refreshToken is required" }),
    });

    public userPasswordSchema = Joi.object({
        password: Joi.string().min(6).required().messages({
            "any.required": "Password is required",
            "string.min": "The length of 'password' must be min 6 characters",
        }),

        newPassword: Joi.string().min(6).required().messages({
            "any.required": "New password is required",
            "string.min": "The length of 'new password' must be min 6 characters",
        }),
    });
}

const joiAPI = new JoiAPI();

export { joiAPI };