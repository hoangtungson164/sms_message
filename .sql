CREATE TABLE `test_table`.`MSG_TABLE_202002` (
  `MSGKEY` INT NOT NULL AUTO_INCREMENT,
  `COMPKEY` VARCHAR(20) NOT NULL,
  `PHONE` VARCHAR(12) NOT NULL,
  `STATUS_SMS` INT NOT NULL,
  `INPUT_DATE` DATETIME NULL,
  `SEND_DATE` DATETIME NULL,
  `RSLT_DATE` DATETIME NULL,
  `RSLT` INT NULL,
  `MSG` VARCHAR(500) NULL,
  `TYPE_SMS` INT NOT NULL,
  PRIMARY KEY (`MSGKEY`));

'1', 'TEST1', '032345678', '1', '2020-02-01 10:10:10', '2020-02-03 10:10:10', '2020-02-03 10:10:10', '1', 'THIS IS A CUSTOMER CARE MESSAGE', '1'
'2', 'TEST2', '0973069378', '1', '2020-02-04 15:39:02', '2020-02-04 15:39:02', '2020-02-04 17:41:39', '0', 'THIS IS A CUSTOMER CARE MESSAGE', '1'
'3', 'TEST3', '0823046537', '1', '2020-02-01 10:10:10', '2020-02-03 10:10:10', '2020-02-04 17:41:39', '0', 'THIS IS A CUSTOMER CARE MESSAGE', '1'
'4', 'TEST4', '0312546392', '1', '2020-02-04 15:39:02', '2020-02-04 15:39:02', '2020-02-04 17:41:39', '0', 'THIS IS A CUSTOMER CARE MESSAGE', '1'
'5', 'TEST5', '0416439753', '1', '2020-02-01 10:10:10', '2020-02-03 10:10:10', '2020-02-03 10:10:10', '1', 'THIS IS A PROMOTION MESSAGE', '1'
