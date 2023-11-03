-- CreateTable
CREATE TABLE `mypokemon` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `nickname` VARCHAR(100) NOT NULL,
    `count_update` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
