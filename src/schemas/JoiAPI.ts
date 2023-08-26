import Joi from 'joi';

const status = ['new', 'paid', 'accepted', 'done'];

class JoiAPI {
	private emailRegexp: RegExp = /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/;

	//* Class methods

	public registerSchema = Joi.object({
		name: Joi.string().min(2).max(35).required().messages({
			'any.required': "Missing required 'name' field",
			'string.min': "The length of 'name' must be between 2 and 35 characters",
			'string.max': "The length of 'name' must be between 2 and 35 characters",
		}),

		email: Joi.string()
			.pattern(new RegExp(this.emailRegexp))
			.required()
			.messages({ 'any.required': 'Email is required' }),

		password: Joi.string().min(6).required().messages({
			'any.required': 'Password is required',
			'string.min': "The length of 'password' must be min 6 characters",
		}),
	});

	public loginSchema = Joi.object({
		email: Joi.string()
			.pattern(new RegExp(this.emailRegexp))
			.required()
			.messages({ 'any.required': 'Email is required' }),

		password: Joi.string().min(6).required().messages({
			'any.required': 'Password is required',
			'string.min': "The length of 'password' must be min 6 characters",
		}),
	});

	public refreshSchema = Joi.object({
		refreshToken: Joi.string().required().messages({ 'any.required': 'refreshToken is required' }),
	});

	public userPasswordSchema = Joi.object({
		password: Joi.string().min(6).required().messages({
			'any.required': 'Password is required',
			'string.min': "The length of 'password' must be min 6 characters",
		}),

		newPassword: Joi.string().min(6).required().messages({
			'any.required': 'New password is required',
			'string.min': "The length of 'new password' must be min 6 characters",
		}),
	});

