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


---can insert upyyo this
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




INSERT INTO `MaintainanceRecord` (`id`, `weaponID`, `description`, `date`, `amount`) VALUES
(1, 1, 'Used to shoot', '2021-01-14', 5000),
(2, 2, 'After good condition', '2021-01-14', 5000),
(3, 1, 'Used to shoot', '2021-01-14', 5000),
(10, 1, 'Another failure', '2021-01-18', 2500),
(11, 2, 'keeps breaking', '2021-01-14', 4334),
(12, 1, 'Aye kaduna', '2021-01-20', 3000),
(13, 1, 'theus', '2021-01-28', 8900);




INSERT INTO `RecoveredAmmunition` (`recoveryID`, `ammoModelID`, `amount`) VALUES
(1, 1, 21),
(2, 1, 20),
(3, 1, 30),
(4, 1, 11),
(4, 2, 12),
(7, 2, 9);

INSERT INTO `RecoveredWeapon` (`recoveryID`, `weaponModelID`, `amount`) VALUES
(1, 1, 10),
(2, 1, NULL),
(3, 1, NULL),
(4, 1, 10),
(4, 2, 13),
(7, 2, 14);


INSERT INTO `Recovery` (`recoveryID`, `recoveryDate`, `description`, `stationID`) VALUES
(1, '2020-10-13', 'Good', 2),
(2, '2020-10-12', 'Done', 1),
(3, '2020-11-12', 'Done Now', 1),
(4, '2021-01-02', 'From thieves', 4),
(6, '2020-02-25', 'from thieves', NULL),
(7, '2020-10-12', 'Done', 1),
(8, '2020-02-23', 'from ISI banned organization', NULL),
(9, '2020-10-23', 'From ISI banned organization', 2),
(11, '2021-01-21', 'From saharan', 2);

INSERT INTO `Request` (`requestID`, `date`, `comments`, `stationID`, `state`) VALUES
(1, '2021-01-12', '\"Need urgently\"', 1, 'Pending'),
(2, '2021-01-13', 'ASAP', 1, 'Pending'),
(3, '2021-01-14', 'Quick', 1, 'Pending'),
(4, '2021-01-15', 'Soon', 1, 'Pending'),
(5, '2021-01-19', 'Soon', 1, 'Pending'),
(6, '2021-01-17', 'Soon', 1, 'Pending'),
(7, '2021-01-17', 'Soon', 1, 'Pending'),
(8, '2021-01-12', '\"Need urgently\"', 1, 'Pending'),
(9, '2021-02-13', '\"Need urgently\"', 1, 'Pending'),
(10, '2021-01-12', '\"Need urgently\"', 1, 'Pending'),
(11, '2021-01-17', '\"Need urgently\"', 2, 'Pending'),
(12, '2021-01-12', '\"Need urgently\"', 1, 'Pending'),
(13, '2021-01-12', '\"Need urgently\"', 1, 'Pending'),
(14, '2021-01-12', '\"Need urgently\"', 1, 'Pending');


INSERT INTO `RequestAmmunition` (`requestID`, `ammoModelID`, `amount`) VALUES
(1, 1, 100),
(3, 3, 10),
(4, 3, 14),
(5, 3, 69),
(6, 3, 68),
(7, 3, 69),
(8, 1, 100),
(9, 1, 100),
(10, 1, 100),
(12, 1, 100),
(13, 1, 100),
(14, 1, 100);

INSERT INTO `RequestWeapon` (`requestID`, `weaponModelID`, `amount`) VALUES
(1, 1, 20),
(2, 3, 20),
(3, 2, 20),
(4, 2, 26),
(5, 2, 32),
(6, 1, 26),
(6, 2, 32),
(7, 2, 32),
(8, 1, 20),
(9, 1, 20),
(10, 1, 20),
(12, 1, 20),
(13, 1, 20),
(14, 1, 20);











