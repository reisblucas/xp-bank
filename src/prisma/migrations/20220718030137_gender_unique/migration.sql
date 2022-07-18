/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Genders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `PersonalDatas` MODIFY `Genders_id` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    MODIFY `birth_date` VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Genders_name_key` ON `Genders`(`name`);
