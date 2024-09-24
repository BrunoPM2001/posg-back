CREATE TABLE `Facultad` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facultad` varchar(255),
	`admision` boolean NOT NULL DEFAULT false,
	`director` varchar(255) NOT NULL,
	CONSTRAINT `Facultad_id` PRIMARY KEY(`id`),
	CONSTRAINT `Facultad_facultad_unique` UNIQUE(`facultad`)
);
--> statement-breakpoint
CREATE TABLE `Pais` (
	`id` int AUTO_INCREMENT NOT NULL,
	`codigo` varchar(3),
	`pais` varchar(255),
	CONSTRAINT `Pais_id` PRIMARY KEY(`id`),
	CONSTRAINT `Pais_codigo_unique` UNIQUE(`codigo`),
	CONSTRAINT `Pais_pais_unique` UNIQUE(`pais`)
);
--> statement-breakpoint
CREATE TABLE `Programa` (
	`40` varchar(40),
	`codigo` varchar(8) NOT NULL,
	`facultad_id` int NOT NULL,
	`grado` char NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`mencion` varchar(255),
	`modalidad` varchar(20) NOT NULL DEFAULT 'Presencial',
	`fecha_rr` date,
	`vacantes` int unsigned DEFAULT 0,
	`presidente` varchar(255),
	`secretario` varchar(255),
	`vocal` varchar(255),
	`estado` tinyint unsigned DEFAULT 0,
	CONSTRAINT `Programa_codigo` PRIMARY KEY(`codigo`)
);
--> statement-breakpoint
ALTER TABLE `Programa` ADD CONSTRAINT `Programa_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;