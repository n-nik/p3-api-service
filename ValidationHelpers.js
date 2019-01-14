const Joi = require("joi");

class ValidationHelpers {

    constructor() {
        this._paramsSchema = Joi.object().keys({
            height: Joi.number().integer().min(0)
        });

        this._createBlockSchema = Joi.object().keys({
            body: Joi.string().min(1).required()
        });

        this._validationOptions = {
            allowUnknown: false,
        };
    }

    /**
     * @param {Object} params
     * @returns {Promise<any>}
     */
    validateParamsSchema(params) {
        return this._paramsSchema.validate(params, this._validationOptions)

    }

    /**
     * @param {Object} block
     * @returns {Promise<any>}
     */
    validateBlockSchema(block) {
        return this._createBlockSchema.validate(block, this._validationOptions)
    }

}

module.exports = {
    ValidationHelpers
};
