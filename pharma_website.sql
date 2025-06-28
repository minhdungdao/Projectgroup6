-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 27, 2025 lúc 05:43 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `pharma_website`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `candidates`
--

CREATE TABLE `candidates` (
  `Id` int(11) NOT NULL,
  `Email` longtext NOT NULL,
  `Password` longtext NOT NULL,
  `FullName` longtext NOT NULL,
  `Phone` longtext NOT NULL,
  `Avatar` longtext DEFAULT NULL,
  `Role` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `ResetCode` varchar(10) DEFAULT NULL,
  `ResetCodeExpiration` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `candidates`
--

INSERT INTO `candidates` (`Id`, `Email`, `Password`, `FullName`, `Phone`, `Avatar`, `Role`, `CreatedAt`, `UpdatedAt`, `ResetCode`, `ResetCodeExpiration`) VALUES
(1, 'trinhdongzza@gmail.com', '$2a$11$F3OZMrKa/EbUcaDbm1ibnuTbkvoLIRuvW12ywwaEKL4GERzCixrlG', 'Trịnh Văn Đông', '097926288', '5f95bb20-6e75-4f12-96de-9fdfd3cf6031.webp', 'Candidate', '2025-03-02 06:50:15.034097', '2025-03-02 06:50:15.034098', NULL, NULL),
(2, 'admin@gmail.com', '$2a$11$lMtTdD.WN60zUk2xY8TdmerLHA7whYMbHxNMn7s8YsmlSbVdlcis2', 'Admin', '123456789', NULL, 'Admin', '2025-06-06 15:12:08.928933', '2025-06-06 15:12:08.929001', NULL, NULL),
(5, 'tein@gmail.com', '$2a$11$Nmht1YbEdzDT0u.0QtVBKuq5yOZAgSTD.7p9sIIivCjGHGwdJ5EYe', 'manh tien 2222', '123456789', NULL, 'Candidate', '2025-06-10 11:31:48.940622', '2025-06-10 11:31:48.940623', NULL, NULL),
(6, 'manhtienngo2004@gmail.com', '$2a$11$TRtkZsuVekGAP/t6uu7W4eYnzD6Fx7IWQVnjMMlzvH8pTREavfcdy', 'Ngô Mạnh Tiến', '123456789', 'ff3eee7f-f163-4161-95b3-ab272ad9c4f7.jpg', 'Candidate', '2025-06-17 11:06:46.942752', '2025-06-17 11:06:46.942786', NULL, NULL),
(7, 'tiennmth2207037@fpt.edu.vn', '$2a$11$VgdFHcdeZ7dDDnNfc76oMu11sAv6yJo5VhFw75ArpKUjMqFyPW3Ra', 'Ngô Mạnh Tiến', '0981837296', 'e921f02e-00a5-4d58-8992-a71caedc84a5.jpg', 'Candidate', '2025-06-18 08:59:08.691083', '2025-06-18 08:59:08.691140', '182722', '2025-06-21 03:26:45'),
(8, 'ngocanh1999@gmail.com', '$2a$11$U9dBrctAhT6BqhhhsauKmutabD6pxnoq1ez..5Za/gFld1SQPLM4.', 'Ngô Ngọc Anh', '0987654321', NULL, 'Candidate', '2025-06-19 11:25:59.585282', '2025-06-19 11:25:59.585318', NULL, NULL),
(9, 'ngomanhtien2004@gmail.com', '$2a$11$D5LgVzFVHtZuT98BDPapZuEnbSlpg0dc4EeZEe3.TNYmd6u2mXYnK', 'Ngô Mạnh Tiến', '7604583193', '77235798-77d8-4b92-998c-03a9b319792c.jpg', 'Candidate', '2025-06-24 11:06:32.718940', '2025-06-24 11:06:32.719022', NULL, NULL),
(10, 'tienwork.official@gmail.com', '$2a$11$htIaHCNva2aaEqEDxyX2O.GbdS2jef26b4bdKmtT8IFzkmRQOdNZS', 'ngo manh tien ', '0981837296', NULL, 'Candidate', '2025-06-25 03:17:46.734921', '2025-06-25 03:17:46.734976', '245230', '2025-06-27 05:13:20');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `capsules`
--

CREATE TABLE `capsules` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Output` int(11) NOT NULL,
  `Avatar` longtext NOT NULL,
  `CapsuleSize` float NOT NULL,
  `MachineDimension` longtext NOT NULL,
  `ShippingWeight` float NOT NULL,
  `Price` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `capsules`
--

INSERT INTO `capsules` (`Id`, `Name`, `Output`, `Avatar`, `CapsuleSize`, `MachineDimension`, `ShippingWeight`, `Price`) VALUES
(1, 'MVN001', 1300, '/uploads/capsules/3bc951fb-ffe2-4452-9501-790a8f926cba_viennang.jpg', 12, '10', 10, 1500.00),
(2, 'MVN002', 2000, '/uploads/549e5f77-f637-468f-8550-cbece4a62bde.jpg', 12, '800 x 600 x 500', 15, 3500.00),
(3, 'MVN003', 4000, '/uploads/63ac667a-869e-4f33-96d7-5a3d6bd9f584.jpg', 120, '800 x 880 x 1200', 500, 5000.00),
(4, 'MVN004', 2500, '/uploads/2050d81f-dcbd-45d7-b09b-77d3a170b3fd.jpg', 10, '400 x 500 x600', 150, 1500.00),
(10, 'MVN005', 2000, '/uploads/capsules/1e3a43e7-91ae-468e-a685-a29a552a66e7_may-lam-day-vien-nanglg.jpg', 17, '800 x 880 x 1200', 170, 2600.00),
(11, 'MVN006', 5000, '/uploads/31beccd1-694f-4501-ba7c-55fc24c57c11.jpg', 30, '800 x 700 x 500', 150, 3500.00),
(12, 'MVN007', 5000, '/uploads/f2b9ccb1-8808-47bf-9edf-34b6a82586fd.jpg', 9, '1200 x 800 x 500', 150, 4500.00),
(13, 'MVN008', 3000, '/uploads/24b645eb-9dda-4adc-8cd7-cc55358f6684.jpg', 12, '800 x 700 x 500', 170, 2500.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cvsubmissions`
--

CREATE TABLE `cvsubmissions` (
  `Id` int(11) NOT NULL,
  `CandidateId` int(11) NOT NULL,
  `JobId` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CVFilePath` longtext NOT NULL,
  `Status` longtext NOT NULL,
  `SubmittedAt` datetime(6) NOT NULL,
  `InterviewDate` datetime DEFAULT NULL,
  `IsInterviewConfirmed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cvsubmissions`
--

INSERT INTO `cvsubmissions` (`Id`, `CandidateId`, `JobId`, `Name`, `Email`, `CVFilePath`, `Status`, `SubmittedAt`, `InterviewDate`, `IsInterviewConfirmed`) VALUES
(12, 1, 1, 'Hoàng Minh Thành', 'tienwork.official@gmail.com', '/uploads/cvs/b72f8b26-eea0-4fa7-8f7a-567d246cf3e7.pdf', 'Approved', '2025-06-05 09:22:13.866233', '2025-06-11 03:52:32', 1),
(14, 1, 2, 'Mạnh Tiến ', 'manhtienngo2004@gmail.com', '/uploads/cvs/4e0e08e3-4d6b-48d3-a06e-321bc2acf041.pdf', 'Approved', '2025-06-06 14:06:41.732885', '2025-06-17 14:00:00', 1),
(16, 2, 1, 'tienmanh', 'tienwork.official@gmail.com', '/uploads/cvs/e68f8d24-3195-4817-a05f-a231f15b460f.pdf', 'Approved', '2025-06-06 15:12:56.943889', '2025-06-15 21:00:00', 1),
(17, 2, 2, 'tienmanh', 'tienwork.official@gmail.com', '/uploads/cvs/e63b6ed9-d311-4477-9568-f78652e3153b.pdf', 'Rejected', '2025-06-06 15:14:14.033372', NULL, 0),
(32, 5, 5, 'tienmanh', 'dungminh200456789@gmail.com', '/uploads/cvs/df3d4960-99d3-4de9-9e74-a727ed1a8976.pdf', 'Rejected', '2025-06-10 11:32:29.882337', NULL, 0),
(33, 5, 4, 'Mạnh Tiến ', 'manhtienngo2004@gmail.com', '/uploads/cvs/5df4a31e-52b8-4de6-b9e2-7524bcfeea4d.pdf', 'Approved', '2025-06-11 03:18:41.003800', '2025-06-15 08:00:00', 1),
(40, 1, 9, 'Thu Phương', 'manhtienngo2004@gmail.com', '/uploads/cvs/d5dc8832-c8ac-4004-a82c-227ee822f823.pdf', 'Approved', '2025-06-16 16:48:26.495382', '2025-06-20 09:50:00', 1),
(41, 2, 9, 'Ngọc Mai', 'manhtienngo2004@gmail.com', '/uploads/cvs/4bb6994d-b409-4ad3-98c4-a2d5299e184f.pdf', 'Rejected', '2025-06-16 16:48:46.983847', NULL, 0),
(42, 6, 9, 'tienmanh', 'manhtienngo2004@gmail.com', '/uploads/cvs/6b4c565d-b749-4558-a3db-f50f82b3c839.pdf', 'Approved', '2025-06-17 11:24:52.978993', '2025-06-18 08:31:00', 1),
(43, 7, 9, 'Ngô Mạnh Tiến ', 'tiennmth2207037@fpt.edu.vn', '/uploads/cvs/42c8c939-5c7f-4d73-9319-a8168399f5cb.pdf', 'Rejected', '2025-06-21 10:55:47.026947', NULL, 0),
(45, 7, 4, 'Ngô Mạnh Tiến ', 'tiennmth2207037@fpt.edu.vn', '/uploads/cvs/f6c2a988-9f64-44c2-b119-dd6a242aa95f.pdf', 'Approved', '2025-06-22 10:21:54.123361', '2025-06-23 18:27:00', 0),
(46, 7, 5, 'Ngô Mạnh Tiến ', 'tiennmth2207037@fpt.edu.vn', '/uploads/cvs/fa2801c3-c7a8-40c4-b7e1-e9bf4ffcd0d2.pdf', 'Rejected', '2025-06-22 11:47:05.029587', NULL, 0),
(47, 9, 5, 'Ngô Mạnh Tiến ', 'ngomanhtien2004@gmail.com', '/uploads/cvs/86939716-38c6-4a6b-8f61-79ba0bdb25d0.pdf', 'Pending', '2025-06-24 11:11:48.982690', NULL, 0),
(48, 9, 2, 'Ngô Mạnh Tiến ', 'ngomanhtien2004@gmail.com', '/uploads/cvs/dc3e2c21-7f63-42c0-a32e-569e64c1f011.pdf', 'Pending', '2025-06-24 11:12:55.232835', NULL, 0),
(50, 10, 5, 'Ngô Mạnh Tiến ', 'tienwork.official@gmail.com', '/uploads/cvs/e2465fdb-f5dc-4af5-8c77-8bc9291c7270.pdf', 'Approved', '2025-06-26 12:44:49.905489', '2025-06-27 10:50:00', 1),
(51, 10, 9, 'Ngô Mạnh Tiến ', 'tienwork.official@gmail.com', '/uploads/cvs/913e38cd-e7a9-4f24-8396-d2963e92514e.pdf', 'Pending', '2025-06-27 03:32:13.766173', '2025-06-28 10:00:00', 0),
(52, 10, 1, 'Ngô Mạnh Tiến ', 'tienwork.official@gmail.com', '/uploads/cvs/b0c8d2ec-ae36-468c-940b-15ed17c4954e.pdf', 'Pending', '2025-06-27 12:37:24.322068', NULL, 0),
(53, 10, 2, 'Ngô Mạnh Tiến ', 'tiennmth2207037@fpt.edu.vn', '/uploads/cvs/1b3e4ab1-0cfd-45b8-a9b7-a0ece078ea2c.pdf', 'Pending', '2025-06-27 12:48:46.135164', NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedbacks`
--

CREATE TABLE `feedbacks` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `PhoneNumber` longtext NOT NULL,
  `Comments` longtext NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `Reply` longtext DEFAULT NULL,
  `Email` longtext NOT NULL,
  `IsVisible` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `feedbacks`
--

INSERT INTO `feedbacks` (`Id`, `Name`, `PhoneNumber`, `Comments`, `CreatedAt`, `Reply`, `Email`, `IsVisible`) VALUES
(4, 'Ngô Văn A', '21324567', 'Tôi Muốn Nhận Báo Giá', '2025-06-08 03:44:24.209540', NULL, 'ngomanhtien2004@gmail.com', 0),
(12, 'Gia Bảo', '123456789', 'Sản phẩm của công ty này rất chất lượng', '2025-06-15 04:13:12.815044', NULL, 'giabao9911@gmail.com', 1),
(18, 'Ngô Mạnh Tiến', '098712345', 'Sản phẩm của công ty này khá chất lượng đó', '2025-06-18 09:07:15.752029', NULL, 'ngomanhtien2004@gmail.com', 1),
(19, 'Văn Mạnh', '0987654321', 'Thật Tuyệt\n', '2025-06-18 09:08:00.389301', NULL, 'ngovanmanh@gmail.com', 1),
(20, 'Ngọc Mai', '0978563412', 'Good', '2025-06-18 09:08:52.022602', NULL, 'ngocmai2004@gmail.com', 0),
(22, 'Trần Nam ', '123456789', 'Trải nghiệm còn hạn chế', '2025-06-19 08:24:02.659839', NULL, 'nam123@gmail.com', 0),
(29, 'Ngô Mạnh Tiến', '0987654321', 'this page is ok', '2025-06-24 11:09:58.342377', NULL, 'ngomanhtien2004@gmail.com', 0),
(37, 'ngomanhtien2004@gmail.com', '21324567', '123456u', '2025-06-27 12:16:41.928858', NULL, 'ngomanhtien2004@gmail.com', 0),
(38, 'ngomanhtien2004@gmail.com', '21324567', '34567', '2025-06-27 12:17:40.316074', NULL, 'ngomanhtien2004@gmail.com', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job`
--

CREATE TABLE `job` (
  `Id` int(11) NOT NULL,
  `NameJob` varchar(100) NOT NULL,
  `Description` varchar(4000) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `job`
--

INSERT INTO `job` (`Id`, `NameJob`, `Description`, `CreatedAt`, `IsDeleted`) VALUES
(1, 'Mechanical Design Engineer (MDE)', 'Responsible for designing and developing technical drawings for pharmaceutical manufacturing machines such as tablet presses, packaging machines, and mixers. Utilize CAD software (AutoCAD, SolidWorks) to create 3D models, optimize designs for performance, and ensure compliance with GMP (Good Manufacturing Practice) standards.', '2025-06-02 06:50:31.495071', 0),
(2, 'Manufacturing Engineer (ME)', 'Supervise and optimize the manufacturing process of pharmaceutical machinery, from parts machining to assembly. Ensure production processes meet technical requirements, are cost-effective, and stay on schedule. Collaborate with the design team to resolve production-related issues.', '2025-06-02 07:20:43.737805', 0),
(3, 'CNC Machine Operator (CNC-MO)', 'Operate CNC machines to manufacture precision components for pharmaceutical machinery, such as tablet dies and drive shafts. Inspect machined parts for quality and accuracy, and perform basic maintenance to ensure optimal machine performance.', '2025-06-02 07:24:18.496062', 0),
(4, 'Maintenance Technician (MT)', 'Perform routine maintenance and repair of machinery and equipment in the production facility. Ensure continuous operation of the production line, minimizing downtime. Troubleshoot technical issues and propose improvements to equipment.', '2025-06-02 07:27:13.062309', 0),
(5, 'QC Inspector (Quality Control Inspector)', 'Inspect the quality of components and finished pharmaceutical machinery products to ensure compliance with industry standards (ISO, GMP). Utilize precision measuring tools and document quality inspection reports.', '2025-06-02 07:37:16.388393', 0),
(9, 'Research and Development Engineer (R&D Engineer)', 'Research and develop new machinery models or improve existing ones to meet the needs of the pharmaceutical industry. Test prototypes, collect data, and collaborate with the production team to bring products into mass production.', '2025-06-12 04:26:44.244174', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `liquidfillings`
--

CREATE TABLE `liquidfillings` (
  `Id` int(11) NOT NULL,
  `ModelName` longtext NOT NULL,
  `AirPressure` float NOT NULL,
  `AirVolume` float NOT NULL,
  `FillingSpeedBPM` float NOT NULL,
  `FillingRangeML` longtext NOT NULL,
  `Avatar` longtext NOT NULL,
  `Price` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `liquidfillings`
--

INSERT INTO `liquidfillings` (`Id`, `ModelName`, `AirPressure`, `AirVolume`, `FillingSpeedBPM`, `FillingRangeML`, `Avatar`, `Price`) VALUES
(1, 'MDC001', 8, 1500, 400, '101', '/uploads/65fa6f27-77cc-4a3a-abe4-da4a9b9e713f.jpg', 3000.000000000000000000000000000000),
(3, 'MDC002', 5, 100, 200, '300', '/uploads/98efd776-77fa-4efe-b945-80ab8c5076b7.jpg', 1500.000000000000000000000000000000),
(4, 'MDC003', 19, 200, 100, '300', '/uploads/e4b51b9d-4e4c-40c1-8c8e-6fb4ebe21cef.jpg', 3000.000000000000000000000000000000),
(5, 'MDC004', 7, 300, 200, '100', '/uploads/28e4fdf1-f4be-44a0-85b7-ae3f5d6d2c56.jpg', 1500.000000000000000000000000000000),
(11, 'MDC005', 5, 100, 200, '50-200', '/uploads/861c43f7-a910-457d-9b25-102dd5d805cb.jpg', 1000.000000000000000000000000000000),
(12, 'MDC006', 7, 150, 300, '100-200', '/uploads/d2ee8d3d-591f-4f77-b3ac-178ea6ab536e.png', 2000.000000000000000000000000000000),
(13, 'MDC007', 8, 200, 400, '100-300', '/uploads/45bf76ec-d3ab-4cc7-9c56-4ff10c196e62.jpg', 2000.000000000000000000000000000000),
(14, 'MDC008', 5, 100, 300, '50-400', '/uploads/d052f5ec-37aa-43a8-890e-ddd81750a606.jpg', 2500.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `Id` int(11) NOT NULL,
  `CandidateId` int(11) NOT NULL,
  `Amount` decimal(65,30) NOT NULL,
  `PaymentDate` datetime(6) NOT NULL,
  `PaymentMethod` longtext NOT NULL,
  `Status` int(11) NOT NULL,
  `CreatedAt` datetime(6) NOT NULL,
  `UpdatedAt` datetime(6) NOT NULL,
  `CapsuleId` int(11) DEFAULT NULL,
  `TabletId` int(11) DEFAULT NULL,
  `LiquidFillingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quotes`
--

CREATE TABLE `quotes` (
  `Id` int(11) NOT NULL,
  `FullName` longtext NOT NULL,
  `CompanyName` longtext DEFAULT NULL,
  `Address` longtext DEFAULT NULL,
  `City` longtext DEFAULT NULL,
  `State` longtext DEFAULT NULL,
  `PostalCode` longtext DEFAULT NULL,
  `Country` longtext DEFAULT NULL,
  `EmailAddress` longtext NOT NULL,
  `Phone` longtext DEFAULT NULL,
  `Comments` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tablets`
--

CREATE TABLE `tablets` (
  `Id` int(11) NOT NULL,
  `ModelNumber` longtext NOT NULL,
  `Dies` longtext DEFAULT NULL,
  `MaxPressure` float NOT NULL,
  `MaxTabletDiameterMM` float NOT NULL,
  `MaxDepthOfFillMM` float NOT NULL,
  `ProductionCapacity` longtext DEFAULT NULL,
  `MachineSize` longtext DEFAULT NULL,
  `NetWeightKG` float NOT NULL,
  `Avatar` longtext DEFAULT NULL,
  `Price` decimal(65,30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tablets`
--

INSERT INTO `tablets` (`Id`, `ModelNumber`, `Dies`, `MaxPressure`, `MaxTabletDiameterMM`, `MaxDepthOfFillMM`, `ProductionCapacity`, `MachineSize`, `NetWeightKG`, `Avatar`, `Price`) VALUES
(2, 'VNS001', '14', 599, 15, 8, '2000', '32', 150, '/uploads/37ad2566-6d06-4468-a3dd-b08bd67b3fda.jpg', 1498.000000000000000000000000000000),
(3, 'VNS002', '10', 500, 14, 8, '2000', '800', 150, '/uploads/1f992e0b-4ec0-4982-9c4c-363cc5af9f6b.jpg', 1500.000000000000000000000000000000),
(4, 'VN0S03', '16', 600, 19, 8, '1000', '1200', 150, '/uploads/d56c7d47-63ae-4140-97b6-e1f0b71d03d5.jpg', 999.000000000000000000000000000000),
(5, 'VNS004', '20', 700, 19, 30, '2000', '200 x 100 x 100', 150, '/uploads/2d1f98b0-9a6d-492e-8907-9badb5c893a5.jpg', 1500.000000000000000000000000000000),
(12, 'VNS004', '12', 500, 14, 8, '2000', '800 x 600 x 500', 150, '/uploads/851644f1-b767-4723-b8c4-319cd7691247.jpg', 1500.000000000000000000000000000000),
(13, 'VNS006', '15', 400, 15, 9, '2000', '800 x 700 x 600 ', 156, '/uploads/b86100be-840a-4c8c-89b3-5086144b29c0.jpg', 3000.000000000000000000000000000000),
(14, 'VNS007', '13', 313, 12, 8, '1300', '700 x 500 x 800', 150, '/uploads/02a40d09-4569-44cd-b4f4-cbbfe88d83f7.jpg', 2300.000000000000000000000000000000),
(15, 'VNS008', '15', 300, 15, 9, '1500', '600 x 500 x 400', 150, '/uploads/6ffe4966-d74f-44d9-bbd1-7ee84a5c20c2.jpg', 1500.000000000000000000000000000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `capsules`
--
ALTER TABLE `capsules`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `cvsubmissions`
--
ALTER TABLE `cvsubmissions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CandidateId` (`CandidateId`),
  ADD KEY `JobId` (`JobId`);

--
-- Chỉ mục cho bảng `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `liquidfillings`
--
ALTER TABLE `liquidfillings`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CandidateId` (`CandidateId`),
  ADD KEY `CapsuleId` (`CapsuleId`),
  ADD KEY `TabletId` (`TabletId`),
  ADD KEY `LiquidFillingId` (`LiquidFillingId`);

--
-- Chỉ mục cho bảng `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `tablets`
--
ALTER TABLE `tablets`
  ADD PRIMARY KEY (`Id`);

--
-- Chỉ mục cho bảng `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `candidates`
--
ALTER TABLE `candidates`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `capsules`
--
ALTER TABLE `capsules`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `cvsubmissions`
--
ALTER TABLE `cvsubmissions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT cho bảng `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT cho bảng `job`
--
ALTER TABLE `job`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `liquidfillings`
--
ALTER TABLE `liquidfillings`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `quotes`
--
ALTER TABLE `quotes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tablets`
--
ALTER TABLE `tablets`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cvsubmissions`
--
ALTER TABLE `cvsubmissions`
  ADD CONSTRAINT `cvsubmissions_ibfk_1` FOREIGN KEY (`CandidateId`) REFERENCES `candidates` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cvsubmissions_ibfk_2` FOREIGN KEY (`JobId`) REFERENCES `job` (`Id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`CandidateId`) REFERENCES `candidates` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`CapsuleId`) REFERENCES `capsules` (`Id`),
  ADD CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`TabletId`) REFERENCES `tablets` (`Id`),
  ADD CONSTRAINT `payments_ibfk_4` FOREIGN KEY (`LiquidFillingId`) REFERENCES `liquidfillings` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
