-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 12. 12 2017 kl. 10:57:23
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hifi2`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `accesstokens`
--

CREATE TABLE `accesstokens` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `token` varchar(600) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `position` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `menu`
--

INSERT INTO `menu` (`id`, `name`, `description`, `created`, `position`) VALUES
(1, 'Forside', NULL, '2017-11-10 09:25:41', 1),
(2, 'Produkter', NULL, '2017-11-10 09:25:41', 2),
(3, 'Kontakt', NULL, '2017-11-10 09:26:44', 3),
(4, 'Om Os', NULL, '2017-11-10 09:26:44', 4);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `producent`
--

CREATE TABLE `producent` (
  `producent_id` int(11) NOT NULL,
  `producent_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `producent`
--

INSERT INTO `producent` (`producent_id`, `producent_name`) VALUES
(1, 'Sony'),
(2, 'Pioneer'),
(3, 'Grundig'),
(4, 'Sonos');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `producent` int(11) NOT NULL,
  `product_type` int(11) NOT NULL,
  `product_itemnumber` int(11) NOT NULL,
  `product_price` decimal(5,0) NOT NULL,
  `product_image` varchar(30) NOT NULL,
  `product_description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `producent`, `product_type`, `product_itemnumber`, `product_price`, `product_image`, `product_description`) VALUES
(1, 'CDP-CE405', 1, 1, 501, '849', 'sonycd.png', 'Dette er en CD-player'),
(2, 'Sonos Surroundanlæg', 4, 4, 801, '15396', 'sonossp.png', 'Dette er et Surroundanlæg'),
(3, 'Pro-Ject', 4, 3, 701, '849', 'record1.png', 'Dette er en Pladespiller'),
(4, 'DV-2242', 2, 2, 601, '425', 'piodvd.png', 'Dette er en DVD-player'),
(5, 'creek_classic', 3, 1, 502, '935', 'creek_classic_cd.jpg', 'Dette er en CD-player'),
(6, 'parasound d200', 2, 2, 602, '565', 'parasound_d200.jpg', 'Dette er en DVD-player'),
(7, 'plx-500-k', 1, 3, 702, '1945', 'plx-500-k.jpg', 'Dette er en Pladespiller'),
(8, 'epos-m5', 2, 4, 802, '987', 'epos_m5.gif', 'Dette er Højtalere'),
(9, 'pw-268-ed', 3, 4, 803, '1989', 'sp.jpg', 'Dette er Højtalere'),
(10, 'pro-red', 4, 3, 703, '825', 'pro_red.jpg', 'Dette er en Pladespiller'),
(11, 'exposure', 1, 2, 603, '775', 'exposure_2010s.jpg', 'Dette er en DVD-player'),
(12, 'exp-2010s', 1, 1, 503, '1195', 'exp_2010s_cd.gif', 'Dette er en CD-player');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `product_type`
--

CREATE TABLE `product_type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `product_type`
--

INSERT INTO `product_type` (`type_id`, `type_name`) VALUES
(1, 'CD Player'),
(2, 'DVD Player'),
(3, 'Record Player'),
(4, 'Speaker');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'sha1$db4788b0$1$fdb72d43f670f34e23fd2d6f559ed543ad1248c9');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `accesstokens`
--
ALTER TABLE `accesstokens`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `producent`
--
ALTER TABLE `producent`
  ADD PRIMARY KEY (`producent_id`);

--
-- Indeks for tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `producent` (`producent`),
  ADD KEY `product_type` (`product_type`);

--
-- Indeks for tabel `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `accesstokens`
--
ALTER TABLE `accesstokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tilføj AUTO_INCREMENT i tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `producent`
--
ALTER TABLE `producent`
  MODIFY `producent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tilføj AUTO_INCREMENT i tabel `product_type`
--
ALTER TABLE `product_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`producent`) REFERENCES `producent` (`producent_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_type`) REFERENCES `product_type` (`type_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
