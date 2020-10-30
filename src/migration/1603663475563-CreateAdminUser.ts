import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User, UserRole } from "../entity/User";

export class CreateAdminUser1603663475563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.role = UserRole.ADMIN;
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
