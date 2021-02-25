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


INSERT INTO `AmmunitionBatch` (`ammoModelID`, `count`, `orderID`, `remain`) VALUES
(1, 10, 1, 0),
(1, 10, 6, 10),
(2, 25, 1, 10),
(2, 40, 6, 40);

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

--
-- Dumping data for table `AmmunitionOrder`
--

INSERT INTO `AmmunitionOrder` (`ammoModelID`, `orderID`, `description`, `state`, `count`, `cost`) VALUES
(1, 1, 'Good condition', 'Complete', 96, 1000),
(1, 5, NULL, 'Complete', 10, 1000),
(1, 6, NULL, 'Complete', 10, 1000),
(1, 7, NULL, 'Complete', 10, 1000),
(2, 1, NULL, 'Pending', 45, NULL),
(2, 5, NULL, 'Complete', 40, 2345),
(2, 6, NULL, 'Complete', 40, 2345),
(2, 7, NULL, 'Complete', 40, 2345);

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

--
-- Dumping data for table `AmmunitionStation`
--

INSERT INTO `AmmunitionStation` (`ammoModelID`, `count`, `orderID`, `stationID`, `allocatedDate`, `remaining`) VALUES
(1, 8, 1, 1, '2021-01-08', 8),
(1, 10, 1, 2, '2021-01-08', 2),
(1, 8, 1, 4, '2021-01-08', 8);

-- --------------------------------------------------------

--
-- Table structure for table `AmmunitionType`
--

