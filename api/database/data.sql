USE slfire;

INSERT INTO `Station` (`stationID`, `stationName`, `location`, `type`, `contactNo`) VALUES
(1, 'Matara', 'Matara, Kosdeniya', 'office', '0312234056'),
(2, 'Saliyapura', 'Saliyapura', 'inventory', '1234567890'),
(3, 'Mirihana', 'Mirihana', 'office', '1234567890'),
(4, 'Boosa', 'Boosa', 'inventory', '1234567890'),
(5, '3rd Gemunu Regiment Army Camp', 'Matara', 'inventory', '1234567890');


INSERT INTO `User` (`officerID`, `name`, `password`, `role`, `stationID`, `email`) VALUES
(1, 'Isuru Ariyarathne', '$2b$10$qS0.cZAsliQKV1Mg6g1og.xu/48hzeuFA0VzLc9AhS6cEqR1US4Ze', 'admin', 1, 'isuru.18@cse.mrt.ac.lk'),
(2, 'Poorna Gunathilaka', '$2b$10$rLCmfTwNSQtlzaPIgyIjQOOj/VwKZZBU6rb9yePb4Up69axlYU4n2', 'officer', 2, 'poorna2152@gmail.com'),
(3, 'Geeth Kavinda', '$2b$10$G7jfIaGAwDVNCDAn81dJX.5bQW6UpOigL8XIXYv/VqtoKdPNzo6G2', 'cenofficer', 3, 'kavindag.18@cse.mrt.ac.lk'),
(4, 'Imaji', '$2b$10$QfntglRNHWCpEvbpLTW/7efA4h5LNn.75QRizNdOPH0LiM2wiXP3K', 'admin', 4, 'maji.pietersz@gmail.com'),
(5, 'nirasha', '$2b$10$p53L5zFnuBo54oz6R8CoI.m7JkrC8efrA0P2QL6AQNepqJznD37Qu', 'cenofficer', 5, 'wt.nirasha@gmail.com');



INSERT INTO `WeaponModel` (`weaponModelID`, `name`, `description`) VALUES
(1, 'Shot Gun', 'Used to shoot'),
(2, 'Pistol Gun', 'To shoot criminals'),
(3, 'Sniper', 'used for snipers'),
(4, 'Machine gun', 'used for high speed shooting'),
(5, 'Shot guns', 'Used to shoot');



INSERT INTO `AmmunitionType` (`ammoModelID`, `name`, `description`) VALUES
(1, 'Bullet', 'For all type of gans'),
(2, 'Hagar', 'For certain guns'),
(3, 'caliber 5.45', 'For machine guns'),
(4, 'sniper ammo', 'For snipers gun'),
(5, 'RPG', 'For all type of  RPG');


INSERT INTO `Supplier` (`supplierID`, `name`, `contactNumber`, `address`, `description`) VALUES
(1, 'DRDON', '9012243628', 'Indiana', 'Good'),
(2, 'sup1', '568', 'Matara', NULL),
(3, 'sup3', '12568', 'Kandy', 'Good'),
(4, 'Sup', '012', 'Panama', 'Good'),
(5, 'Supl', '012', 'Panama', 'Good');


INSERT INTO `SupplyAmmunition` (`ammoModelID`, `supplierID`) VALUES
(1, 1),
(2, 1),
(3, 2),
(3, 3),
(4, 3),
(5, 4),
(4, 5);


INSERT INTO `SupplyWeapon` (`weaponModelID`, `supplierID`) VALUES
(1, 1),
(2, 1),
(3, 2),
(5, 3),
(4, 4),
(2, 5),
(3, 5);


INSERT INTO `Order` (`orderID`, `supplierID`, `date`, `totalCost`, `state`, `description`) VALUES
(1, 1, '2020-10-02', 100, 'Complete', 'Good'),
(2, 2, '2021-01-02', 45000, 'Complete', 'Good'),
(3, 3, '2021-01-02', 45000, 'Complete', NULL),
(4, 4, '2021-01-02', 45000, 'Complete', NULL),
(5, 5, '2021-01-02', 45000, 'Complete', NULL);



INSERT INTO `AmmunitionOrder` (`ammoModelID`, `orderID`, `description`, `state`, `count`, `cost`) VALUES
(1, 1, 'Good condition', 'Complete', 96, 1000),
(2, 1, "Today", 'Complete', 10, 1000),
(3, 2, "Today", 'Complete', 10, 1000),
(1, 2, "Today", 'Complete', 10, 1000),
(4, 3, "Today", 'Pending', 45, 1000),
(5, 4, "Today", 'Pending', 45, 1000),
(4, 4, "Today", 'Pending', 45, 2000);


INSERT INTO `WeaponOrder` (`weaponModelID`, `orderID`, `description`, `state`, `count`, `cost`) VALUES
(1, 1, "Today", 'Complete', 78, 123),
(2, 2, "Today", 'Complete', 40, 2345),
(3, 2, "Today", 'Complete', 40, 2345),
(4, 3, "Today", 'Complete', 40, 2345),
(1, 5, "Today", 'Complete', 2, 2345),
(2, 5, "Today", 'Complete', 40, 2345);

