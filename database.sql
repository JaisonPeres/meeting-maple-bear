SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `mb_meeting` ;
CREATE SCHEMA IF NOT EXISTS `mb_meeting` DEFAULT CHARACTER SET utf8 ;
USE `mb_meeting` ;

-- -----------------------------------------------------
-- Table `mb_meeting`.`parent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`parent` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`parent` (
  `id_parent` INT(11) NOT NULL AUTO_INCREMENT ,
  `status_parent` INT(11) NOT NULL DEFAULT '2' COMMENT '0 - Deactived\n1 - Actived/Aproved\n2 - Pending' ,
  `date_create_parent` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `email_parent` VARCHAR(254) NOT NULL ,
  `username_parent` VARCHAR(100) NULL DEFAULT NULL ,
  `passwd_parent` VARCHAR(40) NULL DEFAULT NULL ,
  `fname_parent` VARCHAR(30) NULL DEFAULT NULL ,
  `lname_parent` VARCHAR(40) NULL DEFAULT NULL ,
  `celphone_parent` VARCHAR(15) NULL DEFAULT NULL ,
  `fixedphone_parent` VARCHAR(15) NULL DEFAULT NULL ,
  PRIMARY KEY (`id_parent`) ,
  UNIQUE INDEX `email_parent_UNIQUE` (`email_parent` ASC) ,
  UNIQUE INDEX `username_parent_UNIQUE` (`username_parent` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mb_meeting`.`teacher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`teacher` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`teacher` (
  `id_teacher` INT(11) NOT NULL AUTO_INCREMENT ,
  `status_teacher` INT(11) NOT NULL DEFAULT '1' COMMENT '0 - Deactivated\n1 - Active/Aproved\n2 - Pending' ,
  `date_create_teacher` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `email_teacher` VARCHAR(254) NOT NULL ,
  `username_teacher` VARCHAR(20) NULL DEFAULT NULL ,
  `passwd_teacher` VARCHAR(40) NULL DEFAULT NULL ,
  `fname_teacher` VARCHAR(30) NULL DEFAULT NULL ,
  `lname_teacher` VARCHAR(40) NULL DEFAULT NULL ,
  `celphone_teacher` VARCHAR(15) NULL DEFAULT NULL ,
  `fixedphone_teacher` VARCHAR(15) NULL DEFAULT NULL ,
  PRIMARY KEY (`id_teacher`) ,
  UNIQUE INDEX `email_teacher_UNIQUE` (`email_teacher` ASC) ,
  UNIQUE INDEX `username_teacher_UNIQUE` (`username_teacher` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mb_meeting`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`user` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`user` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT ,
  `status_user` INT(11) NOT NULL DEFAULT '1' COMMENT '0 - Deactivated\n1 - Active/Aproved\n2 - Pending' ,
  `date_create_user` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `username_user` VARCHAR(20) NOT NULL ,
  `passwd_user` VARCHAR(40) NOT NULL ,
  `email_user` VARCHAR(254) NOT NULL ,
  `fname_user` VARCHAR(30) NOT NULL ,
  `lname_user` VARCHAR(40) NULL DEFAULT NULL ,
  `celphone_user` VARCHAR(15) NULL DEFAULT NULL ,
  `fixedphone_user` VARCHAR(15) NULL DEFAULT NULL ,
  PRIMARY KEY (`id_user`) ,
  UNIQUE INDEX `email_user_UNIQUE` (`email_user` ASC) ,
  UNIQUE INDEX `username_user_UNIQUE` (`username_user` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mb_meeting`.`meeting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`meeting` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`meeting` (
  `id_meeting` INT(11) NOT NULL AUTO_INCREMENT ,
  `status_meeting` INT(11) NOT NULL DEFAULT '0' ,
  `date_create_meeting` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `title_meeting` VARCHAR(100) NOT NULL ,
  `date_event_meeting` DATE NULL DEFAULT NULL ,
  `time_event_meeting` TIME NULL DEFAULT NULL ,
  `note_meeting` TEXT NULL DEFAULT NULL ,
  `parent_id_parent` INT(11) NOT NULL ,
  `user_id_user` INT(11) NOT NULL ,
  `teacher_id_teacher` INT(11) NOT NULL ,
  PRIMARY KEY (`id_meeting`) ,
  INDEX `fk_meeting_parent_idx` (`parent_id_parent` ASC) ,
  INDEX `fk_meeting_user1_idx` (`user_id_user` ASC) ,
  INDEX `fk_meeting_teacher1_idx` (`teacher_id_teacher` ASC) ,
  CONSTRAINT `fk_meeting_parent`
    FOREIGN KEY (`parent_id_parent` )
    REFERENCES `mb_meeting`.`parent` (`id_parent` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_meeting_teacher1`
    FOREIGN KEY (`teacher_id_teacher` )
    REFERENCES `mb_meeting`.`teacher` (`id_teacher` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_meeting_user1`
    FOREIGN KEY (`user_id_user` )
    REFERENCES `mb_meeting`.`user` (`id_user` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mb_meeting`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`student` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`student` (
  `id_student` INT(11) NOT NULL AUTO_INCREMENT ,
  `status_student` INT(11) NOT NULL DEFAULT '2' COMMENT '0 - Deactived\n1 - Actived/Aproved\n2 - Pending' ,
  `date_create_student` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `fname_student` VARCHAR(30) NULL DEFAULT NULL ,
  `lname_student` VARCHAR(40) NULL DEFAULT NULL ,
  PRIMARY KEY (`id_student`) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mb_meeting`.`student_has_parent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`student_has_parent` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`student_has_parent` (
  `student_id_student` INT(11) NOT NULL ,
  `parent_id_parent` INT(11) NOT NULL ,
  PRIMARY KEY (`student_id_student`, `parent_id_parent`) ,
  INDEX `fk_student_has_parent_parent1_idx` (`parent_id_parent` ASC) ,
  INDEX `fk_student_has_parent_student1_idx` (`student_id_student` ASC) ,
  CONSTRAINT `fk_student_has_parent_parent1`
    FOREIGN KEY (`parent_id_parent` )
    REFERENCES `mb_meeting`.`parent` (`id_parent` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_has_parent_student1`
    FOREIGN KEY (`student_id_student` )
    REFERENCES `mb_meeting`.`student` (`id_student` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mb_meeting`.`teacher_has_student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mb_meeting`.`teacher_has_student` ;

CREATE  TABLE IF NOT EXISTS `mb_meeting`.`teacher_has_student` (
  `teacher_id_teacher` INT(11) NOT NULL ,
  `student_id_student` INT(11) NOT NULL ,
  PRIMARY KEY (`teacher_id_teacher`, `student_id_student`) ,
  INDEX `fk_teacher_has_student_student1_idx` (`student_id_student` ASC) ,
  INDEX `fk_teacher_has_student_teacher1_idx` (`teacher_id_teacher` ASC) ,
  CONSTRAINT `fk_teacher_has_student_student1`
    FOREIGN KEY (`student_id_student` )
    REFERENCES `mb_meeting`.`student` (`id_student` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teacher_has_student_teacher1`
    FOREIGN KEY (`teacher_id_teacher` )
    REFERENCES `mb_meeting`.`teacher` (`id_teacher` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `mb_meeting` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
