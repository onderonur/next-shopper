CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`value` text NOT NULL,
	`image` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`image` text NOT NULL,
	`categoryId` integer NOT NULL
);
