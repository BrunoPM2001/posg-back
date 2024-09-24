CREATE TABLE `Usuario` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facultad_id` int,
	`email` varchar(50),
	`password` varchar(255) NOT NULL,
	`nickname` varchar(50) NOT NULL,
	CONSTRAINT `Usuario_id` PRIMARY KEY(`id`),
	CONSTRAINT `Usuario_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;