CREATE TABLE `AmmunitionType` (
  `ammoModelID` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `AmmunitionType`
--

INSERT INTO `AmmunitionType` (`ammoModelID`, `name`, `description`) VALUES
(1, 'Bullet', 'For all type of gans'),
(2, 'Hagar', 'For certain guns'),
(3, 'caliber 5.45', 'For machine guns'),
(4, 'sniper ammo', 'For snipers gun'),
(5, 'RPG', 'For all type of  RPG'),
(7, 'Bullets', 'For all type of gans'),
(10, 'caliber 7.62', 'For riffles to'),
(11, 'Pistol ammo', 'pistols'),
(12, 'Bullet', 'For all type of guns');

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

--
-- Dumping data for table `MaintainanceRecord`
--

INSERT INTO `MaintainanceRecord` (`id`, `weaponID`, `description`, `date`, `amount`) VALUES
(1, 1, 'Used to shoot', '2021-01-14', 5000),
(2, 2, 'After good condition', '2021-01-14', 5000),
(3, 1, 'Used to shoot', '2021-01-14', 5000),
(10, 1, 'Another failure', '2021-01-18', 2500),
(11, 2, 'keeps breaking', '2021-01-14', 4334),
(12, 1, 'Aye kaduna', '2021-01-20', 3000),
(13, 1, 'theus', '2021-01-28', 8900);

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

--
-- Dumping data for table `Order`
--

INSERT INTO `Order` (`orderID`, `supplierID`, `date`, `totalCost`, `state`, `description`) VALUES
(1, 1, '2020-10-02', 100, 'Complete', 'Good'),
(2, 2, '2021-01-02', 45000, 'Complete', 'Good'),
(5, 2, '2021-01-02', 45000, 'Complete', NULL),
(6, 2, '2021-01-02', 45000, 'Complete', NULL),
(7, 2, '2021-01-02', 45000, 'Complete', NULL),
(10, 1, '2020-05-02', 1000, 'Complete', 'Good'),
(11, 1, '2020-05-02', 1000, 'Complete', 'Good');

-- --------------------------------------------------------

--
-- Table structure for table `RecoveredAmmunition`
--

CREATE TABLE `RecoveredAmmunition` (
  `recoveryID` int(11) NOT NULL,
  `ammoModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `RecoveredAmmunition`
--

INSERT INTO `RecoveredAmmunition` (`recoveryID`, `ammoModelID`, `amount`) VALUES
(1, 1, 21),
(2, 1, 20),
(3, 1, 30),
(4, 1, 11),
(4, 2, 12),
(7, 2, 9);

-- --------------------------------------------------------

--
-- Table structure for table `RecoveredWeapon`
--

CREATE TABLE `RecoveredWeapon` (
  `recoveryID` int(11) NOT NULL,
  `weaponModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `RecoveredWeapon`
--

INSERT INTO `RecoveredWeapon` (`recoveryID`, `weaponModelID`, `amount`) VALUES
(1, 1, 10),
(2, 1, NULL),
(3, 1, NULL),
(4, 1, 10),
(4, 2, 13),
(7, 2, 14);

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

--
-- Dumping data for table `Recovery`
--

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

--
-- Dumping data for table `Request`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `RequestAmmunition`
--

CREATE TABLE `RequestAmmunition` (
  `requestID` int(11) NOT NULL,
  `ammoModelID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `RequestAmmunition`
--

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
-- Dumping data for table `RequestWeapon`
--

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

-- --------------------------------------------------------

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
-- Dumping data for table `Station`
--

INSERT INTO `Station` (`stationID`, `stationName`, `location`, `type`, `contactNo`) VALUES
(1, 'Matara', 'Matara, Kosdeniya', 'office', '0312234056'),
(2, 'Saliyapura', 'Saliyapura', 'inventory', '1234567890'),
(3, 'Mirihana', 'Mirihana', 'office', '1234567890'),
(4, 'Boosa', 'Boosa', 'inventory', '1234567890'),
(5, '3rd Gemunu Regiment Army Camp', 'Matara', 'inventory', '1234567890'),
(6, 'Ambalangoda', 'Matara', 'office', '0312234056'),
(14, 'Meerigama', 'Meerigama', 'office', '0914234058'),
(15, 'Jafna', 'Jafna', 'office', '0702325060'),
(16, 'Guwanpura', 'Gotami rd,Guwanpura', 'inventory', '077123123'),
(20, 'Kiribathgoda', 'Kiribathgoda', 'office', '0123456789'),
(23, 'Bata', 'Matara', 'office', '0312234056'),
(27, 'Kotadeniyawa', 'Kotadeniyawa', 'office', '0112345675'),
(29, 'Meerigama', 'Meerigama', 'office', '0914234056'),
(30, 'Matara', 'Matara', 'office', '0312234056');

-- --------------------------------------------------------

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

--
-- Dumping data for table `Supplier`
--

INSERT INTO `Supplier` (`supplierID`, `name`, `contactNumber`, `address`, `description`) VALUES
(1, 'DRDON', '9012243628', 'Indiana', 'Good'),
(2, 'sup1', '568', 'Matara', NULL),
(3, 'sup3', '12568', 'Kandy', 'Good'),
(8, 'Sup', '012', 'Panama', 'Good'),
(9, 'Supl', '012', 'Panama', 'Good'),
(10, 'sup12', '0123456789', 'Africa', 'Africa');

-- --------------------------------------------------------

--
-- Table structure for table `SupplyAmmunition`
--

CREATE TABLE `SupplyAmmunition` (
  `ammoModelID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SupplyAmmunition`
--

INSERT INTO `SupplyAmmunition` (`ammoModelID`, `supplierID`) VALUES
(1, 1),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `SupplyWeapon`
--

CREATE TABLE `SupplyWeapon` (
  `weaponModelID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SupplyWeapon`
--

INSERT INTO `SupplyWeapon` (`weaponModelID`, `supplierID`) VALUES
(1, 1),
(2, 1),
(1, 3);

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
-- Dumping data for table `User`
--

INSERT INTO `User` (`officerID`, `name`, `password`, `role`, `stationID`, `email`) VALUES
(1, 'Isuru Ariyarathne', '$2b$10$qS0.cZAsliQKV1Mg6g1og.xu/48hzeuFA0VzLc9AhS6cEqR1US4Ze', 'admin', 1, 'isuru.18@cse.mrt.ac.lk'),
(2, 'Poorna Gunathilaka', '$2b$10$rLCmfTwNSQtlzaPIgyIjQOOj/VwKZZBU6rb9yePb4Up69axlYU4n2', 'officer', 2, 'poorna2152@gmail.com'),
(3, 'Geeth Kavinda', '$2b$10$G7jfIaGAwDVNCDAn81dJX.5bQW6UpOigL8XIXYv/VqtoKdPNzo6G2', 'cenofficer', 3, 'kavindag.18@cse.mrt.ac.lk'),
(6, 'Imaji', '$2b$10$QfntglRNHWCpEvbpLTW/7efA4h5LNn.75QRizNdOPH0LiM2wiXP3K', 'admin', 5, 'maji.pietersz@gmail.com'),
(7, 'nirasha', '$2b$10$p53L5zFnuBo54oz6R8CoI.m7JkrC8efrA0P2QL6AQNepqJznD37Qu', 'cenofficer', 3, 'wt.nirasha@gmail.com'),
(29, 'poornagune', '$2b$10$19RNd5TIervU8GNj93WmN.lPoUY.76wQayEPCpDYlO.IrYfAVvq02', 'cenofficer', 1, 'poorna.18@cse.mrt.ac.lk'),
(43, 'Isuru Ariyarathna', '$2b$10$zXxZWZGmtlmhHVPBmNjsoeel.FrcId6OwiY/Mi.WzfBzpNETwhCqm', 'admin', 2, 'isuru.21@cse.mrt.ac.lk'),
(46, 'Kamaj', '$2b$10$NQLN4AH91VpohE2lSN4YDuUqJmxhW7h8mK8bapawo8543q3mWk.ZS', 'cenofficer', 1, 'kamaj@gmail.com'),
(48, 'nandasenarajapaksha', '$2b$10$vH5zaE1Ohmzs2QKU2I8n7.OTQ2n7t73pl6F0R9V5WWo7e.qgrfuA6', 'officer', 4, 'nandasena@gmail.com'),
(50, 'Srinath', '$2b$10$8uh9BlC1t/rHfSZvlTJjCuPeJZhs0faftVD6j/vdLUNF8KrIBDVt2', 'admin', 3, 'srinath@gmail.com'),
(51, 'sanga', '$2b$10$3IIs4HeXp3m0dpWahNX6geivw9.dVKhFI5x.oLh5UZhXo.pgbShVW', 'admin', 3, 'snga@gmailcom'),
(53, 'Surendra', '$2b$10$g/NJWZJjbBlmG.hwk/0FoODBv9wi0BVkt9ZffRZ8wAeP3V5vKy.Lu', 'admin', 2, 'surendra95@gmail.com'),
(57, 'Suraj', '$2b$10$1CGKYIZ00BN9Dru4ccr4HeOXLC3pFqj1u7mnqVmlWx89zIGFlTzqy', 'officer', 4, 'surajmaapa@gmail.com'),
(59, 'Suraj Randiv', '$2b$10$2iyR.jisjZskaE2DFQl1H.EOzL6KNOocTF6WgBVMcO9HFcryrlQ.i', 'cenofficer', 4, 'surajrandiv@gmail.com'),
(64, 'Kusal Mendis', '$2b$10$KC494ujAxsyyIiwBQy/l2uPOFSCL6.8qHHXRJ4bSn1fw5GeqyG/8e', 'admin', 4, 'kusalmendis@gmail.com'),
(65, 'Roshen Silva', '$2b$10$LU2BekDgKBD3kU7AtpPI6u8.pqti533lGCjc5z0b1/Eqo0XMeOOX.', 'admin', 1, 'roshen.18@cse.mrt.ac.lk'),
(71, 'Rangana Herath', '$2b$10$nXZ.Ea0MQZg69fZl/fwyQuJAf8pHRHB1Wuq02AR.5rGu2aaJo/a9i', 'cenofficer', 1, 'ranga@gmail.com'),
(73, 'Nimal', '$2b$10$hflRrYhf78hQkSI4T57ps.2fp59wYKeAh8gJo1DZDO7l79MDVHeRm', 'admin', 1, 'malnimkam@gmail.com'),
(75, 'Sugath', '$2b$10$rHrcUz0Bk9x1AvFb7u4N9OS1JFxTKGqPPNMQtEBwAyfbMhJTIhra6', 'cenofficer', 3, 'slfreportgen@gmail.com'),
(78, 'Geeth Kavinda', '$2b$10$jA.Imw69kG//9BodINym/Oo7TRVox05pb8uwwSIcUPpo3qhweWMvW', 'cenofficer', 4, 'gkkpathirana@gmail.com'),
(79, 'Isuru Ariyarathna', '$2b$10$X/RLXM0yVFs42Z8gZh4dS.58cF/qVtYeQj8M0GqMIEEdq/4PmcPya', 'admin', 1, 'uru.18@cse.mrt.ac.lk');

-- --------------------------------------------------------

--
-- Table structure for table `Weapon`
--

CREATE TABLE `Weapon` (
  `weaponID` int(11) NOT NULL,
  `weaponModelID` int(11) DEFAULT NULL,
  `orderID` int(11) DEFAULT NULL,
  `state` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Weapon`
--

INSERT INTO `Weapon` (`weaponID`, `weaponModelID`, `orderID`, `state`) VALUES
(1, 1, 1, 'Available'),
(2, 1, 1, 'Available'),
(3, 1, 1, 'Unavailable'),
(4, 1, 1, 'Available'),
(5, 1, 1, 'Unavailable'),
(7, 2, 6, 'Complete'),
(8, 2, 6, 'Available'),
(10, NULL, NULL, NULL),
(11, 1, 1, 'Lost'),
(12, 1, 1, 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `WeaponAmmunition`
--

CREATE TABLE `WeaponAmmunition` (
  `weaponModelID` int(11) NOT NULL,
  `ammoModelID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `WeaponAmmunition`
--

INSERT INTO `WeaponAmmunition` (`weaponModelID`, `ammoModelID`) VALUES
(2, 1),
(1, 2),
(11, 2),
(14, 2),
(4, 3),
(3, 4);

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
-- Dumping data for table `WeaponModel`
--

INSERT INTO `WeaponModel` (`weaponModelID`, `name`, `description`) VALUES
(1, 'Shot Gun', 'Used to shoot'),
(2, 'Pistol Gun', 'To shoot criminals'),
(3, 'Sniper', 'used for snipers'),
(4, 'Machine gun', 'used for high speed shooting'),
(9, 'Shot guns', 'Used to shoot'),
(11, 'Shots gun', 'Use to shoot'),
(14, 'Shot gun', 'Used to shoot');

-- --------------------------------------------------------

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
-- Dumping data for table `WeaponOrder`
--

INSERT INTO `WeaponOrder` (`weaponModelID`, `orderID`, `description`, `state`, `count`, `cost`) VALUES
(1, 1, NULL, 'Complete', 78, NULL),
(2, 1, NULL, NULL, NULL, NULL),
(2, 5, NULL, 'Complete', 40, 2345),
(2, 6, NULL, 'Complete', 2, 2345),
(2, 7, NULL, 'Complete', 40, 2345),
(3, 1, NULL, NULL, NULL, NULL),
(4, 1, NULL, 'Pending', 10, NULL);

-- --------------------------------------------------------

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
-- Dumping data for table `WeaponStation`
--

INSERT INTO `WeaponStation` (`weaponID`, `stationID`, `assigned`, `assignedDate`) VALUES
(1, 1, 0, '2021-01-04'),
(1, 1, 0, '2021-01-23'),
(1, 2, 1, '2021-01-24'),
(8, 2, 1, '2021-01-05'),
(12, 1, 0, '2021-01-04');

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
  ADD CONSTRAINT `SupplyAmmunition_ibfk_1` FOREIGN KEY (`ammoModelID`) REFERENCES `AmmunitionType` (`ammomodelid`),
  ADD CONSTRAINT `SupplyAmmunition_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `Supplier` (`supplierid`);

--
-- Constraints for table `SupplyWeapon`
--
ALTER TABLE `SupplyWeapon`
  ADD CONSTRAINT `SupplyWeapon_ibfk_1` FOREIGN KEY (`weaponModelID`) REFERENCES `WeaponModel` (`weaponmodelid`),
  ADD CONSTRAINT `SupplyWeapon_ibfk_2` FOREIGN KEY (`supplierID`) REFERENCES `Supplier` (`supplierid`);

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
