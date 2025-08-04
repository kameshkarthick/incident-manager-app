import Joi from 'joi';

export const incidentSchema = Joi.object({
  type: Joi.string().valid('fall', 'behaviour').required(),
  description: Joi.string().required(),
});