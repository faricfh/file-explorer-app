-- DropForeignKey
ALTER TABLE `folders` DROP FOREIGN KEY `folders_parent_id_fkey`;

-- AddForeignKey
ALTER TABLE `folders` ADD CONSTRAINT `folders_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `folders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
