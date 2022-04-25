const TaskService = require('../services/TaskService');

module.exports = class TaskController {
    static async createOne({ params: { id }, body }, res, next) {
        try {
            const task = await TaskService.createTask({ ...body, userId: id });
            return res.status(201).send({ data: task });
        } catch (err) {
            next(err);
        }
    }

    static async findUserTasks({ userInstance, pagination }, res, next) {
        try {
            const tasks = await TaskService.findUserTasks(
                userInstance,
                pagination,
            );
            return res.status(200).send(tasks);
        } catch (err) {
            next(err);
        }
    }
};
