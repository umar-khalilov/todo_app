export class TaskValidation {
    validateCreateTaskData =
        schema =>
        async ({ body }, res, next) => {
            try {
                await schema().validate(body);
                return next();
            } catch (err) {
                return res.status(400).send({
                    name: err.name,
                    message: err.message,
                    status: err.status,
                });
            }
        };

    validateUpdateTaskData =
        schema =>
        async ({ body }, res, next) => {
            try {
                await schema().validate(body);
                return next();
            } catch (err) {
                return res.status(400).send({
                    name: err.name,
                    message: err.message,
                    status: err.status,
                });
            }
        };
}
