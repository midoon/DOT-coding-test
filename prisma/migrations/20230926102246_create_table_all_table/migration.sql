-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `token_id` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    UNIQUE INDEX `tokens_user_id_key`(`user_id`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `product_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` VARCHAR(60) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
