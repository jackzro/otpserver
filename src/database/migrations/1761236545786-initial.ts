import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1761236545786 implements MigrationInterface {
    name = 'initial1761236545786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`number_receivers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`priority\` int NOT NULL DEFAULT '1', \`active\` tinyint NOT NULL DEFAULT 1, \`numberId\` varchar(36) NULL, \`receiverId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`apps\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_c1a24df1d51c2748d97561b77d\` (\`name\`), UNIQUE INDEX \`IDX_48491b1d9bb22739ceee024ba0\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`otp_events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`event\` varchar(255) NOT NULL, \`details\` json NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`otpRequestId\` int NULL, \`actorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`otp_requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('requested', 'sent', 'received', 'filled', 'verified', 'expired') NOT NULL DEFAULT 'requested', \`otpCode\` varchar(255) NULL, \`otpMessage\` text NULL, \`requestedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`filledAt\` timestamp NULL, \`verifiedAt\` timestamp NULL, \`expiredAt\` timestamp NULL, \`senderId\` varchar(36) NULL, \`receiverId\` varchar(36) NULL, \`numberId\` varchar(36) NULL, \`appId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`createdBy\` varchar(255) NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`numbers\` (\`id\` varchar(36) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`label\` varchar(255) NULL, \`active\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_decdbbe1939ec16e3a99614b31\` (\`phone_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` ADD CONSTRAINT \`FK_f80da0e5df872e7b6fb2778cc69\` FOREIGN KEY (\`numberId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` ADD CONSTRAINT \`FK_968159d9df346d297e12bd5b988\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD CONSTRAINT \`FK_b484e0664f80881ff7192764da6\` FOREIGN KEY (\`otpRequestId\`) REFERENCES \`otp_requests\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD CONSTRAINT \`FK_e79bd25560c74c17edc3cdf669e\` FOREIGN KEY (\`actorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_a2b4f5af78dd1efce22d7de45e7\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_d6bbd3633b336fca2d5974eb95c\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_4a77955bb8fcabf18e040fa67db\` FOREIGN KEY (\`numberId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_738df4a576e93efada210626906\` FOREIGN KEY (\`appId\`) REFERENCES \`apps\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`numbers\` ADD CONSTRAINT \`FK_8313e52785cef6ff6806e5803ba\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`numbers\` DROP FOREIGN KEY \`FK_8313e52785cef6ff6806e5803ba\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_738df4a576e93efada210626906\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_4a77955bb8fcabf18e040fa67db\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_d6bbd3633b336fca2d5974eb95c\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_a2b4f5af78dd1efce22d7de45e7\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP FOREIGN KEY \`FK_e79bd25560c74c17edc3cdf669e\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP FOREIGN KEY \`FK_b484e0664f80881ff7192764da6\``);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` DROP FOREIGN KEY \`FK_968159d9df346d297e12bd5b988\``);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` DROP FOREIGN KEY \`FK_f80da0e5df872e7b6fb2778cc69\``);
        await queryRunner.query(`DROP INDEX \`IDX_decdbbe1939ec16e3a99614b31\` ON \`numbers\``);
        await queryRunner.query(`DROP TABLE \`numbers\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`otp_requests\``);
        await queryRunner.query(`DROP TABLE \`otp_events\``);
        await queryRunner.query(`DROP INDEX \`IDX_48491b1d9bb22739ceee024ba0\` ON \`apps\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1a24df1d51c2748d97561b77d\` ON \`apps\``);
        await queryRunner.query(`DROP TABLE \`apps\``);
        await queryRunner.query(`DROP TABLE \`number_receivers\``);
    }

}
