-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: koios_schema
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `osoba`
--

DROP TABLE IF EXISTS `osoba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `osoba` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) DEFAULT NULL,
  `prezime` varchar(45) DEFAULT NULL,
  `adresa` varchar(255) DEFAULT NULL,
  `grad` varchar(45) DEFAULT NULL,
  `datumRodenja` date DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `osoba`
--

LOCK TABLES `osoba` WRITE;
/*!40000 ALTER TABLE `osoba` DISABLE KEYS */;
INSERT INTO `osoba` VALUES (10,'qqqqqqqq','asd','asd','AAAAAAAAAAAAA','2022-10-06','hanzekj@hotmail.com'),(11,'gggg','g','g','g','2022-10-12','hanzekj@hotmail.com'),(12,'aqw','asd','asd','asd','2022-09-30','asds@email.com'),(13,'aqw','asd','asd','asd','2022-09-30','asds@email.com'),(15,'asd','asd','asd','asd','2022-10-06','hanzekj@hotmail.com'),(17,'qqqqqqqq','za','asd','asd','2022-10-20','email@email.com'),(18,'asd','asd','s','stavka','2022-10-11','lajbek98@gmail.com');
/*!40000 ALTER TABLE `osoba` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-30 11:58:11
