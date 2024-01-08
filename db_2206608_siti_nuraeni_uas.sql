-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2024 at 10:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2206608_siti_nuraeni_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasien_puskesmas_sitinuraeni`
--

CREATE TABLE `pasien_puskesmas_sitinuraeni` (
  `id` int(11) NOT NULL,
  `nama` text NOT NULL,
  `usia` int(11) NOT NULL,
  `jenis_kelamin` text NOT NULL,
  `alamat` text NOT NULL,
  `deskripsi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien_puskesmas_sitinuraeni`
--

INSERT INTO `pasien_puskesmas_sitinuraeni` (`id`, `nama`, `usia`, `jenis_kelamin`, `alamat`, `deskripsi`) VALUES
(1, 'eni ', 19, 'P', 'Cisaar', 'mual'),
(45, 'perdi', 29, 'L', 'ujeg', 'pusing'),
(46, 'arfan', 1, 'L', 'pari', 'diare'),
(71, 'yasmin hafidah A', 20, 'P', 'Garut', 'sakit perut'),
(74, 'Eka Nurul Baridah', 19, 'P', 'Bekasi', 'Mual dan muntah');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien_puskesmas_sitinuraeni`
--
ALTER TABLE `pasien_puskesmas_sitinuraeni`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien_puskesmas_sitinuraeni`
--
ALTER TABLE `pasien_puskesmas_sitinuraeni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
