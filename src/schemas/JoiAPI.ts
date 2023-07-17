import Joi from "joi";

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

  public addType = Joi.object({
    ua: Joi.string().min(2).max(50).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
    eu: Joi.string().min(2).max(50).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
  });

  public addTovar = Joi.object({
    name: Joi.object({
      ua: Joi.string().min(2).max(50).required().messages({
        "any.required": "Missing required 'name' field",
        "string.min":
          "The length of 'name' must be between 2 and 35 characters",
        "string.max":
          "The length of 'name' must be between 2 and 35 characters",
      }),
      eu: Joi.string().min(2).max(50).required().messages({
        "any.required": "Missing required 'name' field",
        "string.min":
          "The length of 'name' must be between 2 and 35 characters",
        "string.max":
          "The length of 'name' must be between 2 and 35 characters",
      }),
    }),
    cost: Joi.object({
      ua: Joi.number().required().messages({
        "any.required": "Missing required 'cost' field",
      }),
      eu: Joi.number().required().messages({
        "any.required": "Missing required 'cost' field",
      }),
    }),

    description: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'description' field",
      }),
      eu: Joi.string().required().messages({
        "any.required": "Missing required 'description' field",
      }),
    }),
    parameters: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'parameters' field",
      }),
      eu: Joi.string().required().messages({
        "any.required": "Missing required 'parameters' field",
      }),
    }),
    completeSet: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'complete set' field",
      }),
      eu: Joi.string().required().messages({
        "any.required": "Missing required 'complete set' field",
      }),
    }),
    quantity: Joi.number().required().messages({
      "any.required": "Missing required 'quantity set' field",
    }),
    popularity: Joi.number().required().messages({
      "any.required": "Missing required 'popularity set' field",
    }),
    type: Joi.string().min(2).max(50).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
  });
}

const joiAPI = new JoiAPI();

export { joiAPI };
