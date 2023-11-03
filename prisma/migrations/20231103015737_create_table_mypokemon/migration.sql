/*
  Warnings:

  - Added the required column `nikame` to the `myPokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mypokemon` ADD COLUMN `nikame` VARCHAR(100) NOT NULL;
