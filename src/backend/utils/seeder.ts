import { faker } from '@faker-js/faker';
import { PostCategoryType } from '../constants';
import { Feedback } from '../database/entities/feedback';
import { Post } from '../database/entities/post';
import { User } from '../database/entities/user';

export default async function seeder(count: number) {
    await User.clear();
    await Post.clear();

    for (let i = 0; i < count; i++) {
        const name = faker.number.int({
            min: 1,
            max: 5
        }) % 2 == 0 ? faker.company.name() : faker.person.fullName();
        const user = await User.create({
            name: name,
            role: faker.number.int({ min: 0, max: 10 }) % 2 == 0 ? "provider": "student",
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            bannerUrl: faker.image.url(),
            emailVerifiedAt: faker.date.between({
                from: '2020-01-01T00:00:00.000Z',
                to: '2030-01-01T00:00:00.000Z'
            }),
            providerVerifiedAt: faker.date.past(),
            bio: faker.person.bio(),
            validIdUrl: faker.image.url()
        });

        await User.save(user);

        for (let j = 1; j < faker.number.int({ min: 1, max: count }); j++) {
            const post = await Post.create({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                type: PostCategoryType[faker.number.int({ min: 0, max: 5 })],
                thumbnail: faker.image.url(),
                user: {
                    id: user.id
                }
            });
    
            await Post.save(post);

            for (let k = 1; k < faker.number.int({ min: 1, max: count }); k++) {
                const feedback = await Feedback.create({
                    rate: faker.number.int({
                        min: 1,
                        max: 5
                    }),
                    content: faker.lorem.text(),
                    post: {
                        id: post.id
                    },
                    user: {
                        id: user.id
                    }
                });

                await Feedback.save(feedback);
            }
        }
    }
}