	public addType = Joi.object({
		ukr: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be between 2 and 35 characters",
			'string.max': "The length of 'type' must be between 2 and 35 characters",
		}),
		en: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be between 2 and 35 characters",
			'string.max': "The length of 'type' must be between 2 and 35 characters",
		}),
	});

	public addTovar = Joi.object({
		// name
		nameUKR: Joi.string()
			.min(2)
			.max(50)
			.required()
			.messages({
				'any.required': "Missing required 'nameUKR' field",
				'string.min': "The length of 'name' must be between 2 and 35 characters",
				'string.max': "The length of 'name' must be between 2 and 35 characters",
			})
			.required()
			.messages({
				'any.required': "Missing required 'name' field",
			}),

		nameEN: Joi.string()
			.min(2)
			.max(50)
			.required()
			.messages({
				'any.required': "Missing required 'name en' field",
				'string.min': "The length of 'name' must be between 2 and 35 characters",
				'string.max': "The length of 'name' must be between 2 and 35 characters",
			})
			.required()
			.messages({
				'any.required': "Missing required 'name' field",
			}),

		// переосмислити
		cost: Joi.number().required().messages({
			'any.required': "Missing required 'cost' field",
		}),

		// description
		descriptionUKR: Joi.string()
			.required()
			.messages({
				'any.required': "Missing required 'description ukr' field",
			})
			.required()
			.messages({
				'any.required': "Missing required 'description' field",
			}),
		descriptionEN: Joi.string()
			.required()
			.messages({
				'any.required': "Missing required 'description en' field",
			})
			.required()
			.messages({
				'any.required': "Missing required 'description' field",
			}),

		// parameters
		parametersUKR: Joi.string()
			.required()
			.messages({
				'any.required': "Missing required 'parameters ukr' field",
			})
			.required()
			.messages({
				'any.required': "Missing required 'parameters' field",
			}),
		parametersEN: Joi.string()
			.required()
			.messages({
				'any.required': "Missing required 'parameters en' field",
			})
			.required()
			.messages({
				'any.required': "Missing required 'parameters' field",
			}),

		// comlete set
		completeSetUKR: Joi.string()
			.required()
			.messages({
				'any.required': "Missing required 'complete set ukr' field",
			})
			.required()
			.messages({
				'any.required': "Missing required 'completeSet' field",
			}),
		completeSetEN: Joi.string()
			.required()
			.messages({
				'any.required': "Missing required 'complete set en' field",
			})
			.required()
			.messages({
				'any.required': "Missing required 'completeSet' field",
			}),

		// quantity
		quantity: Joi.number().required().messages({
			'any.required': "Missing required 'quantity set' field",
		}),

		// popularity
		popularity: Joi.number().required().messages({
			'any.required': "Missing required 'popularity set' field",
		}),

		// type
		type: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be between 2 and 35 characters",
			'string.max': "The length of 'type' must be between 2 and 35 characters",
		}),

		// fotos
		fotos: Joi.array().items(Joi.string()).default([]),
	});

	public updateTovar = Joi.object({
		// name
		nameUKR: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'name ukr' field",
			'string.min': "The length of 'name' must be between 2 and 35 characters",
			'string.max': "The length of 'name' must be between 2 and 35 characters",
		}),
		nameEN: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'name en' field",
			'string.min': "The length of 'name' must be between 2 and 35 characters",
			'string.max': "The length of 'name' must be between 2 and 35 characters",
		}),

		// cost
		cost: Joi.number().messages({
			'any.required': "Missing required 'cost' field",
		}),

		// description
		descriptionUKR: Joi.string().required().messages({
			'any.required': "Missing required 'description ukr' field",
		}),
		descriptionEN: Joi.string().required().messages({
			'any.required': "Missing required 'description en' field",
		}),

		// parameters
		parametersUKR: Joi.string().required().messages({
			'any.required': "Missing required 'parameters ukr' field",
		}),
		parametersEN: Joi.string().required().messages({
			'any.required': "Missing required 'parameters en' field",
		}),

		// complete set
		completeSetUKR: Joi.string().required().messages({
			'any.required': "Missing required 'complete set ukr' field",
		}),
		completeSetEN: Joi.string().required().messages({
			'any.required': "Missing required 'complete set en' field",
		}),

		// quantity
		quantity: Joi.number().messages({
			'any.required': "Missing required 'quantity set' field",
		}),

		// popularity
		popularity: Joi.number().messages({
			'any.required': "Missing required 'popularity set' field",
		}),

		// type
		type: Joi.string().min(2).max(50).messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be between 2 and 35 characters",
			'string.max': "The length of 'type' must be between 2 and 35 characters",
		}),

		// fotos
		fotos: Joi.array().items(Joi.string()).default([]),
	});

	public feedbackSchema = Joi.object({
		firstName: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be between 2 and 35 characters",
			'string.max': "The length of 'type' must be between 2 and 35 characters",
		}),
		lastName: Joi.string().min(2).max(50).required().messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be between 2 and 35 characters",
			'string.max': "The length of 'type' must be between 2 and 35 characters",
		}),
		phone: Joi.string()
			.pattern(
				/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
				'Invalid phone number'
			)
			.required()
			.messages({
				'any.required': "Missing required 'type' field",
				'any.pattern': 'not pattern',
			}),
		email: Joi.string().email().required().messages({
			'any.required': "Missing required 'type' field",
			'any.pattern': 'not pattern',
		}),
		message: Joi.string().min(2).required().messages({
			'any.required': "Missing required 'type' field",
			'string.min': "The length of 'type' must be minimum 2 characters",
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
		Monday: Joi.string().empty(''),
		Tuesday: Joi.string().empty(''),
		Wednesday: Joi.string().empty(''),
		Thursday: Joi.string().empty(''),
		Friday: Joi.string().empty(''),
		Saturday: Joi.string().empty(''),
		Sunday: Joi.string().empty(''),
	});

	public Limitations = Joi.object({
		Width: Joi.number(),
		Height: Joi.number(),
		Length: Joi.number(),
	});

	public addOrder = Joi.object({
		payment: Joi.number().min(1).max(2).required(),
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
			DescriptionRu: Joi.string().empty(''),
			ShortAddress: Joi.string().empty(''),
			ShortAddressRu: Joi.string().empty(''),
			Phone: Joi.string().empty(''),
			TypeOfWarehouse: Joi.string().empty(''),
			Number: Joi.string().empty(''),
			CityDescription: Joi.string().empty(''),
			CityDescriptionRu: Joi.string().empty(''),
			SettlementRef: Joi.string().empty(''),
			SettlementDescription: Joi.string().empty(''),
			SettlementAreaDescription: Joi.string().empty(''),
			SettlementRegionsDescription: Joi.string().empty(''),
			SettlementTypeDescription: Joi.string().empty(''),
			SettlementTypeDescriptionRu: Joi.string().empty(''),
			Longitude: Joi.string().empty(''),
			Latitude: Joi.string().empty(''),
			PostFinance: Joi.string().empty(''),
			BicycleParking: Joi.string().empty(''),
			PaymentAccess: Joi.string().empty(''),
			POSTerminal: Joi.string().empty(''),
			InternationalShipping: Joi.string().empty(''),
			SelfServiceWorkplacesCount: Joi.string().empty(''),
			TotalMaxWeightAllowed: Joi.string().empty(''),
			PlaceMaxWeightAllowed: Joi.string().empty(''),
			SendingLimitationsOnDimensions: this.Limitations,
			ReceivingLimitationsOnDimensions: this.Limitations,
			Reception: this.Week,
			Delivery: this.Week,
			Schedule: this.Week,
			DistrictCode: Joi.string().empty(''),
			WarehouseStatus: Joi.string().empty(''),
			WarehouseStatusDate: Joi.string().empty(''),
			WarehouseIllusha: Joi.string().empty(''),
			CategoryOfWarehouse: Joi.string().empty(''),
			Direct: Joi.string().empty(''),
			RegionCity: Joi.string().empty(''),
			WarehouseForAgent: Joi.string().empty(''),
			GeneratorEnabled: Joi.string().empty(''),
			MaxDeclaredCost: Joi.string().empty(''),
			WorkInMobileAwis: Joi.string().empty(''),
			DenyToSelect: Joi.string().empty(''),
			CanGetMoneyTransfer: Joi.string().empty(''),
			OnlyReceivingParcel: Joi.string().empty(''),
			PostMachineType: Joi.string().empty(''),
			PostalCodeUA: Joi.string().empty(''),
			WarehouseIndex: Joi.string().empty(''),
			BeaconCode: Joi.string().empty(''),
		}).pattern(Joi.string(), Joi.any()),
	});

	public Order = this.addOrder.append({
		id: Joi.string().required().required(),
		status: Joi.string()
			.valid(...status)
			.required(),
		date: Joi.number().required(),
	});
}

const joiAPI = new JoiAPI();

export { joiAPI };