INSERT INTO `Weapon` (`weaponID`, `weaponModelID`, `orderID`, `state`) VALUES
(1, 1, 1, 'Available'),
(2, 1, 1, 'Available'),
(3, 1, 1, 'Unavailable'),
(4, 1, 1, 'Available'),
(5, 1, 1, 'Unavailable');

INSERT INTO `WeaponAmmunition` (`weaponModelID`, `ammoModelID`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 3),
(5, 4);


INSERT INTO `WeaponStation` (`weaponID`, `stationID`, `assigned`, `assignedDate`) VALUES
(1, 1, 0, '2021-01-04'),
(1, 2, 0, '2021-01-23'),
(1, 3, 1, '2021-01-24'),
(2, 2, 1, '2021-01-05'),
(3, 4, 1, '2021-01-04'),
(4, 1, 1, '2021-01-04'),
(5, 5, 1, '2021-01-04');



INSERT INTO `AmmunitionBatch` (`ammoModelID`, `count`, `orderID`, `remain`) VALUES
(1, 10, 1, 0),
(2, 10, 1, 10),
(3, 10, 1, 8),
(1, 10, 2, 10),
(2, 25, 2, 10),
(3, 40, 3, 40),
(4, 40, 3, 40),
(4, 40, 4, 40),
(5, 40, 4, 40),
(5, 40, 5, 40),
(1, 40, 5, 40);





INSERT INTO `AmmunitionStation` (`ammoModelID`, `count`, `orderID`, `stationID`, `allocatedDate`, `remaining`) VALUES
(1, 8, 1, 1, '2021-01-08', 8),
(2, 8, 1, 2, '2021-01-08', 8),
(2, 2, 1, 3, '2021-01-08', 2),
(2, 10, 2, 2, '2021-01-08', 2),
(3, 10, 3, 3, '2021-01-08', 2),
(4, 10, 3, 4, '2021-01-08', 2),
(4, 10, 4, 2, '2021-01-08', 2),
(5, 10, 4, 5, '2021-01-08', 2),
(5, 10, 5, 5, '2021-01-08', 2),
(1, 10, 5, 2, '2021-01-08', 2);


INSERT INTO `Recovery` (`recoveryID`, `recoveryDate`, `description`, `stationID`) VALUES
(1, '2020-10-13', 'Good', 2),
(2, '2020-10-12', 'Done', 1),
(3, '2020-11-12', 'Done Now', 1),
(4, '2021-01-02', 'From thieves', 4),
(5, '2020-02-25', 'from thieves', 3);


INSERT INTO `RecoveredAmmunition` (`recoveryID`, `ammoModelID`, `amount`) VALUES
(1, 1, 21),
(1, 2, 21),
(2, 2, 20),
(2, 3, 20),
(3, 3, 30),
(3, 4, 30),
(4, 4, 11),
(4, 5, 12),
(5, 5, 12),
(5, 1, 12);

INSERT INTO `RecoveredWeapon` (`recoveryID`, `weaponModelID`, `amount`) VALUES
(1, 1, 10),
(1, 2, 10),
(2, 2, 100),
(2, 3, 100),
(3, 3, 20),
(3, 4, 20),
(4, 4, 10),
(4, 5, 13),
(5, 1, 14),
(5, 5, 14);



INSERT INTO `MaintainanceRecord` (`id`, `weaponID`, `description`, `date`, `amount`) VALUES
(1, 1, 'Used to shoot', '2021-01-14', 5000),
(2, 2, 'After good condition', '2021-01-14', 5000),
(3, 3, 'Used to shoot', '2021-01-14', 5000),
(4, 4, 'Used to shoot', '2021-01-14', 5000),
(5, 5, 'Used to shoot', '2021-01-14', 5000);






INSERT INTO `Request` (`requestID`, `date`, `comments`, `stationID`, `state`) VALUES
(1, '2021-01-12', '\"Need urgently\"', 1, 'Pending'),
(2, '2021-01-13', 'ASAP', 2, 'Pending'),
(3, '2021-01-14', 'Quick', 3, 'Pending'),
(4, '2021-01-15', 'Soon', 4, 'Pending'),
(5, '2021-01-19', 'Soon', 5, 'Pending');


INSERT INTO `RequestAmmunition` (`requestID`, `ammoModelID`, `amount`) VALUES
(1, 1, 100),
(1, 2, 100),
(2, 2, 100),
(2, 3, 100),
(3, 3, 10),
(3, 4, 10),
(4, 4, 14),
(4, 5, 14),
(5, 5, 69),
(5, 1, 69);

INSERT INTO `RequestWeapon` (`requestID`, `weaponModelID`, `amount`) VALUES
(1, 1, 20),
(1, 2, 20),
(2, 2, 20),
(2, 3, 20),
(3, 3, 20),
(3, 4, 20),
(4, 4, 26),
(4, 5, 26),
(5, 5, 32),
(5, 1, 32);










