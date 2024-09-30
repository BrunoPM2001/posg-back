CREATE TABLE `Ddf_doc` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ddf_tema_id` int NOT NULL,
	`descripcion` text NOT NULL,
	`archivo` varchar(255),
	CONSTRAINT `Ddf_doc_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Ddf_foro` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facultad_id` int NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`contenido` text NOT NULL,
	`fecha` timestamp DEFAULT (now()),
	CONSTRAINT `Ddf_foro_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Ddf_tema` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facultad_id` int NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`fecha` timestamp DEFAULT (now()),
	CONSTRAINT `Ddf_tema_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Facultad` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facultad` varchar(255),
	`admision` boolean NOT NULL DEFAULT false,
	`director` varchar(255) NOT NULL,
	CONSTRAINT `Facultad_id` PRIMARY KEY(`id`),
	CONSTRAINT `Facultad_facultad_unique` UNIQUE(`facultad`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_certificado` (
	`id` int AUTO_INCREMENT NOT NULL,
	`id_certificado` int NOT NULL,
	`año` year NOT NULL,
	`nombres` varchar(50) NOT NULL,
	`paterno` varchar(50),
	`materno` varchar(50),
	`documento` varchar(20),
	`nivel` varchar(50) NOT NULL,
	`idioma` varchar(50) NOT NULL,
	`tipo_certificacion` varchar(50) NOT NULL,
	`fecha_carga` timestamp NOT NULL DEFAULT (now()),
	`fecha_inicio` varchar(50),
	`fecha_examen` date,
	`certificado_marcado` varchar(255),
	`certificado` varchar(255),
	CONSTRAINT `Idiomas_certificado_id` PRIMARY KEY(`id`),
	CONSTRAINT `Idiomas_certificado_id_certificado_unique` UNIQUE(`id_certificado`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_curso` (
	`codigo` varchar(10) NOT NULL,
	`idioma_id` int NOT NULL,
	`programa_id` int NOT NULL,
	`nivel_id` int NOT NULL,
	`horario_id` int NOT NULL,
	`mes` int unsigned NOT NULL,
	`año` year NOT NULL,
	`modalidad` varchar(50) NOT NULL,
	`docente_dni` varchar(20),
	`fecha_inicio` date,
	`fecha_fin` date,
	`estado` tinyint NOT NULL DEFAULT 0,
	`seccion` varchar(30),
	CONSTRAINT `Idiomas_curso_codigo` PRIMARY KEY(`codigo`),
	CONSTRAINT `Idiomas_curso_codigo_unique` UNIQUE(`codigo`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_docente` (
	`dni` varchar(20) NOT NULL,
	`paterno` varchar(40) NOT NULL,
	`materno` varchar(40),
	`nombres` varchar(40) NOT NULL,
	`celular` varchar(15),
	`correo` varchar(50),
	`password` varchar(255),
	`estado` boolean DEFAULT true,
	CONSTRAINT `Idiomas_docente_dni` PRIMARY KEY(`dni`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_estudiante` (
	`dni` varchar(20) NOT NULL,
	`tipo_doc` varchar(40) NOT NULL,
	`paterno` varchar(40) NOT NULL,
	`materno` varchar(40),
	`nombres` varchar(40) NOT NULL,
	`genero` char NOT NULL,
	`fecha_nac` date NOT NULL,
	`correo` varchar(50),
	`celular` varchar(15),
	`password` varchar(255),
	`facultad_id` int,
	`pais_id` int unsigned,
	CONSTRAINT `Idiomas_estudiante_dni` PRIMARY KEY(`dni`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_examen_inscripcion` (
	`id` int AUTO_INCREMENT NOT NULL,
	`examen_id` int NOT NULL,
	`estudiante_dni` varchar(20) NOT NULL,
	`nota` decimal(2,2) NOT NULL DEFAULT '0.0',
	CONSTRAINT `Idiomas_examen_inscripcion_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_examen` (
	`id` int AUTO_INCREMENT NOT NULL,
	`idioma` varchar(20) NOT NULL,
	`modalidad` varchar(20) NOT NULL,
	`fecha` date NOT NULL,
	`estado` boolean DEFAULT false,
	CONSTRAINT `Idiomas_examen_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_horario` (
	`id` int AUTO_INCREMENT NOT NULL,
	`hora_inicio` time,
	`hora_fin` time,
	`descripcion` varchar(50),
	CONSTRAINT `Idiomas_horario_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_idioma` (
	`id` int AUTO_INCREMENT NOT NULL,
	`idioma` varchar(50),
	CONSTRAINT `Idiomas_idioma_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_matricula` (
	`id` int AUTO_INCREMENT NOT NULL,
	`estudiante_dni` varchar(20) NOT NULL,
	`curso_codigo` varchar(10) NOT NULL,
	`nota1` decimal(2,2) NOT NULL DEFAULT '0.0',
	`nota2` decimal(2,2) NOT NULL DEFAULT '0.0',
	`nota3` decimal(2,2) NOT NULL DEFAULT '0.0',
	`nota4` decimal(2,2) NOT NULL DEFAULT '0.0',
	`promedio` decimal(2,2) NOT NULL DEFAULT '0.0',
	`banco` varchar(20) NOT NULL,
	`pago` varchar(50) NOT NULL,
	`monto` int unsigned NOT NULL,
	`fecha_pago` date NOT NULL,
	CONSTRAINT `Idiomas_matricula_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_nivel` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nivel` varchar(10),
	CONSTRAINT `Idiomas_nivel_id` PRIMARY KEY(`id`),
	CONSTRAINT `Idiomas_nivel_nivel_unique` UNIQUE(`nivel`)
);
--> statement-breakpoint
CREATE TABLE `Idiomas_programa` (
	`int` int AUTO_INCREMENT NOT NULL,
	`programa` varchar(50),
	CONSTRAINT `Idiomas_programa_int` PRIMARY KEY(`int`),
	CONSTRAINT `Idiomas_programa_programa_unique` UNIQUE(`programa`)
);
--> statement-breakpoint
CREATE TABLE `Pais` (
	`id` int unsigned NOT NULL,
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
CREATE TABLE `Usuario` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facultad_id` int,
	`email` varchar(50),
	`password` varchar(255) NOT NULL,
	`nickname` varchar(50) NOT NULL,
	`modulo` varchar(50) NOT NULL,
	CONSTRAINT `Usuario_id` PRIMARY KEY(`id`),
	CONSTRAINT `usuarioUnicoPorModulo` UNIQUE(`email`,`modulo`)
);
--> statement-breakpoint
ALTER TABLE `Ddf_doc` ADD CONSTRAINT `Ddf_doc_ddf_tema_id_Ddf_tema_id_fk` FOREIGN KEY (`ddf_tema_id`) REFERENCES `Ddf_tema`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ddf_foro` ADD CONSTRAINT `Ddf_foro_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Ddf_tema` ADD CONSTRAINT `Ddf_tema_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_curso` ADD CONSTRAINT `Idiomas_curso_idioma_id_Idiomas_idioma_id_fk` FOREIGN KEY (`idioma_id`) REFERENCES `Idiomas_idioma`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_curso` ADD CONSTRAINT `Idiomas_curso_programa_id_Idiomas_programa_int_fk` FOREIGN KEY (`programa_id`) REFERENCES `Idiomas_programa`(`int`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_curso` ADD CONSTRAINT `Idiomas_curso_nivel_id_Idiomas_nivel_id_fk` FOREIGN KEY (`nivel_id`) REFERENCES `Idiomas_nivel`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_curso` ADD CONSTRAINT `Idiomas_curso_horario_id_Idiomas_horario_id_fk` FOREIGN KEY (`horario_id`) REFERENCES `Idiomas_horario`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_curso` ADD CONSTRAINT `Idiomas_curso_docente_dni_Idiomas_docente_dni_fk` FOREIGN KEY (`docente_dni`) REFERENCES `Idiomas_docente`(`dni`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_estudiante` ADD CONSTRAINT `Idiomas_estudiante_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_estudiante` ADD CONSTRAINT `Idiomas_estudiante_pais_id_Pais_id_fk` FOREIGN KEY (`pais_id`) REFERENCES `Pais`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_examen_inscripcion` ADD CONSTRAINT `examen_fk` FOREIGN KEY (`examen_id`) REFERENCES `Idiomas_examen`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_examen_inscripcion` ADD CONSTRAINT `estudiante_fk` FOREIGN KEY (`estudiante_dni`) REFERENCES `Idiomas_estudiante`(`dni`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_matricula` ADD CONSTRAINT `Idiomas_matricula_estudiante_dni_Idiomas_estudiante_dni_fk` FOREIGN KEY (`estudiante_dni`) REFERENCES `Idiomas_estudiante`(`dni`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Idiomas_matricula` ADD CONSTRAINT `Idiomas_matricula_curso_codigo_Idiomas_curso_codigo_fk` FOREIGN KEY (`curso_codigo`) REFERENCES `Idiomas_curso`(`codigo`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Programa` ADD CONSTRAINT `Programa_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_facultad_id_Facultad_id_fk` FOREIGN KEY (`facultad_id`) REFERENCES `Facultad`(`id`) ON DELETE no action ON UPDATE no action;