import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1669515377490 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '45',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        length: '45',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '45',
        isNullable: false,
      },
      {
        name: 'role',
        type: 'varchar',
        length: '45',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
