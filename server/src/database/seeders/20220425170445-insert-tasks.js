'use strict';
import User from '../models';

export default {
    async up(queryInterface, Sequelize) {
        const users = await User.findAll({
            attributes: ['id'],
        });

        const getRandom = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const tasks = users
            .map(user =>
                new Array(getRandom(1, 10)).fill(null).map((_, index) => ({
                    user_id: user.id,
                    title: `Title=${index}`,
                    body: `Test task ${index}`,
                    deadline: new Date(2020, 1, index),
                    is_done: Math.random() > 0.5,
                    created_at: new Date(),
                    updated_at: new Date(),
                })),
            )
            .flat(2);

        await queryInterface.bulkInsert('tasks', tasks, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tasks', null, {});
    },
};
