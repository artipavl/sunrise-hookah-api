import Joi from "joi";

const status = ["new", "paid", "accepted", "done"];

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
    en: Joi.string().min(2).max(50).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
  });

  public addTovar = Joi.object({
    name: Joi.object({
      ua: Joi.string().min(2).max(50).required().messages({
        "any.required": "Missing required 'name ua' field",
        "string.min":
          "The length of 'name' must be between 2 and 35 characters",
        "string.max":
          "The length of 'name' must be between 2 and 35 characters",
      }),
      en: Joi.string().min(2).max(50).required().messages({
        "any.required": "Missing required 'name eu' field",
        "string.min":
          "The length of 'name' must be between 2 and 35 characters",
        "string.max":
          "The length of 'name' must be between 2 and 35 characters",
      }),
    })
      .required()
      .messages({
        "any.required": "Missing required 'name' field",
      }),
    // переосмислити
    cost: Joi.number().required().messages({
      "any.required": "Missing required 'cost' field",
    }),

    description: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'description ua' field",
      }),
      en: Joi.string().required().messages({
        "any.required": "Missing required 'description eu' field",
      }),
    })
      .required()
      .messages({
        "any.required": "Missing required 'description' field",
      }),
    parameters: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'parameters ua' field",
      }),
      en: Joi.string().required().messages({
        "any.required": "Missing required 'parameters eu' field",
      }),
    })
      .required()
      .messages({
        "any.required": "Missing required 'parameters' field",
      }),
    completeSet: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'complete set ua' field",
      }),
      en: Joi.string().required().messages({
        "any.required": "Missing required 'complete set eu' field",
      }),
    })
      .required()
      .messages({
        "any.required": "Missing required 'completeSet' field",
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
    fotos: Joi.array().items(Joi.string()).default([]),
  });

  public updateTovar = Joi.object({
    name: Joi.object({
      ua: Joi.string().min(2).max(50).required().messages({
        "any.required": "Missing required 'name ua' field",
        "string.min":
          "The length of 'name' must be between 2 and 35 characters",
        "string.max":
          "The length of 'name' must be between 2 and 35 characters",
      }),
      en: Joi.string().min(2).max(50).required().messages({
        "any.required": "Missing required 'name eu' field",
        "string.min":
          "The length of 'name' must be between 2 and 35 characters",
        "string.max":
          "The length of 'name' must be between 2 and 35 characters",
      }),
    }),
    cost: Joi.number().messages({
      "any.required": "Missing required 'cost' field",
    }),

    description: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'description ua' field",
      }),
      en: Joi.string().required().messages({
        "any.required": "Missing required 'description eu' field",
      }),
    }),
    parameters: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'parameters ua' field",
      }),
      en: Joi.string().required().messages({
        "any.required": "Missing required 'parameters eu' field",
      }),
    }),
    completeSet: Joi.object({
      ua: Joi.string().required().messages({
        "any.required": "Missing required 'complete set ua' field",
      }),
      en: Joi.string().required().messages({
        "any.required": "Missing required 'complete set eu' field",
      }),
    }),
    quantity: Joi.number().messages({
      "any.required": "Missing required 'quantity set' field",
    }),
    popularity: Joi.number().messages({
      "any.required": "Missing required 'popularity set' field",
    }),
    type: Joi.string().min(2).max(50).messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
    fotos: Joi.array().items(Joi.string()).default([]),
  });

  public feedbackSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be between 2 and 35 characters",
      "string.max": "The length of 'type' must be between 2 and 35 characters",
    }),
    phone: Joi.string()
      .pattern(
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
        "Invalid phone number"
      )
      .required()
      .messages({
        "any.required": "Missing required 'type' field",
        "any.pattern": "not pattern",
      }),
    email: Joi.string().email().required().messages({
      "any.required": "Missing required 'type' field",
      "any.pattern": "not pattern",
    }),
    message: Joi.string().min(2).required().messages({
      "any.required": "Missing required 'type' field",
      "string.min": "The length of 'type' must be minimum 2 characters",
    }),
  });

  public novapostaGetCity = Joi.object({
    Page: Joi.number().min(1),
    CityName: Joi.string().min(3).required(),
    Limit: Joi.number().min(1),
  });
  public novapostagetWarehouses = Joi.object({
    Page: Joi.number().min(1),
    CityName: Joi.string().min(3).required(),
    Limit: Joi.number().min(1),
    CityRef: Joi.string().min(36).max(36),
    TypeOfWarehouseRef: Joi.string().min(36).max(36),
    WarehouseId: Joi.number().min(1),
  });

  public Week = Joi.object({
    Monday: Joi.string(),
    Tuesday: Joi.string(),
    Wednesday: Joi.string(),
    Thursday: Joi.string(),
    Friday: Joi.string(),
    Saturday: Joi.string(),
    Sunday: Joi.string(),
  });

  public Limitations = Joi.object({
    Width: Joi.number(),
    Height: Joi.number(),
    Length: Joi.number(),
  });

  public addOrder = Joi.object({
    customer: this.feedbackSchema.required(),
    orders: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          baskeQuantity: Joi.number().required(),
        })
      )
      .required(),
    delivery: Joi.object({
      SiteKey: Joi.string().required(),
      Description: Joi.string().required(),
      Ref: Joi.string().required(),
      CityRef: Joi.string().required(),
      DescriptionRu: Joi.string(),
      ShortAddress: Joi.string(),
      ShortAddressRu: Joi.string(),
      Phone: Joi.string(),
      TypeOfWarehouse: Joi.string(),
      Number: Joi.string(),
      CityDescription: Joi.string(),
      CityDescriptionRu: Joi.string(),
      SettlementRef: Joi.string(),
      SettlementDescription: Joi.string(),
      SettlementAreaDescription: Joi.string(),
      SettlementRegionsDescription: Joi.string(),
      SettlementTypeDescription: Joi.string(),
      SettlementTypeDescriptionRu: Joi.string(),
      Longitude: Joi.string(),
      Latitude: Joi.string(),
      PostFinance: Joi.string(),
      BicycleParking: Joi.string(),
      PaymentAccess: Joi.string(),
      POSTerminal: Joi.string(),
      InternationalShipping: Joi.string(),
      SelfServiceWorkplacesCount: Joi.string(),
      TotalMaxWeightAllowed: Joi.string(),
      PlaceMaxWeightAllowed: Joi.string(),
      SendingLimitationsOnDimensions: this.Limitations,
      ReceivingLimitationsOnDimensions: this.Limitations,
      Reception: this.Week,
      Delivery: this.Week,
      Schedule: this.Week,
      DistrictCode: Joi.string(),
      WarehouseStatus: Joi.string(),
      WarehouseStatusDate: Joi.string(),
      WarehouseIllusha: Joi.string(),
      CategoryOfWarehouse: Joi.string(),
      Direct: Joi.string(),
      RegionCity: Joi.string(),
      WarehouseForAgent: Joi.string(),
      GeneratorEnabled: Joi.string(),
      MaxDeclaredCost: Joi.string(),
      WorkInMobileAwis: Joi.string(),
      DenyToSelect: Joi.string(),
      CanGetMoneyTransfer: Joi.string(),
      OnlyReceivingParcel: Joi.string(),
      PostMachineType: Joi.string(),
      PostalCodeUA: Joi.string(),
      WarehouseIndex: Joi.string(),
      BeaconCode: Joi.string(),
    }),
  });

  public Order = this.addOrder.append({
    id: Joi.string().required().required(),
    status: Joi.string()
      .valid(...status)
      .required(),
  });
}

const joiAPI = new JoiAPI();

export { joiAPI };
