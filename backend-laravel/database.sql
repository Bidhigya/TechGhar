-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: backend_ecomm_laravel
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Uncategorized','1','2025-10-28 07:31:56','2025-10-28 07:31:56'),(2,'Apple','1','2025-10-28 10:13:32','2025-10-28 10:13:32'),(3,'Mi','1','2025-10-28 10:13:43','2025-10-28 10:13:43'),(4,'Samsung','1','2025-10-28 10:13:52','2025-10-28 10:13:52'),(5,'OnePlus','1','2025-10-28 21:57:14','2025-10-28 21:57:14');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Mobile','1','2025-10-28 03:19:11','2025-10-28 03:19:11'),(2,'Laptop','1','2025-10-28 04:04:24','2025-10-28 04:04:24'),(3,'Earpods','1','2025-10-28 04:33:50','2025-10-28 04:33:50'),(4,'TV','1','2025-10-28 04:34:00','2025-10-28 04:34:00'),(5,'Watch','1','2025-10-28 22:02:01','2025-10-28 22:02:01');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_12_24_142202_create_personal_access_tokens_table',1),(5,'2024_12_26_184727_create_categories_table',1),(6,'2024_12_26_184853_create_brands_table',1),(7,'2025_01_06_101118_create_products_table',1),(8,'2025_01_06_103621_create_ports_table',1),(9,'2025_01_06_105028_create_product_images_table',1),(10,'2025_01_06_110106_create_product_specs_table',1),(11,'2025_01_06_110928_create_temp_images_table',1),(12,'2025_02_24_130926_create_orders_table',1),(13,'2025_02_24_131918_create_order_items_table',1),(14,'2025_03_29_155456_alter_users_table',1),(15,'2025_04_01_124640_create_shipping_charges_table',1),(17,'2025_10_29_030409_alter_orders_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `port` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `unit_price` double NOT NULL,
  `qty` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,2,'Mi Notebook Air 13','White',1200,1200,1,'2025-10-28 09:41:45','2025-10-28 09:41:45'),(2,2,3,'Redmi Note 13 Pro','White',4200,1400,3,'2025-10-28 10:26:43','2025-10-28 10:26:43'),(3,3,4,'Apple Pro Max 16','Black',4800,1600,3,'2025-10-28 12:09:33','2025-10-28 12:09:33'),(4,5,4,'Samsung S24 Ultra','Grey',150000,150000,1,'2025-10-28 12:09:33','2025-10-28 12:09:33'),(5,5,5,'Samsung S24 Ultra','Grey',150000,150000,1,'2025-10-28 12:14:10','2025-10-28 12:14:10'),(6,4,5,'MI TV Q1 4K 55','Black',59998,29999,2,'2025-10-28 12:14:10','2025-10-28 12:14:10'),(7,2,6,'Redmi Note 13 Pro','Grey',1400,1400,1,'2025-10-28 21:16:46','2025-10-28 21:16:46'),(8,1,7,'Mi Notebook Air 13','White',2400,1200,2,'2025-10-28 21:36:08','2025-10-28 21:36:08'),(9,5,8,'Samsung S24 Ultra','Grey',300000,150000,2,'2025-10-28 21:45:00','2025-10-28 21:45:00'),(10,4,9,'MI TV Q1 4K 55','Black',29999,29999,1,'2025-10-28 21:47:27','2025-10-28 21:47:27'),(11,7,10,'Samsung Galaxy Watch 6','Black',8000,4000,2,'2025-10-28 22:17:58','2025-10-28 22:17:58'),(12,6,11,'NordBuds 3 TWS Pro','Black',1198,599,2,'2025-10-28 22:18:52','2025-10-28 22:18:52');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `sub_total` double NOT NULL,
  `grand_total` double NOT NULL,
  `shipping` double NOT NULL,
  `discount` double DEFAULT NULL,
  `payment_status` enum('paid','not_paid') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'not_paid',
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cod',
  `status` enum('pending','shipped','delivered','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,5,1200,1300,100,0,'not_paid','cod','shipped','Ram','ram@gmail.com','980000000','Illam, Chiyabari-3','Chiyabari','Koshi Province','57300','2025-10-28 09:41:45','2025-10-28 11:23:28'),(3,5,4200,4500,300,0,'paid','cod','delivered','Ram','ram@gmail.com','980000000','Illam, Chiyabari-3','Chiyabari','Koshi Province','57300','2025-10-28 10:26:43','2025-10-28 11:23:07'),(4,9,154800,155200,400,0,'not_paid','cod','pending','hari','hari@gmail.com','9856245242','Road Gunj, Nepalgunj','Nepalgunj','Pashim Province','578889','2025-10-28 12:09:33','2025-10-28 12:09:33'),(5,5,209998,210298,300,0,'not_paid','cod','pending','Ram','ram@gmail.com','980000000','Illam, Chiyabari-3','Chiyabari','Koshi Province','57300','2025-10-28 12:14:10','2025-10-28 12:14:10'),(6,5,1400,1500,100,0,'paid','stripe','shipped','Ram','ram@gmail.com','980000000','Illam, Chiyabari-3','Chiyabari','Koshi Province','57300','2025-10-28 21:16:46','2025-10-28 21:16:46'),(7,9,2400,2600,200,0,'paid','stripe','pending','hari','hari@gmail.com','9856245242','Road Gunj, Nepalgunj','Nepalgunj','Pashim Province','578889','2025-10-28 21:36:08','2025-10-28 21:36:08'),(8,9,300000,300200,200,0,'paid','stripe','pending','hari','hari@gmail.com','9856245242','Road Gunj, Nepalgunj','Nepalgunj','Pashim Province','578889','2025-10-28 21:45:00','2025-10-28 21:45:00'),(9,9,29999,30099,100,0,'not_paid','cod','pending','hari','hari@gmail.com','9856245242','Road Gunj, Nepalgunj','Nepalgunj','Pashim Province','578889','2025-10-28 21:47:27','2025-10-28 21:47:27'),(10,9,8000,8200,200,0,'not_paid','cod','pending','hari','hari@gmail.com','9856245242','Road Gunj, Nepalgunj','Nepalgunj','Pashim Province','578889','2025-10-28 22:17:58','2025-10-28 22:17:58'),(11,9,1198,1398,200,0,'paid','stripe','pending','hari','hari@gmail.com','9856245242','Road Gunj, Nepalgunj','Nepalgunj','Pashim Province','578889','2025-10-28 22:18:52','2025-10-28 22:18:52');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'token','83fd84dbfbe4653a3ac71032aca6c4cd35820d579cf7a718dac2ce8e727a8453','[\"*\"]','2025-10-28 02:15:28',NULL,'2025-10-28 02:15:14','2025-10-28 02:15:28'),(2,'App\\Models\\User',4,'token','5a90ecdc2379cf1ad4c466cdf9ec4c3aba4ec9b173bba91a5dd2f316b6d69ae7','[\"*\"]','2025-10-28 05:08:36',NULL,'2025-10-28 02:22:44','2025-10-28 05:08:36'),(3,'App\\Models\\User',4,'token','29cddb12725f1354b71bd82185d7dc2a566d28110ab8eebf3ae7a53e1132f465','[\"*\"]','2025-10-28 06:39:47',NULL,'2025-10-28 05:09:28','2025-10-28 06:39:47'),(4,'App\\Models\\User',5,'token','66a6f78526d774a95fb6db8af78daf0ce88fd5b09eb606153255633bd75f7756','[\"*\"]','2025-10-28 06:47:24',NULL,'2025-10-28 06:47:13','2025-10-28 06:47:24'),(5,'App\\Models\\User',4,'token','5cca962cd2bb249e2e32a6f72eb20015e00f778eba082a7eaa006f46c810aed0','[\"*\"]','2025-10-28 07:15:58',NULL,'2025-10-28 06:48:25','2025-10-28 07:15:58'),(6,'App\\Models\\User',5,'token','482e7bcd6a4911c85239f059d609418f40d7117487c82afd3f95d2a4bf13c5c6','[\"*\"]','2025-10-28 07:26:49',NULL,'2025-10-28 07:16:13','2025-10-28 07:26:49'),(7,'App\\Models\\User',4,'token','0fcc1135af078e2788fe4961b2efa00203765e3138fd74c0273bf7b80b0f9b9c','[\"*\"]','2025-10-28 08:35:06',NULL,'2025-10-28 07:27:17','2025-10-28 08:35:06'),(8,'App\\Models\\User',5,'token','9a2957c1287bd1e7e119fcaf6ebe1aa03da7976c786deb9e1e52c72a556a5e76','[\"*\"]','2025-10-28 08:39:11',NULL,'2025-10-28 08:35:25','2025-10-28 08:39:11'),(9,'App\\Models\\User',5,'token','af09692a7a1c850bb2eb7a5b07bb1110cf7334290fa55c13ca3794da6c525a58','[\"*\"]','2025-10-28 08:50:11',NULL,'2025-10-28 08:47:46','2025-10-28 08:50:11'),(10,'App\\Models\\User',5,'token','78f851c48c0a89c7f57f3d5ab035f24d23a3eeebf4030ea98d876fc3653d324b','[\"*\"]','2025-10-28 08:53:56',NULL,'2025-10-28 08:53:34','2025-10-28 08:53:56'),(11,'App\\Models\\User',5,'token','95c7c5147f8589fdb3984226daf992d85721960f496e5f9afe866e7f969854c7','[\"*\"]','2025-10-28 08:54:39',NULL,'2025-10-28 08:54:39','2025-10-28 08:54:39'),(12,'App\\Models\\User',4,'token','47ba82e0598ce9406854de38ba7f18401e0c70007b2f26b63e0dd2bdba35da43','[\"*\"]',NULL,NULL,'2025-10-28 08:56:54','2025-10-28 08:56:54'),(13,'App\\Models\\User',5,'token','2318a53c46aa9c6f764bbc8a1f03b76523b5287ada300518404b5af741c35770','[\"*\"]','2025-10-28 10:26:43',NULL,'2025-10-28 08:57:23','2025-10-28 10:26:43'),(14,'App\\Models\\User',4,'token','e2f95f4819f09e7a9743d0a8d1f3e6ba65d6553e360b88a448b638a425b0acd9','[\"*\"]','2025-10-28 11:32:48',NULL,'2025-10-28 09:14:43','2025-10-28 11:32:48'),(15,'App\\Models\\User',4,'token','09898c66823dff1a66bd5fabb5c195a9264f6a049a2bb0d2df403b2f424f708d','[\"*\"]','2025-10-28 22:49:46',NULL,'2025-10-28 11:33:17','2025-10-28 22:49:46'),(16,'App\\Models\\User',9,'token','7d52999a0e652daa444f6243f3b8874a1cbc38a94b4c599c8bc2363cae6c1b9b','[\"*\"]','2025-10-28 12:10:52',NULL,'2025-10-28 12:08:12','2025-10-28 12:10:52'),(17,'App\\Models\\User',5,'token','cb43b4d23dfbabbff0e9991517d334b9769097eb60bc2c8646bf59605f8bacf7','[\"*\"]','2025-10-28 12:15:39',NULL,'2025-10-28 12:11:17','2025-10-28 12:15:39'),(18,'App\\Models\\User',5,'token','062d32387d80679af2a052c60e0927364769d2c7745f3689ae60edf754a68dbc','[\"*\"]','2025-10-28 21:25:56',NULL,'2025-10-28 12:19:31','2025-10-28 21:25:56'),(19,'App\\Models\\User',9,'token','bd9f620dea496ca6769b5609d6c72eb5e71b110ac652708e4ef0325abc43a096','[\"*\"]','2025-10-28 22:51:00',NULL,'2025-10-28 21:26:05','2025-10-28 22:51:00');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ports`
--

DROP TABLE IF EXISTS `ports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ports`
--

LOCK TABLES `ports` WRITE;
/*!40000 ALTER TABLE `ports` DISABLE KEYS */;
INSERT INTO `ports` VALUES (8,'White','2025-10-28 08:20:17','2025-10-28 08:20:41'),(9,'Grey','2025-10-28 08:20:23','2025-10-28 08:20:33'),(10,'Black','2025-10-28 08:27:56','2025-10-28 08:27:56');
/*!40000 ALTER TABLE `ports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'1-35331761657481.jpg','2025-10-28 07:33:01','2025-10-28 07:33:01'),(2,1,'1-53201761657481.jpg','2025-10-28 07:33:01','2025-10-28 07:33:01'),(3,2,'2-18601761667461.jpg','2025-10-28 10:19:21','2025-10-28 10:19:21'),(4,2,'2-20191761667461.jpg','2025-10-28 10:19:21','2025-10-28 10:19:21'),(5,3,'3-73041761672306.jpg','2025-10-28 11:40:06','2025-10-28 11:40:06'),(6,3,'3-83291761672306.jpg','2025-10-28 11:40:06','2025-10-28 11:40:06'),(7,4,'4-66631761672865.webp','2025-10-28 11:49:25','2025-10-28 11:49:25'),(8,4,'4-57381761672865.webp','2025-10-28 11:49:25','2025-10-28 11:49:25'),(9,4,'4-58841761672865.webp','2025-10-28 11:49:26','2025-10-28 11:49:26'),(10,4,'4-17371761672866.jpg','2025-10-28 11:49:26','2025-10-28 11:49:26'),(11,5,'5-64721761673113.png','2025-10-28 11:53:34','2025-10-28 11:53:34'),(12,5,'5-39891761673114.webp','2025-10-28 11:53:34','2025-10-28 11:53:34'),(13,5,'5-23721761673114.jpg','2025-10-28 11:53:34','2025-10-28 11:53:34'),(14,6,'6-75711761709544.jpg','2025-10-28 22:00:44','2025-10-28 22:00:44'),(15,6,'6-82361761709544.jpg','2025-10-28 22:00:44','2025-10-28 22:00:44'),(16,6,'6-19141761709544.jpg','2025-10-28 22:00:44','2025-10-28 22:00:44'),(17,7,'7-49741761709772.jpg','2025-10-28 22:04:32','2025-10-28 22:04:32'),(18,7,'7-26751761709772.jpg','2025-10-28 22:04:32','2025-10-28 22:04:32'),(19,7,'7-58291761709772.jpg','2025-10-28 22:04:32','2025-10-28 22:04:32'),(20,8,'8-16811761710925.webp','2025-10-28 22:23:45','2025-10-28 22:23:45'),(21,8,'8-76131761710925.jpg','2025-10-28 22:23:45','2025-10-28 22:23:45'),(22,8,'8-14151761710925.webp','2025-10-28 22:23:45','2025-10-28 22:23:45'),(24,9,'9-46341761712250.jpg','2025-10-28 22:45:50','2025-10-28 22:45:50'),(25,9,'9-77761761712250.jpg','2025-10-28 22:45:50','2025-10-28 22:45:50');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specs`
--

DROP TABLE IF EXISTS `product_specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `port_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_specs_product_id_foreign` (`product_id`),
  KEY `product_specs_port_id_foreign` (`port_id`),
  CONSTRAINT `product_specs_port_id_foreign` FOREIGN KEY (`port_id`) REFERENCES `ports` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_specs_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specs`
--

LOCK TABLES `product_specs` WRITE;
/*!40000 ALTER TABLE `product_specs` DISABLE KEYS */;
INSERT INTO `product_specs` VALUES (6,1,8,'2025-10-28 10:14:11','2025-10-28 10:14:11'),(7,1,9,'2025-10-28 10:14:11','2025-10-28 10:14:11'),(8,1,10,'2025-10-28 10:14:11','2025-10-28 10:14:11'),(12,2,8,'2025-10-28 10:24:43','2025-10-28 10:24:43'),(13,2,9,'2025-10-28 10:24:43','2025-10-28 10:24:43'),(14,2,10,'2025-10-28 10:24:43','2025-10-28 10:24:43'),(15,3,9,'2025-10-28 11:40:06','2025-10-28 11:40:06'),(16,3,10,'2025-10-28 11:40:06','2025-10-28 11:40:06'),(28,5,8,'2025-10-28 11:54:59','2025-10-28 11:54:59'),(29,5,9,'2025-10-28 11:54:59','2025-10-28 11:54:59'),(30,5,10,'2025-10-28 11:54:59','2025-10-28 11:54:59'),(31,4,8,'2025-10-28 12:00:29','2025-10-28 12:00:29'),(32,4,10,'2025-10-28 12:00:29','2025-10-28 12:00:29'),(33,6,9,'2025-10-28 22:00:44','2025-10-28 22:00:44'),(34,6,10,'2025-10-28 22:00:44','2025-10-28 22:00:44'),(35,7,8,'2025-10-28 22:04:32','2025-10-28 22:04:32'),(36,7,9,'2025-10-28 22:04:32','2025-10-28 22:04:32'),(37,7,10,'2025-10-28 22:04:32','2025-10-28 22:04:32'),(38,8,8,'2025-10-28 22:23:45','2025-10-28 22:23:45'),(39,8,9,'2025-10-28 22:23:45','2025-10-28 22:23:45'),(40,8,10,'2025-10-28 22:23:45','2025-10-28 22:23:45'),(44,9,8,'2025-10-28 22:46:58','2025-10-28 22:46:58'),(45,9,9,'2025-10-28 22:46:58','2025-10-28 22:46:58'),(46,9,10,'2025-10-28 22:46:58','2025-10-28 22:46:58');
/*!40000 ALTER TABLE `product_specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `compare_price` double DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `brand_id` bigint unsigned DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `is_featured` enum('yes','no') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'yes',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_brand_id_foreign` (`brand_id`),
  CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Mi Notebook Air 13',1200,1500,NULL,'This is mi notebook air 13','1-35331761657481.jpg',2,2,15,'1200KU','157888',1,'yes','2025-10-28 07:33:01','2025-10-28 10:14:11'),(2,'Redmi Note 13 Pro',1400,1300,'<p>The Redmi Note 13 Pro 4G also doesn’t compromise on the memory front \neither with a base 8/256 GB variant that can be specced to 12/512GB. \nBoth of which are available in Nepal.</p>\n<h3><strong>Camera&nbsp;</strong></h3>\n<p>The Redmi Note 13 Pro 4G features an impressive triple-camera setup \non the rear, including a&nbsp; 200MP main, an 8MP ultrawide, and a 2MP macro \ncamera. There’s a 16MP selfie camera up front for clear and vivid \nself-portraits.</p>\n<ul>\n<li><strong>Also, read</strong></li>\n<li><a href=\"https://www.gadgetbytenepal.com/xiaomi-14-price-nepal/\" target=\"_blank\" rel=\"noopener\">Xiaomi 14 launched in Nepal with Leica cameras under Rs. 1 lakh</a></li>\n<li><a href=\"https://www.gadgetbytenepal.com/redmi-a3-price-nepal/\" target=\"_blank\" rel=\"noopener\">Redmi A3 goes official in Nepal with Android 14 and Helio G36 SoC</a></li>\n<li><a href=\"https://www.gadgetbytenepal.com/redmi-buds-5-price-nepal/\" target=\"_blank\" rel=\"noopener\">Redmi Buds 5 goes official in Nepal with 46dB ANC and 12.4mm titanium drivers</a></li>\n</ul>\n<h3><strong>Audio and Connectivity&nbsp;</strong></h3>\n<p>With dual speakers and a 3.5mm jack, the Redmi Note 13 Pro 4G caters \nto users who prioritize audio quality. Connectivity options include \nWi-Fi 5, Bluetooth 5.2, and various positioning systems such as GPS, \nGLONASS, GALILEO, and BDS. NFC capability is market/region dependent, \nwhile an infrared port is also included. Equipped with fingerprint \nsensing (under display, optical), virtual proximity sensing, \naccelerometer, gyro, and compass, the Redmi Note 13 Pro ensures a range \nof functionalities.</p>\n<h3><strong>Battery and Charging</strong></h3>\n<p>The smartphone houses a non-removable 5000mAh battery that supports \n67W wired charging. According to official advertisements, it claims to \nreach 50% battery in just 16 minutes and a full 100% charge in 46 \nminutes.</p>\n<h2><strong>Redmi Note 13 Pro 4G Specifications:</strong></h2>\n<ul>\n<li><strong>Dimensions</strong>: 162.3 x 75.6 x 8 mm (6.39 x 2.98 x 0.31 in)</li>\n<li><strong>Weight</strong>:188.5 g</li>\n<li><strong>Display</strong>: 6.67 inches AMOLED, 1300 nits (peak)</li>\n<li><strong>Refresh</strong> <strong>Rate</strong>: 120Hz</li>\n<li><strong>Resolution</strong>: 1080 x 2400 pixels, 20:9 ratio (~395 ppi density)</li>\n<li><strong>OS: </strong>Android 13, MIUI 14</li>\n<li><strong>Chipset</strong>: MediaTek Helio G99 Ultimate (6 nm)</li>\n<li><strong>CPU</strong>: Octa-core (2×2.2 GHz Cortex-A76 &amp; 6×2.0 GHz Cortex-A55)</li>\n<li><strong>GPU</strong>: Mali-G57 MC2</li>\n<li><strong>Rear</strong> <strong>Camera</strong>:\n<ul>\n<li>200MP, f/1.7, 23mm (wide), 1/1.4″, 0.56µm, multi-directional PDAF, OIS</li>\n<li>8MP, f/2.2, 120˚, (ultrawide)</li>\n<li>2MP, f/2.4, (macro)</li>\n</ul>\n</li>\n<li><strong>Selfie</strong> <strong>Camera</strong>: 16 MP, f/2.4, (wide)</li>\n<li><strong>Battery</strong>: 5000mAh, non-removable</li>\n<li><strong>Charging</strong>: 67W wired, 50% in 16 min, 100% in 46 min (advertised)</li>\n<li><strong>Colors:</strong> Midnight Black, Lavender Purple, Forest Green</li>\n<li><strong>Sound</strong>: Stereo Speaker</li>\n<li><strong>Headphone</strong> <strong>Jack</strong>: Yes</li>\n<li><strong>Sensor</strong>: Fingerprint (in-display, optical), Accelerometer, Gyro, Proximity, Compass&nbsp;&nbsp;</li></ul><h2><strong>Redmi Note 13 Pro 4G Price in Nepal and Availability</strong></h2>\n<p>The Redmi Note 13 Pro 4G is available for NPR 34,999 and NPR 39,999 \nin Nepal for the 8/256GB and the 12/512GB configurations, respectively. \nIt is available in various official stores of Xiaomi including <a href=\"https://hukut.com/\" target=\"_blank\" rel=\"noopener\">Hukut Store</a>.</p>\n<div class=\"su-table su-table-alternate\">\n<table class=\"tg\">\n<thead>\n<tr>\n<th class=\"tg-0lax\">Redmi Note 13 Pro 4G</th>\n<th class=\"tg-0lax\">Price in Nepal</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td class=\"tg-0lax\">8/256GB</td>\n<td class=\"tg-0lax\">NPR 34,999</td>\n</tr>\n<tr>\n<td class=\"tg-0lax\">12/512GB</td>\n<td class=\"tg-0lax\">NPR 39,999</td>\n</tr>\n</tbody>\n</table>\n</div>\n<ul>\n<li><em>Watch our <a href=\"https://www.gadgetbytenepal.com/redmi-note-13-pro-4g-review/\" target=\"_blank\" rel=\"noopener\">Redmi Note 13 Pro review</a></em></li></ul><p><a href=\"https://www.youtube.com/watch?v=BF879EQZZYs\" target=\"_blank\" rel=\"nofollow\">https://www.youtube.com/watch?v=BF879EQZZYs</a></p>','This is mi brand','2-18601761667461.jpg',1,3,15,'5678TT','4265326523',1,'yes','2025-10-28 10:19:21','2025-10-28 10:24:43'),(3,'Apple Pro Max 16',1600,2000,'<div class=\"text-content shown-all\"><h2><strong>iPhone 16 Pro Max Overview</strong></h2>\n<p>The iPhone 16 Pro Max is the peak offering from Apple for 2024 that succeeds the <a href=\"https://www.gadgetbytenepal.com/product/iphone-15-pro-max/\" target=\"_blank\" rel=\"noopener\">iPhone 15 Pro Max</a> and brings some incremental upgrades.</p>\n<h3><strong>Design and Display</strong></h3>\n<p>At a glance, the iPhone 16 Pro looks exactly the same as its \npredecessor with the iconic three-camera cutouts. However, on closer \ninspection, you can see that the new iPhone has an extra button on the \nside. It gives you digital camera-like controls on your camera app \nallowing you to flick between settings, zoom, and so on. Apple \nintroduced a new “Desert Titanium” colour option. Meanwhile, the other \nchoices are Black Titanium, White Titanium, and Natural Titanium.</p>\n<p>On the front, it has a Super Retina XDR display which is an OLED \npanel with adaptive refresh rates of up to 120Hz. The size of the screen\n has increased to GIGANTIC 6.9 inches from the 6.69 inches of the \nprevious generation. This makes the iPhone 16 Pro Max a phone with one \nof the largest displays in the world. It supports HDR, True Tone, Wide \nP3 colour gamut, and a brightness range of 1 to 2,000 nits. The phone is\n also IP68 water and dust-resistant.</p>\n<h3><strong>Performance and Cameras</strong></h3>\n<p>The performance has always been a strong suit of Apple smartphones, \nand this one is no different. The new Apple A18 Pro chipset sits at the \nheart of it with six cores dedicated to CPU as well as GPU. Likewise, \nthere are sixteen cores for the Neural Engine which handles on-device \nAI. Talking of AI, Apple Intelligence is the focal point of the iPhone \n16 series, including the Pro model. This phone comes with a boatload of \nAI features and 8GB memory to facilitate it. Meanwhile, you can choose \nbetween 256GB, 512GB, and 1TB for storage. The thing boots on <a href=\"https://www.apple.com/ios/ios-18/\" target=\"_blank\" rel=\"noopener nofollow\">iOS 18</a> and offers up to 105 hours of audio playback. Moreover, it supports 20W wired and 25W wireless charging.</p>\n<p>Moving on to the cameras, it has a 48MP primary fusion camera that \ncan also shoot 12MP 2x telephoto shots. Then there is another 48MP \nultrawide shooter that also has macro shots. Then there is the 12MP 5X \ntelephoto zoom lens with 2x optical zoom out and 10x optical zoom range.\n These camera sets allow users to record 4K Dolby Vision videos as well.\n On the front, the iPhone 16 Pro has a 12MP TrueDepth camera that is \nalso utilised for Face ID.</p>\n<ul>\n<li><br></li>\n</ul>\n                </div>\n                \n                <div class=\"action\">\n                    <br></div>','This is apple product mobile','3-73041761672306.jpg',1,2,20,'EE4556','12671628',1,'','2025-10-28 11:40:06','2025-10-28 11:40:06'),(4,'MI TV Q1 4K 55',29999,40000,'<h2 class=\"pdp-mod-section-title outer-title\" data-spm-anchor-id=\"a2a0e.pdp_revamp.0.i1.61f15cc1oRrSe4\">Product\n details of MI TV Q1 189.34cm 75 Inch QLED Smart TV | M120Hz Refresh \nRate | Reality Flow 120 | 192 Zone Full Array Local Dimming |  Android \nTV |Hands free google  assistant | 2+32 GB</h2><div class=\"pdp-product-detail\" data-spm=\"product_detail\"><div class=\"pdp-product-desc \"><div class=\"message message_platform_pc message_type_info\" data-nosnippet=\"true\"><svg class=\"lazadaicon lazada-icon svgfont message__icon\" aria-hidden=\"true\"><use xlink:href=\"https://www.daraz.com.np/products/mi-tv-q1-18934cm-75-inch-qled-smart-tv-m120hz-refresh-rate-reality-flow-120-192-zone-full-array-local-dimming-android-tv-hands-free-google-assistant-232-gb-i119664642-s1032832559.html?c=&amp;channelLpJumpArgs=&amp;clickTrackInfo=query%253Ami%252Bqled%252Btv%253Bnid%253A119664642%253Bsrc%253ALazadaMainSrp%253Brn%253Ac0ca1ba802cb5e29b6a88cc7927ee3f2%253Bregion%253Anp%253Bsku%253A119664642_NP%253Bprice%253A299999%253Bclient%253Adesktop%253Bsupplier_id%253A900151896003%253Bbiz_source%253Ah5_external%253Bslot%253A0%253Butlog_bucket_id%253A470687%253Basc_category_id%253A10000269%253Bitem_id%253A119664642%253Bsku_id%253A1032832559%253Bshop_id%253A35007%253BtemplateInfo%253A-1_A3_C%25231103_L%2523&amp;freeshipping=0&amp;fs_ab=1&amp;fuse_fs=&amp;lang=en&amp;location=Bagmati%20Province&amp;price=299999&amp;priceCompare=skuId%3A1032832559%3Bsource%3Alazada-search-voucher%3Bsn%3Ac0ca1ba802cb5e29b6a88cc7927ee3f2%3BoriginPrice%3A29999900%3BdisplayPrice%3A29999900%3BsinglePromotionId%3A-1%3BsingleToolCode%3A-1%3BvoucherPricePlugin%3A0%3Btimestamp%3A1761672684495&amp;ratingscore=&amp;request_id=c0ca1ba802cb5e29b6a88cc7927ee3f2&amp;review=&amp;sale=0&amp;search=1&amp;source=search&amp;spm=a2a0e.searchlist.list.0&amp;stock=1#lazadaicon_notes\"></use></svg><div class=\"message__text\"><div class=\"message__item\">The\n image provided here is only for reference purpose. Actual product \npackaging and materials may contain more and different information than \nwhat is shown on our app or website. We recommend that you do not rely \nsolely on the information presented here and that you always read \nlabels, warnings, and directions before using or consuming a product.</div></div></div><div class=\"html-content pdp-product-highlights\"><ul>\n	<li>Display Size: 189.34 cm (75 inch)</li>\n	<li>Screen Type: QLED</li>\n	<li>HD Technology &amp; Resolution: Ultra HD (4K), 3840 x 2160</li>\n	<li>Connection: HDMI - 3, USB - 2</li>\n	<li>Wi-Fi Type: 802.11 a/b/g/n/ac (2 x 2)</li>\n	<li>Picture Engine: Vivid Picture Engine (VPE)</li>\n	<li>View Angle: 178 Degree</li>\n	<li>LED Display Type: Direct LED</li>\n	<li>Refresh Rate: 120 Hz</li>\n	<li>Supported Video Formats: AV1, H.265, H.264, H.263, VP8/VP9, MPEG 1/2</li>\n	<li>Other Video Features: Dynamic Noise Reduction, Color Temperature \nControl, 14 Picture Modes (Dolby Vision Bright, Dolby Vision Dark, Dolby\n Vision Game, HDR10 Plus, HDR Vivid, HDR Movie, HDR Standard, Standard, \nVivid, Sport, Movie, HDR Game, Game and Monitor)</li>\n	<li>Number of Speakers: 6</li>\n	<li>Sound Technology: Dolby Audio, DTS-HD</li>\n	<li>Surround Sound: Stereo Sound</li>\n	<li>Speaker Output RMS: 30 W</li>\n	<li>Sound Mode: Standard, News, Movie, Game, Custom</li>\n	<li>Supported Audio Formats: Dolby Audio, MP3, FLAC, AMR, DTS, ADPCM, AAC, OGG, WMA, WAV</li>\n	<li>Other Audio Features: 5 Band Equalizer to Customize</li>\n	<li>Processor: A55 64-bit Quad-core Processor</li>\n	<li>Storage: 2GB - 32 GB</li>\n	<li>Operating System: Android, Android</li>\n</ul></div><div class=\"html-content detail-content\"><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/c80279e741214cc5f4e1364e0e55745f.jpg_2200x2200q80.jpg_.webp\"></div><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><br></div><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/40434dbf5a8ed3cabb24fb4918037b39.png_2200x2200q80.png_.webp\"></div><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><br></div><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/46acf386036919ae04d33598f3326e10.png_2200x2200q80.png_.webp\"></div><div style=\"size: 3.0px;margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><br></div><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/448ac9d23158f64925f152756d824820.png_2200x2200q80.png_.webp\"></div><div style=\"size: 3.0px;margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><br></div><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/b49ee7798f481432fe280f82a98d12aa.png_2200x2200q80.png_.webp\"></div></div><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/58938d78f095993d100fc5d4e798b7dc.png_2200x2200q80.png_.webp\"></div></div><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/3212987ce6716bcc509609f12009e11f.png_2200x2200q80.png_.webp\"></div></div><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><div style=\"width: 100.0%;\"><img style=\"width: 100.0%;display: block;\" src=\"https://img.drz.lazcdn.com/static/np/p/227f9a7ce4fdf16de74a7776f589953b.png_2200x2200q80.png_.webp\"></div></div><div style=\"margin: 0;padding: 8.0px 0;white-space: pre-wrap;\"><span>.</span></div></div><div class=\"pdp-mod-specification\"><h2 class=\"pdp-mod-section-title \">Specifications\n of MI TV Q1 189.34cm 75 Inch QLED Smart TV | M120Hz Refresh Rate | \nReality Flow 120 | 192 Zone Full Array Local Dimming |  Android TV \n|Hands free google  assistant | 2+32 GB</h2><div class=\"pdp-general-features\"><ul class=\"specification-keys\"><li class=\"key-li\"><span class=\"key-title\"> Brand  </span><div class=\"key-value\">MI</div></li><li class=\"key-li\"><span class=\"key-title\"> SKU  </span><div class=\"key-value\">119664642_NP-1032832559</div></li><li class=\"key-li\"><span class=\"key-title\"> USB Ports  </span><div class=\"key-value\">2</div></li><li class=\"key-li\"><span class=\"key-title\"> smart_tv_os  </span><div class=\"key-value\">Android OS</div></li><li class=\"key-li\"><span class=\"key-title\"> Resolution  </span><div class=\"key-value\">3,840 × 2,160</div></li><li class=\"key-li\"><span class=\"key-title\"> tv_resolution  </span><div class=\"key-value\">4K Ultra HD (2160p / 3840x2160)</div></li><li class=\"key-li\"><span class=\"key-title\"> HDMI Ports  </span><div class=\"key-value\">2</div></li><li class=\"key-li\"><span class=\"key-title\"> smart_tv  </span><div class=\"key-value\">Yes</div></li><li class=\"key-li\"><span class=\"key-title\"> display_size_tv  </span><div class=\"key-value\">75</div></li></ul></div></div></div></div>','This is MI TV Q1 4K 55','4-57381761672865.webp',4,3,30,'125RRT','Y67TT6',1,'yes','2025-10-28 11:49:25','2025-10-28 12:00:26'),(5,'Samsung S24 Ultra',150000,200000,'<div class=\"my-2 px-2\"><h3><strong>Samsung Galaxy S24 Ultra | Price in Nepal</strong></h3>\n\n<p>The highly anticipated Samsung Galaxy S24 Series, which offers a \nground-breaking breakthrough in smartphone technology, has finally been \nrevealed. The Galaxy S24, S24 Plus, and S24 Ultra are all part of the \nSamsung Galaxy S24 Series. The Snapdragon 8 Gen 3 CPU, which powers the \nrecently unveiled Galaxy S24 Ultra phone, is supported by the fastest \nmobile connectivity in the world. Additionally, this cutting-edge engine\n has generative artificial intelligence (AI), which enables users to \ncreate original content. Explore the different features and \nspecifications of the Samsung Galaxy S24 Series here.</p>\n\n<p>&nbsp;<br></p>\n\n<h3>Capture details that rival reality with 200MP</h3>\n\n<p>Meet the industry standard for camera quality, with the most \nmegapixels available on a smartphone. ProVisual engine improves color \ntone and brings out detail in every photo.</p>\n\n<p>&nbsp;<br></p>\n\n<p><img alt=\"\" src=\"https://www.samsungplaza.com.np/public/files/B37F1070BCC4DEC-Galaxy S24 Camera Overview.jpg\"></p>\n\n<p>&nbsp;<br></p>\n\n<h3>Enhance your Gaming Experience with Galaxy S24 Ultra</h3>\n\n<p>Victory can be yours with the new Snapdragon® 8 Gen 3 for Galaxy.19 \nFaster processing gives you the power you need for all the gameplay you \nwant</p>\n\n<p>&nbsp;<br></p>\n\n<p><img alt=\"Galaxy S24 Gaming Arena\" src=\"https://www.samsungplaza.com.np/public/files/83FA2149001747A-Galaxy S24 Ultra Gaming Arena.jpg\"></p>\n\n<p>&nbsp;<br></p>\n\n<p><strong>Explore New Era of Mobile AI with Samsung Galaxy S24 Ultra</strong></p>\n\n<ul>\n	<li>Circle to Search: Use S Pen or your finger to circle objects while \nwatching videos or scrolling through your phone and get the Google \nSearch results instantly.</li>\n	<li>Live Translate: Switch on the Live Translate feature from the \nsettings of the “Phone” app. Then set your language and choose the \ntranslated voice &amp; speech rate.</li>\n	<li>Note Assist: A long narrative is made short and to the point via \nNote Assist. Just begin writing, and AI will format your notes into a \nconcise, overview that is simple to read.</li>\n	<li>Generative Edit: The AI editing features of Galaxy S24 Ultra allow \nusers to relocate objects and fill the empty spaces intelligently.</li>\n	<li>Chat Assist: The Chat Assist capabilities of Galaxy AI help users \nget the real-time tone suggestions to make the writing sound more \nprofessional or conversational.</li>\n</ul>\n\n<p>&nbsp;<br></p>\n\n<p>&nbsp;<br></p></div><div class=\"\"><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Series</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Series </div><div class=\"my-auto\"><div class=\"px-2 py-1 bg-white border\">Galaxy S</div></div></div></div></div></div></div><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Processor</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">CPU Type | Technology </div><div class=\"my-auto\"><div class=\"px-2 py-1 bg-white border\">Octa-Core</div></div></div></div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">CPU Speed </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">3.39GHz</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">3.1GHz</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">2.9GHz</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">2.2GHz</div></div></div></div></div></div></div></div><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Display</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Display Size </div><div class=\"my-auto\"><div class=\"px-2 py-1 bg-white border\">6.8\"</div></div></div></div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Display Resolution </div><div class=\"my-auto\"><div class=\"px-2 py-1 bg-white border\">3120 x 1440 (Quad HD+)</div></div></div></div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Display Type/Technology </div><div class=\"my-auto\"><div class=\"px-2 py-1 bg-white border\">Dynamic AMOLED 2X</div></div></div></div></div></div></div><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Camera</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Front Camera </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">12.0 MP</div></div></div></div></div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Rear Camera </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">200.00 MP</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">50.0 MP</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">12.0 MP</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">10.0MP</div></div></div></div></div></div></div></div><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Memory</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">RAM Size </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">12 GB</div></div></div></div></div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">ROM Size </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">256 GB</div></div></div></div></div></div></div></div><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Connectivity</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Connectivity </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">GPS</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">USB Type-C</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">WiFi Direct</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">WiFi</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">5G</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">LTE</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">NFC</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Bluetooth</div></div></div></div></div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Sensors </div><div class=\"flex-1 my-auto flex flex-wrap\"><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Accelerometer</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Barometer</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Fingerprint Sensor</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Gyro Sensor</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Geomagnetic Sensor</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Hall Sensor</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Light Sensor</div></div><div class=\"my-auto mb-1\"><div class=\"px-2 py-1 bg-white border\">Proximity Sensor</div></div></div></div></div></div></div></div><div class=\"w-full px-1 bg-gray-100 mb-1 last:mb-0\"><div class=\"p-2 h-full\"><h3 class=\"font-medium text-xl\">Battery</h3><div><div class=\"mb-1 last:mb-0\"><div class=\"flex flex-wrap\"><div class=\"w-32 my-auto\">Battery Capacity (mAh) </div><div class=\"my-auto\"><div class=\"px-2 py-1 bg-white border\">5000</div></div></div></div></div></div></div></div>','This is Samsung S24 Ultra','5-64721761673113.png',1,4,15,'ERR3457','6156251',1,'yes','2025-10-28 11:53:33','2025-10-28 11:54:59'),(6,'NordBuds 3 TWS Pro',599,1000,'<div class=\"html-content pdp-product-highlights\"><article class=\"lzd-article\" data-spm-anchor-id=\"a2a0e.pdp_revamp.product_detail.i3.2e80309cVYiC76\"><ul><li><div><span>Enhanced Sound Experience : The buds comes with 12.4 mm Titanized Diaphragm Drivers to enjoy the layered music that is full of deep bass and pure clear treble. It has fixed spatial audio specifically for OnePlus smartphone users</span></div></li><li><div><span>49dB Active Noise Cancellation : With up to 49dB Active Noise Cancellation one can maximize the audio enjoyment of music, allowing an immersive listening experience virtually</span></div></li><li><div><span>BassWave️ 2.0 : Users can enjoy more powerful bass when they turn on this function due to its new BassWave algorithm which dynamically enhances the sound for a balanced listening experience with deeper bass and crisp, clear vocals</span></div></li><li><div><span>Crystal Clear Call : 3 built-in microphones on each earbud for accurately picking up vocals, enhancing noise cancelling and improved call anti-wind algorithms to filter out background noise. [Dual Connection &amp; Google Fast Pair]: The buds can simultaneously connect to two devices such as Android/iOS/Windows smartphone, tablets or computers allowing for quick and seamless device switching. Google Fast Pair simplifies the pairing process, saves time and enhance user convenience</span></div></li><li><div><span>Battery Life &amp; Fast Charging : It has 10mins of Fast Charging that gives 11 hours of Playback time with total music playback upto 44 hours with ANC Off [Bluetooth &amp; Latency]: New generation of Bluetooth 5.4 enables faster transmission of high-quality audio, providing a better audio experience. It also has 47ms latency for better gaming</span></div></li></ul></article></div><div class=\"html-content detail-content\"><article style=\"white-space:break-spaces\" class=\"lzd-article\"><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><span>OnePlus Nord Buds 3 Pro </span></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><span> Enhanced Sound Experience : The buds comes with 12.4 mm Titanized Diaphragm Drivers to enjoy the layered music that is full of deep bass and pure clear treble. It has fixed spatial audio specifically for OnePlus smartphone users</span></p><ul style=\"list-style-type:disc\"><li><div style=\"line-height:1.7;text-align:left;text-indent:0\"><span>49dB Active Noise Cancellation : With up to 49dB Active Noise Cancellation one can maximize the audio enjoyment of music, allowing an immersive listening experience virtually</span></div></li><li><div style=\"line-height:1.7;text-align:left;text-indent:0\"><span>BassWave️ 2.0 : Users can enjoy more powerful bass when they turn on this function due to its new BassWave algorithm which dynamically enhances the sound for a balanced listening experience with deeper bass and crisp, clear vocals</span></div></li><li><div style=\"line-height:1.7;text-align:left;text-indent:0\"><span>Crystal Clear Call : 3 built-in microphones on each earbud for accurately picking up vocals, enhancing noise cancelling and improved call anti-wind algorithms to filter out background noise. [Dual Connection &amp; Google Fast Pair]: The buds can simultaneously connect to two devices such as Android/iOS/Windows smartphone, tablets or computers allowing for quick and seamless device switching. Google Fast Pair simplifies the pairing process, saves time and enhance user convenience</span></div></li><li><div style=\"line-height:1.7;text-align:left;text-indent:0\"><span>Battery Life &amp; Fast Charging : It has 10mins of Fast Charging that gives 11 hours of Playback time with total music playback upto 44 hours with ANC Off [Bluetooth &amp; Latency]: New generation of Bluetooth 5.4 enables faster transmission of high-quality audio, providing a better audio experience. It also has 47ms latency for better gaming</span><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/bedc1d0ba042fdc0cf398377246cb883.jpg_2200x2200q80.jpg_.webp\"></div></li></ul><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/388c080614054403f4c592ca42b88a9e.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/bb8536ed1406924b2db49ae03830b4f2.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/666765673a0d1605fb5281ae6a841389.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/248ef23cdec2df6a991167e93717f7a7.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/9362b3f6c8437fb6d7a33593a570034c.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/b73f81633fb91ccd5d6a4ad458df26b6.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/a4766c49068e94dfd04b5bcd5f88f774.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/dc2699a64064fb05067cf1b395d42099.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><img style=\"width:1464px;height:600px;display:inline;vertical-align:middle\" src=\"https://img.drz.lazcdn.com/static/np/p/78a1d7bab2b539060bd6b40ec6f0eed7.jpg_2200x2200q80.jpg_.webp\"></p><p style=\"line-height:1.7;text-align:left;text-indent:0;margin-left:0;margin-top:0;margin-bottom:0\"><br></p></article></div><div class=\"pdp-mod-specification\"><h2 class=\"pdp-mod-section-title \">Specifications of OnePlus Nord Buds 3 Pro</h2><div class=\"pdp-general-features\"><ul class=\"specification-keys\"><li class=\"key-li\"><span class=\"key-title\"> Brand  </span><div class=\"key-value\">OnePlus</div></li><li class=\"key-li\"><span class=\"key-title\"> SKU  </span><div class=\"key-value\">151341919_NP-1107161897</div></li><li class=\"key-li\"><span class=\"key-title\"> Wireless Connectivity  </span><div class=\"key-value\">Bluetooth</div></li><li class=\"key-li\"><span class=\"key-title\"> Bluetooth  </span><div class=\"key-value\">Yes</div></li><li class=\"key-li\"><span class=\"key-title\"> Compatible Devices  </span><div class=\"key-value\">Not Specified</div></li><li class=\"key-li\"><span class=\"key-title\"> Headphone Features  </span><div class=\"key-value\">Noise Cancellation,Deep Bass,Built in Microphone,Water Resistant</div></li><li class=\"key-li\"><span class=\"key-title\"> Charging Time  </span><div class=\"key-value\">Not Specified</div></li><li class=\"key-li\"><span class=\"key-title\"> Connector_1  </span><div class=\"key-value\">Usb Type C</div></li><li class=\"key-li\"><span class=\"key-title\"> Electronics Features  </span><div class=\"key-value\">Dual device connection, Google Fast Pair, Find My Earbuds</div></li><li class=\"key-li\"><span class=\"key-title\"> Compatible Operating System  </span><div class=\"key-value\" data-spm-anchor-id=\"a2a0e.pdp_revamp.product_detail.i1.2e80309cVYiC76\">Android</div></li></ul></div></div>','This is NordBuds 3 TWS','6-75711761709544.jpg',3,5,20,'56755RR','12762127',1,'yes','2025-10-28 22:00:44','2025-10-28 22:00:44'),(7,'Samsung Galaxy Watch 6',4000,7000,'<div class=\"my-2 px-2\"><p><strong>Samsung Galaxy Watch 6</strong></p>\n\n<p><strong>Network/Bearer :-</strong> WiFi, Bluetooth<br>\n<strong>Audio and Video :-</strong> MP3, M4A, 3GA, AAC, OGG, OGA, WAV, AMR, AWB<br>\n<strong>Location Technology :-</strong> GPS, Glonass, Beidou, Galileo<br>\n<strong>OS :-</strong> Wear OS<br>\n<strong>Display :-</strong>&nbsp;(Watch 6 Classic)1.5\" Super AMOLED(480x480) | (Watch 6)1.3\" Super AMOLED(432x432)<br>\n<strong>Processor :-</strong> 1.4GHz Dual-Core<br>\n<strong>Storage :-</strong> 2GB RAM, 16GB Storage<br>\n<strong>Sensors :-</strong> Accelerometer, Barometer, Bioelectrical \nImpedance Analysis Sensor, Electrical Heart Sensor, Gyro Sensor, \nGeomagnetic Sensor, Infrared Temperature Sensor, Light Sensor, Optical \nHeart Rate Sensor,&nbsp;Hall Sensor (Available only in Watch 6 Classic)<br>\n<strong>Battery :-</strong>&nbsp;300mAh</p></div>','This is Samsung Galaxy Watch 6','7-49741761709772.jpg',5,4,20,'12TTFFF','121262771',1,'yes','2025-10-28 22:04:32','2025-10-28 22:04:32'),(8,'One Plus 12 Pro',20000,35000,'<h2 class=\"ai-optimize-7\"><strong>OnePlus 12 Pro Overview:</strong></h2>\n<h3 class=\"ai-optimize-8\"><strong>Cameras</strong></h3>\n<p class=\"ai-optimize-9\">As expected, the OnePlus 12 gets a 64MP 1/2.0″ \nperiscope camera with 3x optical zoom and OIS. This is a notable \nimprovement over the OnePlus 11, which only featured a traditional \ntelephoto camera with 2x optical zoom.</p>\n<p class=\"ai-optimize-10\">The primary highlight here is the Sony LYT-808 sensor with a 50MP resolution and OIS, just like on the <a href=\"https://www.gadgetbytenepal.com/onepluss-open-price-nepal/\" target=\"_blank\" rel=\"noopener\">OnePlus Open</a>.\n This Sony sensor features a dual-layer transistor technology that helps\n capture double the amount of light compared to conventional image \nsensors. Based on our testing of the OnePlus Open, we can expect the \nprimary camera of the OnePlus 12 to be of top-notch quality.</p>\n<p><img fetchpriority=\"high\" decoding=\"async\" class=\"alignnone size-full wp-image-170643\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/11/OnePlus-12-Camera.jpg\" alt=\"OnePlus 12 Camera\" width=\"900\" height=\"600\"></p>\n<p class=\"ai-optimize-11\">For the ultrawide camera, there is a 48MP Sony\n IMX581 unit with Autofocus. On top of that, you get Hasselblad image \nprocessing and filters. While the selfie duties are handled by a 32MP \nsnapper with 4K video recording capability.</p>\n<ul>\n<li class=\"ai-optimize-12\"><strong>Also Read</strong>:</li>\n<li class=\"ai-optimize-13\"><a title=\"OnePlus Nord 3 Launched in Nepal; Starts from Rs. 69,999\" href=\"https://www.gadgetbytenepal.com/oneplus-nord-3-price-nepal/?swcfpc=1\" target=\"_blank\" rel=\"bookmark noopener\">OnePlus Nord 3 launched in Nepal. Starts from Rs. 69,999</a></li>\n<li class=\"ai-optimize-14\"><a href=\"https://www.gadgetbytenepal.com/oneplus-pad-go-price-nepal/\" target=\"_blank\" rel=\"noopener\">OnePlus Pad Go launched with Helio G99 SoC and 7:9 screen</a></li>\n<li class=\"ai-optimize-15\"><a href=\"https://www.gadgetbytenepal.com/oneplus-pad-long-term-review/\" target=\"_blank\" rel=\"noopener\">OnePlus Pad Long-Term Review: Is This Really An iPad Killer?</a></li>\n</ul>\n<h3 class=\"ai-optimize-16\"><strong>Design and Display</strong></h3>\n<p class=\"ai-optimize-17\">Design-wise, the OnePlus 12 features a \nsandstone finish rear panel and a familiar camera island like the \nOnePlus 11. You get a metal frame with a glass sandwich build. In terms \nof ingress protection, there is an IP65 rating against dust and water \nresistance. On the front side, the flagship OnePlus phone greets you \nwith a hole-punch cutout at the top center, a departure from the top \nleft corner placement in the OnePlus 11.</p>\n<p><img decoding=\"async\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/11/OnePlus-12-Design-and-Display.jpg\" alt=\"OnePlus 12 Design and Display\" width=\"900\" height=\"600\"></p>\n<p class=\"ai-optimize-18\">This panel is <a href=\"https://en.wikipedia.org/wiki/BOE_Technology\" target=\"_blank\" rel=\"noopener\">BOE</a>‘s\n latest LTPO OLED display with a 2K resolution, a 6.82-inch diagonal \nsize, and Gorilla Glass Victus 2 protection. It boasts a peak brightness\n of up to 4,500 nits, a 120Hz refresh rate, 100% DCI-P3 color gamut \nsupport, Dolby Vision, and 2160Hz PWM dimming.</p>\n<ul>\n<li class=\"ai-optimize-19\"><em>Meanwhile, check out all the prices and specs of OnePlus products <a href=\"https://www.gadgetbytenepal.com/cat/mobiles/oneplus/\" target=\"_blank\" rel=\"noopener\">here</a></em></li>\n</ul>\n<h3 class=\"ai-optimize-20\"><strong>Snapdragon 8 Gen 3</strong></h3>\n<p class=\"ai-optimize-21\">The flagship phones from OnePlus always debut \nwith the latest Snapdragon chipsets. And the OnePlus 12 continues the \nculture with the latest and greatest <a href=\"https://www.gadgetbytenepal.com/snapdragon-8-gen-3/\" target=\"_blank\" rel=\"noopener\">Snapdragon 8 Gen 3</a> chipset. This Qualcomm chip includes one prime <a href=\"https://www.gadgetbytenepal.com/arms-latest-microprocessor-introducing-arms-cortex-x4/\" target=\"_blank\" rel=\"noopener\">Cortex-X4 CPU</a> core at up to 3.3 GHz, paired with five performance and two efficiency cores.</p>\n<p><img decoding=\"async\" class=\"aligncenter size-full wp-image-170650\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/11/OnePlus-12-Snapdragon-8-Gen-3.jpg\" alt=\"OnePlus 12 Snapdragon 8 Gen 3\" width=\"900\" height=\"600\"></p>\n<p class=\"ai-optimize-22\">OnePlus has paired this SoC with up to 24GB of\n DDR5 and 1TB of UFS 4.0 storage for the OnePlus 12. To keep the \nthermals in check, there is a 9400mm2 Vapor Chamber (VC) cooling. And \nbooting this flagship phone is OyxgenOS 14 built on top of <a href=\"https://www.gadgetbytenepal.com/android-14-features/\" target=\"_blank\" rel=\"noopener\">Android 14</a>.</p>\n<h3 class=\"ai-optimize-23\"><strong>Battery, Connectivity, and Others</strong></h3>\n<p class=\"ai-optimize-24\">Moving on, the flagship phone is juiced by a \n5,400mAh battery and sticks with 100W of fast charging as well as 50W \nwireless charging.</p>\n<figure id=\"attachment_170656\" aria-describedby=\"caption-attachment-170656\" style=\"width: 900px\" class=\"wp-caption alignnone\"><img decoding=\"async\" class=\"wp-image-170656 size-full\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/12/OnePlus-12-N54-Bionic-Vibration-Motor.jpg\" alt=\"OnePlus 12 N54 Bionic Vibration Motor\" width=\"900\" height=\"600\"><figcaption id=\"caption-attachment-170656\" class=\"wp-caption-text\">N54 Bionic Vibration Motor</figcaption></figure>\n<p class=\"ai-optimize-25\">For the connectivity side, you get WiFi 7, \nBluetooth 5.4 BLE, GPS, NFC, and a USB-C 3.2 Gen 1 port on the OnePlus \n12. Other features include a Bionic vibration motor based on the new N54\n magnetic material.</p>\n<h2 class=\"ai-optimize-26\"><strong>OnePlus 12 Specifications:</strong></h2>\n<ul>\n<li class=\"ai-optimize-27\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Display:</strong><span style=\"font-weight: 400;\"> 6.82-inch AMOLED, LTPO 3.0, 120Hz, Dolby Vision, 2160Hz PWM dimming</span></li>\n<li class=\"ai-optimize-28\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Resolution: </strong><span style=\"font-weight: 400;\">QHD+ 2K (3168 x 1440 pixels)</span></li>\n<li class=\"ai-optimize-29\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>SoC:</strong><span style=\"font-weight: 400;\"> Snapdragon 8 Gen 3 (4nm)</span></li>\n<li class=\"ai-optimize-30\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>OS:</strong><span style=\"font-weight: 400;\"> OxygenOS 14 based on Android 14</span></li>\n<li class=\"ai-optimize-31\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Memory:</strong><span style=\"font-weight: 400;\"> Up to 24GB LPDDR5X RAM, 1TB UFS 4.0 storage</span></li>\n<li class=\"ai-optimize-32\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Rear Camera:</strong><span style=\"font-weight: 400;\"> Triple</span>\n<ul>\n<li class=\"ai-optimize-33\" style=\"font-weight: 400;\" aria-level=\"1\"><span style=\"font-weight: 400;\">50MP Sony LYT-808 primary, ƒ/1.6, OIS, PDAF</span></li>\n<li class=\"ai-optimize-34\" style=\"font-weight: 400;\" aria-level=\"1\"><span style=\"font-weight: 400;\">48MP ultrawide, ƒ/2.2, AF</span></li>\n<li class=\"ai-optimize-35\" style=\"font-weight: 400;\" aria-level=\"1\"><span style=\"font-weight: 400;\">64MP Telephoto, 3x Optical zoom, 120x Digital zoom, ƒ/2.6, OIS, AF</span></li>\n</ul>\n</li>\n<li class=\"ai-optimize-36\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Selfie: </strong><span style=\"font-weight: 400;\">32MP, ƒ/2.4</span></li>\n<li class=\"ai-optimize-37\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Battery:</strong><span style=\"font-weight: 400;\"> 5400mAh</span></li>\n<li class=\"ai-optimize-38\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Charging:</strong><span style=\"font-weight: 400;\"> 100W wired, 50W wireless</span></li>\n<li class=\"ai-optimize-39\" style=\"font-weight: 400;\" aria-level=\"1\"><strong>Biometric:</strong> Fingerprint (in-display)</li></ul>','This is One Plus 12 Pro','8-16811761710925.webp',1,5,20,'ER45566T','12561562',1,'yes','2025-10-28 22:23:45','2025-10-28 22:23:45'),(9,'Apple Watch Ultra 2',15000,20000,'<h2><strong>Apple Watch Ultra 2 Overview:</strong></h2>\n<h3><strong>Design and Durability</strong></h3>\n<p>Apple Watch Ultra 2 is a big smartwatch with a titanium casing that \nweighs 61.4 grams. Its display is protected by sapphire crystal, while \nthe back is a mixture of sapphire crystal and ceramic material.</p>\n<p>On one side, you’ll find a GPS antenna for precise location tracking,\n dual speakers that enhance call and Siri audio, a siren emitting up to \n86dB sound to attract help, and an Action button. This thing lets you \ncustomize functions like marking waypoints, starting workouts, and even \nactivating the siren with a press and hold.</p>\n<p>On the opposite side, there’s the side button, a depth gauge to \nmeasure underwater depth and temperature a three-microphone array to \noptimize voice clarity, and a digital crown for navigation.</p>\n\n                \n\n                <div id=\"tdi_3\" class=\"td-gallery td-slide-on-2-columns\">\n                    <div class=\"post_td_gallery\">\n                        <div class=\"td-gallery-slide-top\">\n                           <div class=\"td-gallery-title\">Apple Watch Ultra 2</div>\n\n                            <div class=\"td-gallery-controls-wrapper\">\n                                <div class=\"td-gallery-slide-count\"><span class=\"td-gallery-slide-item-focus\">1</span> of 2</div>\n                                <div class=\"td-gallery-slide-prev-next-but\">\n                                    <br></div></div></div></div></div>\n                                    <div id=\"tdi_3\" class=\"td-gallery td-slide-on-2-columns\"><div class=\"post_td_gallery\"><div class=\"td-doubleSlider-1 \" style=\"position: relative; top: 0px; left: 0px; overflow: hidden; z-index: 1; perspective: 1000px; backface-visibility: hidden; width: 735.6px; height: 420px;\">\n                            <div class=\"td-slider\" style=\"position: relative; cursor: move; perspective: 0px; backface-visibility: hidden; width: 1471.2px; left: -1471px;\">\n                                \n                    <div class=\"td-slide-item td-item1\" style=\"width: 735.6px; overflow: hidden; position: absolute; left: 1471px; backface-visibility: hidden;\">\n                        <figure class=\"td-slide-galery-figure td-slide-popup-gallery\">\n                            <a class=\"slide-gallery-image-link\" href=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/07/Apple-Watch-Ultra-2-SideOne.jpg\" title=\"Apple Watch Ultra 2 SideOne\" data-caption=\"\" data-description=\"\">\n                                <img decoding=\"async\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/07/Apple-Watch-Ultra-2-SideOne.jpg\" alt=\"Apple Watch Ultra 2 SideOne\">\n                            </a>\n                            \n                        </figure>\n                    </div>\n                    <div class=\"td-slide-item td-item2\" style=\"width: 735.6px; overflow: hidden; position: absolute; left: 2206px; backface-visibility: hidden;\">\n                        <figure class=\"td-slide-galery-figure td-slide-popup-gallery\">\n                            <a class=\"slide-gallery-image-link\" href=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/07/Apple-Watch-Ultra-2-SideTwo.jpg\" title=\"Apple Watch Ultra 2 SideTwo\" data-caption=\"\" data-description=\"\">\n                                <img decoding=\"async\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/07/Apple-Watch-Ultra-2-SideTwo.jpg\" alt=\"Apple Watch Ultra 2 SideTwo\">\n                            </a>\n                            \n                        </figure>\n                    </div>\n                            </div>\n                        </div>\n\n                        <div class=\"td-doubleSlider-2 td_center_slide2\">\n                            <div class=\"td-slider\">\n                                \n                    <div class=\"td-button td-item1\" style=\"border: 0px;\">\n                        <div class=\"td-border\" style=\"border: 3px solid rgb(255, 255, 255); opacity: 1;\"><br></div>\n                    <br></div>\n                    <div class=\"td-button td-item2\" style=\"border: 0px;\">\n                        <div class=\"td-border\" style=\"border: 3px solid rgb(255, 255, 255); opacity: 0.5;\"><br></div>\n                    <br></div>\n                            <br></div>\n                        <br></div>\n\n                    </div>\n\n                </div>\n                \n<p>In terms of endurance, the Apple Watch Ultra 2 offers an <a href=\"https://en.wikipedia.org/wiki/IP_code\" target=\"_blank\" rel=\"noopener\">IP6X</a>\n dust resistance. Moreover, it excels in water-related environments with\n 100m water resistance (WR100), and even for diving enthusiasts, it is \nrated up to 40 meters for swimming and diving according to EN13319 \nstandards.</p>\n<p>There are also band choices for the Apple Watch Ultra 2, including \nthe Alpine Loop (available in Blue, Indigo, and Olive), Trail Loop \n(offered in Orange/Beige, Green/Gray, Blue/Black), and Ocean Band (in \nBlue and Orange). Supposedly, when paired with a new Trail Loop or \nAlpine Loop band, the watch becomes carbon neutral.</p>\n<ul>\n<li><em>Meanwhile, check out all the prices and specs of <a href=\"https://www.gadgetbytenepal.com/cat/smartwatches/apple-smartwatches/\" target=\"_blank\" rel=\"noopener\">Apple smartwatches</a></em></li>\n</ul>\n<h3><strong>Display</strong></h3>\n<p>As for the display, there is a flat 49mm (1.92-inch) always-on Retina\n OLED screen protected by sapphire crystal, offering ~338 ppi density. \nApple has also upgraded to 3,000 nits of peak brightness this time, so I\n wouldn’t be worried about outdoor visibility at all on the Watch Ultra \n2. Except for the brightness, all other display specs are pretty much \nthe same as the first-gen <a href=\"https://www.gadgetbytenepal.com/apple-watch-ultra-price-nepal/\" target=\"_blank\" rel=\"noopener\">Apple Watch Ultra</a>.</p>\n<ul>\n<li><strong>Also Read:</strong>\n<ul>\n<li><a href=\"https://www.gadgetbytenepal.com/iphone-17-series-rumors-2/\" target=\"_blank\" rel=\"noopener\">iPhone 17 to feature Samsung’s M14 OLED Panels</a></li>\n<li><a href=\"https://www.gadgetbytenepal.com/apple-iphone-price-nepal/\" target=\"_blank\" rel=\"noopener\">Apple iPhone Price in Nepal 2025 [Updated], Price Hiked!</a></li>\n<li><a href=\"https://www.gadgetbytenepal.com/iphone-se-4-rumors/\" target=\"_blank\" rel=\"noopener\">iPhone SE 4 (2024) will come as early as next week</a></li>\n</ul>\n</li>\n</ul>\n<h3><strong>Performance and Memory</strong></h3>\n<p>Like the Watch Series 9, this guy features an upgraded S9 chip too, \nwhose GPU is 30% faster than the Apple S8. It also has a new four-core \nneural processing unit (NPU) for on-device Siri data processing, \neliminating the need for constant WiFi or cellular network connectivity.\n Apple also claims the new chip allows for 25% better dictation for Siri\n than the previous model.</p>\n<p><img fetchpriority=\"high\" decoding=\"async\" class=\"alignnone wp-image-163686 size-full\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/07/Apple-Watch-Ultra-2-processor.jpg\" alt=\"Apple S9 SiP\" width=\"900\" height=\"600\"></p>\n<p>The S9 SiP includes an upgraded second-generation ultra-wideband \nchip, similar to the U1 chip, enabling precise location detection of \nnearby devices also equipped with this technology. This new dual-core \nCPU has 5.6 billion transistors — 60% more than the S8 chip.</p>\n<p>Watch Ultra 2 is also one of the first Apple smartwatches to offer 64GB of storage. Likewise, <a href=\"https://www.apple.com/watchos/watchos-preview/\" target=\"_blank\" rel=\"noopener nofollow\">WatchOS 10</a>\n is the biggest highlight of this guy. But of course, WatchOS 10 will be\n available for older Apple smartwatches too, including Watch Series 9 \nand newer.</p>\n<h3><strong style=\"color: #111111; font-family: Roboto, sans-serif; font-size: 22px;\" data-darkreader-inline-color=\"\">Battery</strong></h3>\n<p>With all these changes, if you’re expecting enhanced battery life, \nyou will likely be let down. Apple is still promising the same old 36 \nhours of endurance under regular usage. However, the “Low Power Mode” \nsees an increase of 12 hours, going from 60 to 72 hours. It does feature\n fast charging for the watch, but the complete information about it is \nyet to be disclosed.</p>\n<h3><strong>Intuitive Double Tap gesture</strong></h3>\n<p>With the introduction in Ultra 2 and the simultaneous release in \nWatch Series 9, there’s a new gesture: the double tap. By simply tapping\n your thumb and index finger together, you can perform various actions \nlike answering or ending a call, setting a timer, controlling media \nplayback, silencing alarms, and even snapping photos or recording \nvideos.</p>\n<p><img decoding=\"async\" class=\"alignnone size-full wp-image-163687\" src=\"https://cdn.gadgetbytenepal.com/wp-content/uploads/2023/07/Apple-Watch-Ultra-2-processor-.jpg\" alt=\"Apple Watch Ultra 2 processor \" width=\"900\" height=\"400\"></p>\n<p>The gesture relies on data from the gyroscope, accelerometer, and \nheart rate sensor, all finely tuned by machine learning to prevent \naccidental activation. It sounds pretty intuitive to me!</p>\n<h3><strong>Rest of the features</strong></h3>\n<p>Other than this, the Apple Watch Ultra 2 can track everything from \nyour heart rate, blood oxygen (SpO2), stress, ECG levels, skin \ntemperatures, and more. The updated Workout app on WatchOS 10 lets you \ntrain for different kinds of workouts. There’s even a workout feature \nthat can intelligently switch between swimming, biking, and running on \nits own.</p>\n<h2><strong>Apple Watch Ultra 2 Specifications:</strong></h2>\n<ul>\n<li aria-level=\"1\"><strong>Dimensions (H x W x L):</strong>&nbsp;49 x 44 x 14.4mm</li>\n<li><strong>Weight:</strong> 61.4 grams</li>\n<li><strong>Display:</strong> 1.92-inch Always-on Retina LTPO OLED, Up to 3,000 nits brightness, Sapphire crystal glass, 502 x 410 pixels</li>\n<li aria-level=\"1\"><strong>Design:</strong> Titanium case, Digital crown with haptic feedback, Action button</li>\n<li aria-level=\"1\"><strong>Water Resistance</strong>&nbsp;<strong>Level:</strong> WR100 (Up to 100 meters), EN 13319</li>\n<li aria-level=\"1\"><strong>Durability:</strong> IP6X dust-resistant</li>\n<li aria-level=\"1\"><strong>Sensors:</strong> Accelerometer, gyro, heart \nrate, barometer, always-on altimeter (-500m to 9000m), compass, SpO2, \nVO2max, temperature (body), temperature (water)</li>\n<li aria-level=\"1\"><strong>Processor:</strong> Apple S9 chip (dual-core)</li>\n<li aria-level=\"1\"><strong>Storage:</strong> 64GB (GPS + Cellular)</li>\n<li aria-level=\"1\"><strong>Connectivity:</strong>&nbsp;Bluetooth 5.3, Dual-band WiFi (2.4/5GHz)</li>\n<li aria-level=\"1\"><strong>Navigation:</strong> Built-in GPS (L1+L5), Glonass, Galileo, QZSS, BeiDou</li>\n<li aria-level=\"1\"><strong>Audio:</strong> Dual speakers, 3 microphones</li>\n<li aria-level=\"1\"><strong>Battery:</strong> Up to 36 hours in low-power mode (or 18 hours- regular usage)</li>\n<li aria-level=\"1\"><strong>Charging:</strong>&nbsp;USB-C magnetic charging cable</li>\n<li><br></li></ul>','This is Apple Watch Ultra 2','9-77761761712250.jpg',5,2,20,'1200TT','652172223',1,'yes','2025-10-28 22:45:50','2025-10-28 22:46:56');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('ipoRdBjig6IVBc7GohEPLnv5rDq4DGX0fzmATcx8',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiVDVTUHEwWU1kWFdTY3NOcElRSUFoVTd5Q0NWRGJhbHp5QVRDWHNHcSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1761638166);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_charges`
--

DROP TABLE IF EXISTS `shipping_charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_charges` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `shipping_charge` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_charges`
--

LOCK TABLES `shipping_charges` WRITE;
/*!40000 ALTER TABLE `shipping_charges` DISABLE KEYS */;
INSERT INTO `shipping_charges` VALUES (1,100,NULL,NULL);
/*!40000 ALTER TABLE `shipping_charges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temp_images`
--

DROP TABLE IF EXISTS `temp_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_images`
--

LOCK TABLES `temp_images` WRITE;
/*!40000 ALTER TABLE `temp_images` DISABLE KEYS */;
INSERT INTO `temp_images` VALUES (1,'1761650200.jpg','2025-10-28 05:31:40','2025-10-28 05:31:40'),(2,'1761650203.jpg','2025-10-28 05:31:43','2025-10-28 05:31:43'),(3,'1761657260.jpg','2025-10-28 07:29:20','2025-10-28 07:29:20'),(4,'1761657271.jpg','2025-10-28 07:29:31','2025-10-28 07:29:31'),(5,'1761657474.jpg','2025-10-28 07:32:54','2025-10-28 07:32:54'),(6,'1761657479.jpg','2025-10-28 07:32:59','2025-10-28 07:32:59'),(7,'1761667178.jpg','2025-10-28 10:14:38','2025-10-28 10:14:38'),(8,'1761667183.jpg','2025-10-28 10:14:43','2025-10-28 10:14:43'),(9,'1761672118.jpg','2025-10-28 11:36:58','2025-10-28 11:36:58'),(10,'1761672303.jpg','2025-10-28 11:40:03','2025-10-28 11:40:03'),(11,'1761672551.webp','2025-10-28 11:44:11','2025-10-28 11:44:11'),(12,'1761672564.webp','2025-10-28 11:44:24','2025-10-28 11:44:24'),(13,'1761672570.webp','2025-10-28 11:44:30','2025-10-28 11:44:30'),(14,'1761672576.jpg','2025-10-28 11:44:36','2025-10-28 11:44:36'),(15,'1761672925.png','2025-10-28 11:50:25','2025-10-28 11:50:25'),(16,'1761672936.webp','2025-10-28 11:50:36','2025-10-28 11:50:36'),(17,'1761672944.jpg','2025-10-28 11:50:44','2025-10-28 11:50:44'),(18,'1761709302.jpg','2025-10-28 21:56:42','2025-10-28 21:56:42'),(19,'1761709307.jpg','2025-10-28 21:56:47','2025-10-28 21:56:47'),(20,'1761709311.jpg','2025-10-28 21:56:51','2025-10-28 21:56:51'),(21,'1761709349.jpg','2025-10-28 21:57:29','2025-10-28 21:57:29'),(22,'1761709353.jpg','2025-10-28 21:57:33','2025-10-28 21:57:33'),(23,'1761709357.jpg','2025-10-28 21:57:37','2025-10-28 21:57:37'),(24,'1761709660.jpg','2025-10-28 22:02:40','2025-10-28 22:02:40'),(25,'1761709665.jpg','2025-10-28 22:02:45','2025-10-28 22:02:45'),(26,'1761709671.jpg','2025-10-28 22:02:51','2025-10-28 22:02:51'),(27,'1761710780.webp','2025-10-28 22:21:20','2025-10-28 22:21:20'),(28,'1761710785.jpg','2025-10-28 22:21:25','2025-10-28 22:21:25'),(29,'1761710789.webp','2025-10-28 22:21:29','2025-10-28 22:21:29'),(30,'1761712113.jpg','2025-10-28 22:43:33','2025-10-28 22:43:33'),(31,'1761712124.jpg','2025-10-28 22:43:44','2025-10-28 22:43:44'),(32,'1761712127.jpg','2025-10-28 22:43:47','2025-10-28 22:43:47');
/*!40000 ALTER TABLE `temp_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('customer','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'admin','admin@example.com',NULL,NULL,NULL,NULL,NULL,NULL,'admin','2025-10-28 02:21:50','$2y$12$YsEWNH3/0aFfgnI.vfQLmOwAc/4W1r4weDc0PhCTBkcb.xNW3WcTa','vPGLm9H0zr','2025-10-28 02:21:51','2025-10-28 11:33:33'),(5,'Ram','ram@gmail.com','Illam, Chiyabari-3','980000000','Chiyabari',NULL,'57300','Koshi Province','customer',NULL,'$2y$12$s3JnfbEdJF9yT1O4HnG41OsjC8k2r5ouDP1ApgaFvRPsfLm9hNarC',NULL,'2025-10-28 06:46:52','2025-10-28 12:19:44'),(8,'Rogan Velasquez','xofygi@mailinator.com',NULL,NULL,NULL,NULL,NULL,NULL,'customer',NULL,'$2y$12$LXKtDG2imxlsEqir.9MlzeJx.4sjYIepRDXSTE6dk6DxDBOQgKlmG',NULL,'2025-10-28 07:15:15','2025-10-28 07:23:36'),(9,'hari','hari@gmail.com','Road Gunj, Nepalgunj','9856245242','Nepalgunj',NULL,'578889','Pashim Province','customer',NULL,'$2y$12$KQnE0EEPmQorD426ZWg7IumvY9fIGt112v873HeBY97tdnUCMcRrW',NULL,'2025-10-28 12:08:01','2025-10-28 12:09:19');
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

-- Dump completed on 2025-10-29 10:23:24
