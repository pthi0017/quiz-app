-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 09, 2025 at 03:42 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thi_trac_nghiem`
--

-- --------------------------------------------------------

--
-- Table structure for table `cauhoi`
--

DROP TABLE IF EXISTS `cauhoi`;
CREATE TABLE IF NOT EXISTS `cauhoi` (
  `macauhoi` int NOT NULL,
  `noidung` text,
  `dokho` int DEFAULT NULL,
  `mamonhoc` int DEFAULT NULL,
  `machuong` int DEFAULT NULL,
  `nguoitao` varchar(255) DEFAULT NULL,
  `trangthai` int DEFAULT NULL,
  PRIMARY KEY (`macauhoi`),
  KEY `mamonhoc` (`mamonhoc`),
  KEY `machuong` (`machuong`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cautraloi`
--

DROP TABLE IF EXISTS `cautraloi`;
CREATE TABLE IF NOT EXISTS `cautraloi` (
  `macautl` int NOT NULL,
  `macauhoi` int DEFAULT NULL,
  `noidungtl` text,
  `ladapan` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`macautl`),
  KEY `macauhoi` (`macauhoi`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietdethi`
--

DROP TABLE IF EXISTS `chitietdethi`;
CREATE TABLE IF NOT EXISTS `chitietdethi` (
  `made` int NOT NULL,
  `macauhoi` int NOT NULL,
  `thutu` int DEFAULT NULL,
  PRIMARY KEY (`made`,`macauhoi`),
  KEY `macauhoi` (`macauhoi`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietketqua`
--

DROP TABLE IF EXISTS `chitietketqua`;
CREATE TABLE IF NOT EXISTS `chitietketqua` (
  `makq` int NOT NULL,
  `macauhoi` int NOT NULL,
  `dapanchon` int DEFAULT NULL,
  PRIMARY KEY (`makq`,`macauhoi`),
  KEY `macauhoi` (`macauhoi`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietquyen`
--

DROP TABLE IF EXISTS `chitietquyen`;
CREATE TABLE IF NOT EXISTS `chitietquyen` (
  `manhomquyen` int NOT NULL,
  `chucnang` varchar(50) NOT NULL,
  `hanhdong` varchar(100) NOT NULL,
  PRIMARY KEY (`manhomquyen`,`chucnang`,`hanhdong`),
  KEY `chucnang` (`chucnang`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chitietthongbao`
--

DROP TABLE IF EXISTS `chitietthongbao`;
CREATE TABLE IF NOT EXISTS `chitietthongbao` (
  `matb` int NOT NULL,
  `manhom` int NOT NULL,
  PRIMARY KEY (`matb`,`manhom`),
  KEY `manhom` (`manhom`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chuong`
--

DROP TABLE IF EXISTS `chuong`;
CREATE TABLE IF NOT EXISTS `chuong` (
  `machuong` int NOT NULL,
  `tenchuong` varchar(255) DEFAULT NULL,
  `mamonhoc` int DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`machuong`),
  KEY `mamonhoc` (`mamonhoc`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `danhmucchucnang`
--

DROP TABLE IF EXISTS `danhmucchucnang`;
CREATE TABLE IF NOT EXISTS `danhmucchucnang` (
  `chucnang` varchar(50) NOT NULL,
  `tenchucnang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`chucnang`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dethi`
--

DROP TABLE IF EXISTS `dethi`;
CREATE TABLE IF NOT EXISTS `dethi` (
  `made` int NOT NULL,
  `monthi` int DEFAULT NULL,
  `nguoitao` varchar(255) DEFAULT NULL,
  `tende` varchar(255) DEFAULT NULL,
  `thoigiantao` datetime DEFAULT NULL,
  `thoigianthi` int DEFAULT NULL,
  `thoigianbatdau` datetime DEFAULT NULL,
  `thoigianketthuc` datetime DEFAULT NULL,
  `hienthibailam` tinyint(1) DEFAULT NULL,
  `xemdiem` tinyint(1) DEFAULT NULL,
  `troncauhoi` tinyint(1) DEFAULT NULL,
  `tron_dapan` tinyint(1) DEFAULT NULL,
  `nopbaichuyentab` tinyint(1) DEFAULT NULL,
  `loaide` int DEFAULT NULL,
  `socaude` int DEFAULT NULL,
  `socautb` int DEFAULT NULL,
  `socaukho` int DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`made`),
  KEY `nguoitao` (`nguoitao`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dethitudong`
--

DROP TABLE IF EXISTS `dethitudong`;
CREATE TABLE IF NOT EXISTS `dethitudong` (
  `made` int NOT NULL,
  `machuong` int NOT NULL,
  PRIMARY KEY (`made`,`machuong`),
  KEY `machuong` (`machuong`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ketqua`
--

DROP TABLE IF EXISTS `ketqua`;
CREATE TABLE IF NOT EXISTS `ketqua` (
  `makq` int NOT NULL,
  `made` int DEFAULT NULL,
  `manguoidung` varchar(255) DEFAULT NULL,
  `diemthi` float DEFAULT NULL,
  `thoigianvothi` datetime DEFAULT NULL,
  `thoigianlambai` int DEFAULT NULL,
  `socaudung` int DEFAULT NULL,
  `solanchuyentab` int DEFAULT NULL,
  PRIMARY KEY (`makq`),
  KEY `manguoidung` (`manguoidung`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `monhoc`
--

DROP TABLE IF EXISTS `monhoc`;
CREATE TABLE IF NOT EXISTS `monhoc` (
  `mamonhoc` int NOT NULL,
  `tenmonhoc` varchar(255) DEFAULT NULL,
  `sotinchi` int DEFAULT NULL,
  `sotietlythuyet` int DEFAULT NULL,
  `sotietthuchanh` int DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`mamonhoc`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

DROP TABLE IF EXISTS `nguoidung`;
CREATE TABLE IF NOT EXISTS `nguoidung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `googleid` varchar(255) DEFAULT NULL,
  `hoten` varchar(255) DEFAULT NULL,
  `gioitinh` tinyint(1) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `ngaythamgia` date DEFAULT NULL,
  `matkhau` varchar(255) DEFAULT NULL,
  `trangthai` int DEFAULT NULL,
  `sodienthoai` varchar(20) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `manhomquyen` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhom`
--

DROP TABLE IF EXISTS `nhom`;
CREATE TABLE IF NOT EXISTS `nhom` (
  `manhom` int NOT NULL,
  `tennhom` varchar(255) DEFAULT NULL,
  `mamoi` varchar(255) DEFAULT NULL,
  `siso` int DEFAULT NULL,
  `ghichu` text,
  `namhoc` int DEFAULT NULL,
  `hocky` int DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT NULL,
  `hienthi` tinyint(1) DEFAULT NULL,
  `giangvien` varchar(255) DEFAULT NULL,
  `mamonhoc` int DEFAULT NULL,
  PRIMARY KEY (`manhom`),
  KEY `giangvien` (`giangvien`(250)),
  KEY `mamonhoc` (`mamonhoc`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nhomquyen`
--

DROP TABLE IF EXISTS `nhomquyen`;
CREATE TABLE IF NOT EXISTS `nhomquyen` (
  `manhomquyen` int NOT NULL,
  `tennhomquyen` varchar(255) DEFAULT NULL,
  `trangthai` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`manhomquyen`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thongbao`
--

DROP TABLE IF EXISTS `thongbao`;
CREATE TABLE IF NOT EXISTS `thongbao` (
  `matb` int NOT NULL,
  `noidung` text,
  `thoigiantao` datetime DEFAULT NULL,
  `nguoitao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`matb`),
  KEY `nguoitao` (`nguoitao`(250))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
