-- MariaDB dump 10.17  Distrib 10.4.13-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: news
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `image` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Serbia-Kosovo dispute: Stalled talks set to resume in Brussels but what\'s at stake?','Talks to ease tensions between Kosovo and Serbia will resume on Sunday, the EU has announced.\n\nKosovo\'s prime minister, Avdullah Hoti and the president of Serbia, Aleksandar Vučić are set to travel to Brussels for a \"high-level meeting of the EU-facilitated dialogue\" on Sunday.\n\nAhead of the meeting, French President Emmanuel Macron and German Chancellor Angela Merkel will hold a videoconference summit on Friday with Vučić and Hoti, as well as EU foreign affairs and policy chief, Josep Borrell Fontelles and EU special envoy Miroslav Lajčak.\n\nThe goal is an agreement between the former Yugoslav territories which are still at odds over 20 years after they were at the centre of one of Europe\'s most violent conflicts, which killed more than 13,000 people.\n\nIn short: Serbia considers Kosovo part of its territory, while Kosovo considers itself an independent state.',1,10,'E9eOlzAPPiTMp-QUUR3a5.jpg'),(2,'COVID-19 travel: Italy bans entry to arrivals from 13 \'at risk\' countries','Italy has banned entry to arrivals from 13 countries deemed to be high risk on Friday amid fears of a second wave of coronavirus.\n\nTravellers who have stayed or transited through any of the countries on the list - which are judged to have high COVID-19 infection rates - in the last 14 days will be now be denied entry into Italy.\n\nItalian residents returning from these countries are being asked to self-isolate for two weeks.\n\nCountries on the banned list include Brazil, Bangladesh, Chile, Peru and Bosnia.\n\nItalian authorities are being cautious, wanting to avoid previous mistakes in dealing with the virus.',4,11,'MMb6WWq_YBZ5jJM5kgTFn.jpg');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8mb4 NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Politics',NULL),(3,'Human rights',NULL),(4,'Health',NULL),(6,'Humor',NULL),(7,'Culture',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `password` char(60) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'Tony Stark','$2b$10$.lDCz.MjwJyG7vW8h502OOEbus5ywJayDmLBPw6Z2l7r2xD5cVIq2'),(11,'Steve Rogers','$2b$10$2U4eTJRK3dTSxm2.RNqQV.FKCCsrhLJLoMpQi5uNPSGLnTp5O08ka'),(12,'Bruce Benner','$2b$10$JG9OXRMPeg9fSSNSH4ovK.YQz9VLXmx7VLiJXBsLLD2kIfZTSjo62'),(13,'daria_ch','$2b$10$VQatK2DQuk7jzpIYzs/8iurYBgS0ivTM3OD4BbYZurarYU8W0xcky');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-11 23:59:25
