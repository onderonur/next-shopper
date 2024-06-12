CREATE TABLE `cities` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`regionId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `continents` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`series` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `regions` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`continentId` integer NOT NULL
);
