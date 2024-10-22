const  CustomError =  require("./customError")

const validateSchema = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new CustomError('Validation failed', 400, result.error.errors);
    }
    return result.data;
  };

module.exports = validateSchema;