ALTER TABLE `Idiomas_horario` MODIFY COLUMN `hora_inicio` time NOT NULL;--> statement-breakpoint
ALTER TABLE `Idiomas_horario` MODIFY COLUMN `hora_fin` time NOT NULL;--> statement-breakpoint
ALTER TABLE `Idiomas_horario` MODIFY COLUMN `descripcion` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `Idiomas_idioma` MODIFY COLUMN `idioma` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `Idiomas_nivel` MODIFY COLUMN `nivel` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `Idiomas_programa` MODIFY COLUMN `programa` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `Idiomas_idioma` ADD CONSTRAINT `Idiomas_idioma_idioma_unique` UNIQUE(`idioma`);