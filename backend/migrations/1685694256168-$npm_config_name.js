import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685694256168 {
    name = ' $npmConfigName1685694256168'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "icon" (
                "icon_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "link" varchar NOT NULL,
                CONSTRAINT "UQ_2615f5c10d7cd9105a9c64a88b6" UNIQUE ("link")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "movie_id" integer PRIMARY KEY NOT NULL,
                "title" varchar NOT NULL,
                "tmdb_id" integer NOT NULL,
                "release_date" varchar,
                "length" integer,
                "genres" varchar,
                "background" varchar,
                "poster" varchar,
                "synopsis" varchar,
                "actors" varchar,
                "popularity" integer,
                "keywords" varchar,
                "backdrop_title" varchar
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "email" varchar NOT NULL,
                "firstname" varchar NOT NULL,
                "lastname" varchar NOT NULL,
                "icon_id" integer,
                "password" varchar NOT NULL,
                "ratings" varchar,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "icon"
        `);
    }
}
