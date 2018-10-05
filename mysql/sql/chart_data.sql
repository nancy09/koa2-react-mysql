CREATE TABLE   IF NOT EXISTS  `sensor_data` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `log_id` int(5) DEFAULT NULL,
  `device_id` varchar(10) DEFAULT NULL,
  `ds` varchar(20) DEFAULT NULL,
  `temperature` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `sensor_data` set ds='20181005152801', temperature='28.56', log_id='10008', device_id='222';
