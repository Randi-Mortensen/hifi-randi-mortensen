-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 06. 10 2017 kl. 08:49:33
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
-- Database: `hifi`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `producent`
--

CREATE TABLE `producent` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `producent`
--

INSERT INTO `producent` (`id`, `navn`) VALUES
(1, 'Sony'),
(2, 'Pioneer'),
(3, 'Grundig'),
(4, 'Sonos');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `produkt`
--

CREATE TABLE `produkt` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL,
  `producent` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `billede` varchar(30) NOT NULL,
  `varenr` int(11) NOT NULL,
  `pris` decimal(5,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `produkt`
--

INSERT INTO `produkt` (`id`, `navn`, `producent`, `type`, `billede`, `varenr`, `pris`) VALUES
(1, 'CDP-CE405', 1, 1, 'sonycd.png', 501, '800'),
(2, 'Sonos Surroundanlæg', 4, 4, 'sonossp.png', 801, '15396'),
(3, 'Pro-Ject', 4, 3, 'record1.png', 701, '8499'),
(4, 'DV-2242', 2, 2, 'piodvd.png', 601, '425'),
(5, 'creek_classic', 3, 1, 'creek_classic_cd.jpg', 502, '935'),
(6, 'parasound d200', 2, 2, 'parasound_d200.jpg', 602, '565'),
(7, 'plx-500-k', 1, 3, 'plx-500-k.jpg', 702, '1945'),
(8, 'epos-m5', 2, 4, 'epos_m5.gif', 802, '987'),
(9, 'pw-268-ed', 3, 4, 'sp.jpg', 803, '1989'),
(10, 'pro-red', 4, 3, 'pro_red.jpg', 703, '825'),
(11, 'exposure', 1, 2, 'exposure_2010s.jpg', 603, '775'),
(12, 'exp-2010s', 1, 1, 'exp_2010s_cd.gif', 503, '1195');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `type`
--

INSERT INTO `type` (`id`, `navn`) VALUES
(1, 'CD Player'),
(2, 'DVD Player'),
(3, 'Record Player'),
(4, 'Speaker');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `producent`
--
ALTER TABLE `producent`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producent` (`producent`),
  ADD KEY `type` (`type`);

--
-- Indeks for tabel `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `producent`
--
ALTER TABLE `producent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `produkt`
--
ALTER TABLE `produkt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Tilføj AUTO_INCREMENT i tabel `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `produkt`
--
ALTER TABLE `produkt`
  ADD CONSTRAINT `produkt_ibfk_1` FOREIGN KEY (`producent`) REFERENCES `producent` (`id`),
  ADD CONSTRAINT `produkt_ibfk_2` FOREIGN KEY (`type`) REFERENCES `type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
