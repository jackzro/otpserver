import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1761359875242 implements MigrationInterface {
    name = 'initial1761359875242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`numbers\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`numbers\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` DROP FOREIGN KEY \`FK_f80da0e5df872e7b6fb2778cc69\``);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` DROP FOREIGN KEY \`FK_968159d9df346d297e12bd5b988\``);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` CHANGE \`numberId\` \`numberId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` CHANGE \`receiverId\` \`receiverId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP FOREIGN KEY \`FK_b484e0664f80881ff7192764da6\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP FOREIGN KEY \`FK_e79bd25560c74c17edc3cdf669e\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP COLUMN \`details\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD \`details\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` CHANGE \`otpRequestId\` \`otpRequestId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` CHANGE \`actorId\` \`actorId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_a2b4f5af78dd1efce22d7de45e7\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_d6bbd3633b336fca2d5974eb95c\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_4a77955bb8fcabf18e040fa67db\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_738df4a576e93efada210626906\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`status\` \`status\` enum ('pending', 'requested', 'sent', 'received', 'filled', 'verified', 'expired') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`otpCode\` \`otpCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`otpMessage\` \`otpMessage\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`requestedAt\` \`requestedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`filledAt\` \`filledAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`verifiedAt\` \`verifiedAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`senderId\` \`senderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`receiverId\` \`receiverId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`numberId\` \`numberId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`appId\` \`appId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`apps\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` ADD CONSTRAINT \`FK_f80da0e5df872e7b6fb2778cc69\` FOREIGN KEY (\`numberId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` ADD CONSTRAINT \`FK_968159d9df346d297e12bd5b988\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD CONSTRAINT \`FK_b484e0664f80881ff7192764da6\` FOREIGN KEY (\`otpRequestId\`) REFERENCES \`otp_requests\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD CONSTRAINT \`FK_e79bd25560c74c17edc3cdf669e\` FOREIGN KEY (\`actorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_a2b4f5af78dd1efce22d7de45e7\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_d6bbd3633b336fca2d5974eb95c\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_4a77955bb8fcabf18e040fa67db\` FOREIGN KEY (\`numberId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_738df4a576e93efada210626906\` FOREIGN KEY (\`appId\`) REFERENCES \`apps\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_738df4a576e93efada210626906\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_4a77955bb8fcabf18e040fa67db\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_d6bbd3633b336fca2d5974eb95c\``);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` DROP FOREIGN KEY \`FK_a2b4f5af78dd1efce22d7de45e7\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP FOREIGN KEY \`FK_e79bd25560c74c17edc3cdf669e\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP FOREIGN KEY \`FK_b484e0664f80881ff7192764da6\``);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` DROP FOREIGN KEY \`FK_968159d9df346d297e12bd5b988\``);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` DROP FOREIGN KEY \`FK_f80da0e5df872e7b6fb2778cc69\``);
        await queryRunner.query(`ALTER TABLE \`apps\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`appId\` \`appId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`numberId\` \`numberId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`receiverId\` \`receiverId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`senderId\` \`senderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`expiredAt\` \`expiredAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`verifiedAt\` \`verifiedAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`filledAt\` \`filledAt\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`requestedAt\` \`requestedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`otpMessage\` \`otpMessage\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`otpCode\` \`otpCode\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` CHANGE \`status\` \`status\` enum ('requested', 'sent', 'received', 'filled', 'verified', 'expired') NOT NULL DEFAULT ''requested''`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_738df4a576e93efada210626906\` FOREIGN KEY (\`appId\`) REFERENCES \`apps\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_4a77955bb8fcabf18e040fa67db\` FOREIGN KEY (\`numberId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_d6bbd3633b336fca2d5974eb95c\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_requests\` ADD CONSTRAINT \`FK_a2b4f5af78dd1efce22d7de45e7\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` CHANGE \`actorId\` \`actorId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` CHANGE \`otpRequestId\` \`otpRequestId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` DROP COLUMN \`details\``);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD \`details\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD CONSTRAINT \`FK_e79bd25560c74c17edc3cdf669e\` FOREIGN KEY (\`actorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp_events\` ADD CONSTRAINT \`FK_b484e0664f80881ff7192764da6\` FOREIGN KEY (\`otpRequestId\`) REFERENCES \`otp_requests\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` CHANGE \`receiverId\` \`receiverId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` CHANGE \`numberId\` \`numberId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` ADD CONSTRAINT \`FK_968159d9df346d297e12bd5b988\` FOREIGN KEY (\`receiverId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`number_receivers\` ADD CONSTRAINT \`FK_f80da0e5df872e7b6fb2778cc69\` FOREIGN KEY (\`numberId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`numbers\` CHANGE \`createdAt\` \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`numbers\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
