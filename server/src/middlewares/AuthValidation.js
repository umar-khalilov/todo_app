module.exports = class AuthValidation {
    static validateSignUpData =
        schema =>
        async ({ body }, res, next) => {
            try {
                await schema().validate(body);
                return next();
            } catch (error) {
                return res
                    .status(400)
                    .send({ name: error.name, message: error.message });
            }
        };

    static validateSignInData =
        schema =>
        async ({ body }, res, next) => {
            try {
                await schema().validate(body);
                return next();
            } catch (error) {
                return res
                    .status(400)
                    .send({ name: error.name, message: error.message });
            }
        };
};
