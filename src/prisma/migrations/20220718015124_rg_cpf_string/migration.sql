/*
  Warnings:

  - You are about to alter the column `cpf` on the `PersonalDatas` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(11)`.
  - You are about to alter the column `rg` on the `PersonalDatas` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(9)`.

*/
-- AlterTable
ALTER TABLE `PersonalDatas` MODIFY `cpf` VARCHAR(11) NOT NULL,
    MODIFY `rg` VARCHAR(9) NOT NULL;
