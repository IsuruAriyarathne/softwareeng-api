-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 24, 2021 at 04:49 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.7
DROP DATABASE IF EXISTS slfire;

CREATE DATABASE slfire;
USE slfire;
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TMeU6ua5df`
--

-- --------------------------------------------------------

--
-- Table structure for table `AmmunitionBatch`
--

CREATE TABLE `AmmunitionBatch` (
  `ammoModelID` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `orderID` int(11) NOT NULL,
  `remain` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- --------------------------------------------------------

--
-- Table structure for table `AmmunitionOrder`
--

CREATE TABLE `AmmunitionOrder` (
  `ammoModelID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `cost` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `AmmunitionStation`
--

CREATE TABLE `AmmunitionStation` (
  `ammoModelID` int(11) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `orderID` int(11) NOT NULL,
  `stationID` int(11) NOT NULL,
  `allocatedDate` date DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- --------------------------------------------------------

--
-- Table structure for table `AmmunitionType`
--

CREATE TABLE `AmmunitionType` (
  `ammoModelID` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `MaintainanceRecord`
--

CREATE TABLE `MaintainanceRecord` (
  `id` int(11) NOT NULL,
  `weaponID` int(11) DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE `Order` (
  `orderID` int(11) NOT NULL,
  `supplierID` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `totalCost` float DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `RecoveredAmmunition`
--

CREATE TABLE `RecoveredAmmunition` (
  `recoveryID` int(11) NOT NULL,
  `ammoModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- --------------------------------------------------------

--
-- Table structure for table `RecoveredWeapon`
--

CREATE TABLE `RecoveredWeapon` (
  `recoveryID` int(11) NOT NULL,
  `weaponModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Recovery`
--

CREATE TABLE `Recovery` (
  `recoveryID` int(11) NOT NULL,
  `recoveryDate` date DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `stationID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- --------------------------------------------------------

--
-- Table structure for table `Request`
--

CREATE TABLE `Request` (
  `requestID` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `comments` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `stationID` int(11) DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- --------------------------------------------------------

--
-- Table structure for table `RequestAmmunition`
--

CREATE TABLE `RequestAmmunition` (
  `requestID` int(11) NOT NULL,
  `ammoModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RequestWeapon`
--

CREATE TABLE `RequestWeapon` (
  `requestID` int(11) NOT NULL,
  `weaponModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `Station`
--

CREATE TABLE `Station` (
  `stationID` int(11) NOT NULL,
  `stationName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `contactNo` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `Supplier`
--

CREATE TABLE `Supplier` (
  `supplierID` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `contactNumber` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SupplyAmmunition`
--

CREATE TABLE `SupplyAmmunition` (
  `ammoModelID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `SupplyWeapon`
--

CREATE TABLE `SupplyWeapon` (
  `weaponModelID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `officerID` int(11) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `stationID` int(10) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `Weapon`
--

CREATE TABLE `Weapon` (
  `weaponID` int(11) NOT NULL,
  `weaponModelID` int(11) DEFAULT NULL,
  `orderID` int(11) DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `WeaponAmmunition`
--

CREATE TABLE `WeaponAmmunition` (
  `weaponModelID` int(11) NOT NULL,
  `ammoModelID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `WeaponModel`
--

CREATE TABLE `WeaponModel` (
  `weaponModelID` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Table structure for table `WeaponOrder`
--

CREATE TABLE `WeaponOrder` (
  `weaponModelID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `description` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `cost` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `WeaponStation`
--

CREATE TABLE `WeaponStation` (
  `weaponID` int(11) NOT NULL,
  `stationID` int(11) NOT NULL,
  `assigned` tinyint(1) DEFAULT NULL,
  `assignedDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AmmunitionBatch`
--
ALTER TABLE `AmmunitionBatch`
  ADD PRIMARY KEY (`ammoModelID`,`orderID`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `AmmunitionOrder`
--
ALTER TABLE `AmmunitionOrder`
  ADD PRIMARY KEY (`ammoModelID`,`orderID`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `AmmunitionStation`
--
ALTER TABLE `AmmunitionStation`
  ADD PRIMARY KEY (`ammoModelID`,`orderID`,`stationID`),
  ADD KEY `stationID` (`stationID`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `AmmunitionType`
--
ALTER TABLE `AmmunitionType`
  ADD PRIMARY KEY (`ammoModelID`);

--
-- Indexes for table `MaintainanceRecord`
--
ALTER TABLE `MaintainanceRecord`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weaponID` (`weaponID`);

--
-- Indexes for table `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `RecoveredAmmunition`
--
ALTER TABLE `RecoveredAmmunition`
  ADD PRIMARY KEY (`recoveryID`,`ammoModelID`),
  ADD KEY `ammoModelID` (`ammoModelID`);

--
-- Indexes for table `RecoveredWeapon`
--
ALTER TABLE `RecoveredWeapon`
  ADD PRIMARY KEY (`recoveryID`,`weaponModelID`),
  ADD KEY `weaponModelID` (`weaponModelID`);

--
-- Indexes for table `Recovery`
--
ALTER TABLE `Recovery`
  ADD PRIMARY KEY (`recoveryID`),
  ADD KEY `stationID` (`stationID`);

--
-- Indexes for table `Request`
--
ALTER TABLE `Request`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `stationID` (`stationID`);

--
-- Indexes for table `RequestAmmunition`
--
ALTER TABLE `RequestAmmunition`
  ADD PRIMARY KEY (`requestID`,`ammoModelID`),
  ADD KEY `ammoModelID` (`ammoModelID`);

--
-- Indexes for table `RequestWeapon`
--
ALTER TABLE `RequestWeapon`
  ADD PRIMARY KEY (`requestID`,`weaponModelID`),
  ADD KEY `weaponModelID` (`weaponModelID`);

--
-- Indexes for table `Station`
--
ALTER TABLE `Station`
  ADD PRIMARY KEY (`stationID`);

--
-- Indexes for table `Supplier`
--
ALTER TABLE `Supplier`
  ADD PRIMARY KEY (`supplierID`);

--
-- Indexes for table `SupplyAmmunition`
--
ALTER TABLE `SupplyAmmunition`
  ADD PRIMARY KEY (`ammoModelID`,`supplierID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `SupplyWeapon`
--
ALTER TABLE `SupplyWeapon`
  ADD PRIMARY KEY (`weaponModelID`,`supplierID`),
  ADD KEY `supplierID` (`supplierID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`officerID`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `stationID` (`stationID`);

--
-- Indexes for table `Weapon`
--
ALTER TABLE `Weapon`
  ADD PRIMARY KEY (`weaponID`),
  ADD KEY `weaponModelID` (`weaponModelID`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `WeaponAmmunition`
--
ALTER TABLE `WeaponAmmunition`
  ADD PRIMARY KEY (`weaponModelID`,`ammoModelID`),
  ADD KEY `ammoModelID` (`ammoModelID`);

--
-- Indexes for table `WeaponModel`
--
ALTER TABLE `WeaponModel`
  ADD PRIMARY KEY (`weaponModelID`);

--
-- Indexes for table `WeaponOrder`
--
ALTER TABLE `WeaponOrder`
  ADD PRIMARY KEY (`weaponModelID`,`orderID`),
  ADD KEY `orderID` (`orderID`);

--
-- Indexes for table `WeaponStation`
--
ALTER TABLE `WeaponStation`
  ADD PRIMARY KEY (`weaponID`,`stationID`,`assignedDate`) USING BTREE,
  ADD KEY `stationID` (`stationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AmmunitionType`
--
ALTER TABLE `AmmunitionType`
  MODIFY `ammoModelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `MaintainanceRecord`
--
ALTER TABLE `MaintainanceRecord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Order`
--
ALTER TABLE `Order`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Recovery`
--
ALTER TABLE `Recovery`
  MODIFY `recoveryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Request`
--
ALTER TABLE `Request`
  MODIFY `requestID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Station`
--
ALTER TABLE `Station`
  MODIFY `stationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Supplier`
--
ALTER TABLE `Supplier`
  MODIFY `supplierID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `officerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `Weapon`
--
ALTER TABLE `Weapon`
  MODIFY `weaponID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `WeaponModel`
--
ALTER TABLE `WeaponModel`
  MODIFY `weaponModelID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AmmunitionBatch`
--
ALTER TABLE `AmmunitionBatch`
  ADD CONSTRAINT `AmmunitionBatch_ibfk_1` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`),
  ADD CONSTRAINT `AmmunitionBatch_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `Order` (`orderid`);

--
-- Constraints for table `AmmunitionOrder`
--
ALTER TABLE `AmmunitionOrder`
  ADD CONSTRAINT `AmmunitionOrder_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `Order` (`orderid`),
  ADD CONSTRAINT `AmmunitionOrder_ibfk_2` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`);

--
-- Constraints for table `AmmunitionStation`
--
ALTER TABLE `AmmunitionStation`
  ADD CONSTRAINT `AmmunitionStation_ibfk_1` FOREIGN KEY (`stationID`) REFERENCES `Station` (`stationid`),
  ADD CONSTRAINT `AmmunitionStation_ibfk_2` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`),
  ADD CONSTRAINT `AmmunitionStation_ibfk_3` FOREIGN KEY (`orderID`) REFERENCES `Order` (`orderid`);

--
-- Constraints for table `MaintainanceRecord`
--
ALTER TABLE `MaintainanceRecord`
  ADD CONSTRAINT `MaintainanceRecord_ibfk_1` FOREIGN KEY (`weaponID`) REFERENCES `Weapon` (`weaponid`);

--
-- Constraints for table `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`supplierID`) REFERENCES `Supplier` (`supplierid`);

--
-- Constraints for table `RecoveredAmmunition`
--
ALTER TABLE `RecoveredAmmunition`
  ADD CONSTRAINT `RecoveredAmmunition_ibfk_1` FOREIGN KEY (`recoveryID`) REFERENCES `Recovery` (`recoveryid`),
  ADD CONSTRAINT `RecoveredAmmunition_ibfk_2` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`);

--
-- Constraints for table `RecoveredWeapon`
--
ALTER TABLE `RecoveredWeapon`
  ADD CONSTRAINT `RecoveredWeapon_ibfk_1` FOREIGN KEY (`recoveryID`) REFERENCES `Recovery` (`recoveryid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `RecoveredWeapon_ibfk_2` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `Recovery`
--
ALTER TABLE `Recovery`
  ADD CONSTRAINT `Recovery_ibfk_1` FOREIGN KEY (`stationID`) REFERENCES `Station` (`stationid`);

--
-- Constraints for table `Request`
--
ALTER TABLE `Request`
  ADD CONSTRAINT `Request_ibfk_1` FOREIGN KEY (`stationID`) REFERENCES `Station` (`stationid`);

--
-- Constraints for table `RequestAmmunition`
--
ALTER TABLE `RequestAmmunition`
  ADD CONSTRAINT `RequestAmmunition_ibfk_1` FOREIGN KEY (`requestID`) REFERENCES `Request` (`requestid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `RequestAmmunition_ibfk_2` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `RequestWeapon`
--
ALTER TABLE `RequestWeapon`
  ADD CONSTRAINT `RequestWeapon_ibfk_1` FOREIGN KEY (`requestID`) REFERENCES `Request` (`requestid`),
  ADD CONSTRAINT `RequestWeapon_ibfk_2` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`);

--
-- Constraints for table `SupplyAmmunition`
--
ALTER TABLE `SupplyAmmunition`
  ADD CONSTRAINT `SupplyAmmunition_ibfk_1` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `SupplyAmmunition_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `Supplier` (`supplierid`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `SupplyWeapon`
--
ALTER TABLE `SupplyWeapon`
  ADD CONSTRAINT `SupplyWeapon_ibfk_1` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `SupplyWeapon_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `Supplier` (`supplierid`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`stationID`) REFERENCES `Station` (`stationid`);

--
-- Constraints for table `Weapon`
--
ALTER TABLE `Weapon`
  ADD CONSTRAINT `Weapon_ibfk_1` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`),
  ADD CONSTRAINT `Weapon_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `Order` (`orderid`);

--
-- Constraints for table `WeaponAmmunition`
--
ALTER TABLE `WeaponAmmunition`
  ADD CONSTRAINT `WeaponAmmunition_ibfk_1` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`),
  ADD CONSTRAINT `WeaponAmmunition_ibfk_2` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`);

--
-- Constraints for table `WeaponOrder`
--
ALTER TABLE `WeaponOrder`
  ADD CONSTRAINT `WeaponOrder_ibfk_1` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`),
  ADD CONSTRAINT `WeaponOrder_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `Order` (`orderid`);

--
-- Constraints for table `WeaponStation`
--
ALTER TABLE `WeaponStation`
  ADD CONSTRAINT `WeaponStation_ibfk_1` FOREIGN KEY (`weaponID`) REFERENCES `Weapon` (`weaponid`),
  ADD CONSTRAINT `WeaponStation_ibfk_2` FOREIGN KEY (`stationID`) REFERENCES `Station` (`stationid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
