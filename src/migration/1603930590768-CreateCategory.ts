import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Category } from "./../entity/Category";

export class CreateCategory1603930590768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const category = new Category();
    category.name = "alimentos";
    const categoryRepository = getRepository(Category);
    await categoryRepository.save(category);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product");
    await queryRunner.dropTable("category");
  }
}
