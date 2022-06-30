const TaskService = require('./TaskService.js');

module.exports = class TaskController {
    static async createOne({ params: { id }, body }, res, next) {
        try {
            const task = await TaskService.createTask({ ...body, userId: +id });
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

    static async findAllTasks({ pagination }, res, next) {
        try {
            const tasks = await TaskService.findAllTasks(pagination);
            return res.status(200).send(tasks);
        } catch (err) {
            next(err);
        }
    }

    static async findOne({ params: { id } }, res, next) {
        try {
            const foundTask = await TaskService.findTaskById(Number(id));
            return res.status(200).send({ data: foundTask });
        } catch (err) {
            next(err);
        }
    }

    static async updateOne({ params: { id }, body }, res, next) {
        try {
            const updatedTask = await TaskService.updateTaskById(
                Number(id),
                body,
            );
            return res.status(202).send({ data: updatedTask });
        } catch (err) {
            next(err);
        }
    }

    static async removeOne({ params: { id } }, res, next) {
        try {
            const result = await TaskService.removeTaskById(id);
            return res.status(204).send({ data: result });
        } catch (err) {
            next(err);
        }
    }
};
