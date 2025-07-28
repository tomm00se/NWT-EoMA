-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: recipe_app_group_a
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (9,'Breakfast'),(6,'Dessert'),(1,'Main'),(2,'Vegan'),(4,'Vegetarian');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`recipe_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `ingredient_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Couscous'),(2,'Preserved lemons (chopped)'),(3,'Dried cranberries'),(4,'Pine nuts (toasted)'),(5,'Pistachio nuts (chopped)'),(6,'Olive oil'),(7,'Flatleaf parsley (chopped)'),(8,'Garlic cloves (crushed)'),(9,'Red wine vinegar'),(10,'Red onion (finely chopped)'),(11,'Salt'),(12,'Rocket leaves'),(13,'Vegetable oil'),(14,'Onions (finely sliced)'),(15,'Greek or natural yoghurt'),(16,'Ginger (finely grated)'),(17,'Garlic (finely grated)'),(18,'Kashmiri red chilli powder'),(19,'Ground cumin'),(20,'Ground cardamom seeds'),(21,'Sea salt'),(22,'Lime (juice only)'),(23,'Coriander leaves/stalks (chopped)'),(24,'Mint leaves (chopped)'),(25,'Green chillies (chopped)'),(26,'Boneless lamb'),(27,'Double cream'),(28,'Full-fat milk'),(29,'Saffron strands'),(30,'Basmati rice'),(31,'Pomegranate seeds (optional garnish)'),(32,'Self-raising wholemeal flour'),(33,'Fine sea salt'),(34,'Full-fat plain yoghurt'),(35,'Yellow or orange pepper (sliced)'),(36,'Courgette (sliced)'),(37,'Red onion (wedges)'),(38,'Extra virgin olive oil'),(39,'Dried chilli flakes'),(40,'Mozzarella or cheddar or goat cheese'),(41,'Black pepper'),(42,'Fresh basil leaves (optional)'),(43,'Passata sauce'),(44,'Dried oregano'),(45,'Digestive biscuits'),(46,'Granulated sugar (base)'),(47,'Ground cardamom'),(48,'Unsalted butter (melted)'),(49,'Sea salt (base)'),(50,'Granulated sugar (filling)'),(51,'Powdered gelatine'),(52,'Double cream'),(53,'Cream cheese'),(54,'Alfonso mango pulp (tinned)'),(55,'Sea salt (filling)'),(56,'Chopped tomatoes (tinned)'),(57,'Rose harissa'),(58,'Caster sugar'),(59,'Lemon juice'),(60,'Onion (thinly sliced)'),(61,'White wine vinegar'),(62,'Flatleaf parsley (chopped)'),(63,'Plain yoghurt'),(64,'Dried mint'),(65,'Salt'),(66,'Black pepper'),(67,'Oyster mushrooms (thinly sliced)'),(68,'Garlic oil'),(69,'Sweet paprika'),(70,'Ground coriander'),(71,'Celery salt'),(72,'Garlic granules'),(73,'Pitta breads'),(74,'White cabbage (shredded)'),(75,'Tomatoes (sliced)'),(76,'Pickled chillies (optional)'),(77,'Plain flour'),(78,'Baking powder'),(79,'Caster sugar'),(80,'Salt'),(81,'Oat milk or other plant-based milk'),(82,'Vegetable oil (plus extra for frying)'),(83,'Vanilla extract');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rating_id`),
  KEY `user_id` (`user_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `ratings_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_categories`
--

DROP TABLE IF EXISTS `recipe_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_categories` (
  `recipe_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `recipe_categories_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `recipe_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_categories`
--

LOCK TABLES `recipe_categories` WRITE;
/*!40000 ALTER TABLE `recipe_categories` DISABLE KEYS */;
INSERT INTO `recipe_categories` VALUES (1,1),(2,1),(1,2);
/*!40000 ALTER TABLE `recipe_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  `quantity` decimal(5,2) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (1,1,225.00,'g'),(1,2,8.00,'small'),(1,3,180.00,'g'),(1,4,120.00,'g'),(1,5,160.00,'g'),(1,6,125.00,'ml'),(1,7,60.00,'g'),(1,8,4.00,'cloves'),(1,9,4.00,'tbsp'),(1,10,1.00,'medium'),(1,11,1.00,'tsp'),(1,12,80.00,'g'),(2,13,5.00,'tbsp'),(3,32,125.00,'g'),(4,45,280.00,'g'),(6,77,135.00,'g');
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipe_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `total_time` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int DEFAULT NULL,
  `servings` int DEFAULT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `fk_author` (`author_id`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Couscous Salad','A nutritious and satisfying vegan couscous salad packed with colour, flavour and texture, from dried cranberries, pistachios and pine nuts.',NULL,10,'2025-07-25 17:57:08',1,6),(2,'Easy Lamb Biryani','A real centrepiece dish that’s surprisingly easy to make. Garnish with pomegranate seeds for a special finish.',NULL,90,'2025-07-25 18:04:30',1,7),(3,'Healthy Pizza','No yeast required for this easy, healthy pizza topped with colourful vegetables—ready in 30 minutes. Great for feeding kids in a hurry!',NULL,30,'2025-07-25 18:10:37',1,2),(4,'Mango Pie','This mouthwatering mango dessert is an Indian take on a traditional Thanksgiving pie.',NULL,60,'2025-07-25 18:14:43',1,16),(5,'Mushroom Doner','A meat-free mushroom ‘doner’ kebab packed with two types of sauces, pickles and veg. A mighty delicious vegetarian dish.',NULL,30,'2025-07-25 18:22:41',1,4),(6,'Vegan Pancakes','Quick and simple vegan pancakes made from storecupboard ingredients. Delicious with your favourite toppings.',NULL,20,'2025-07-26 11:02:11',1,4);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `steps`
--

DROP TABLE IF EXISTS `steps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `steps` (
  `step_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `step_number` int NOT NULL,
  `instructions` text NOT NULL,
  `step_time` int DEFAULT NULL,
  PRIMARY KEY (`step_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `steps`
--

LOCK TABLES `steps` WRITE;
/*!40000 ALTER TABLE `steps` DISABLE KEYS */;
INSERT INTO `steps` VALUES (1,1,1,'In a large bowl mix all the ingredients together except the rocket, then taste and adjust the seasoning, adding more salt if necessary.',5),(2,1,2,'Toss in the rocket and serve immediately.',2),(3,2,1,'Fry onions until browned and crispy.',15),(4,2,2,'Make marinade with half the onions, yoghurt, spices, and herbs.',10),(5,2,3,'Add lamb to marinade and coat well.',0),(6,2,4,'Soak rice and cook with saffron milk.',20),(7,2,5,'Layer rice, lamb, and herbs in a pot. Bake or steam until cooked through.',45),(8,3,1,'Preheat oven and roast vegetables with oil and pepper for 15 minutes.',15),(9,3,2,'Make dough by mixing flour, salt, and yoghurt.',5),(10,3,3,'Prepare tomato sauce by mixing passata and oregano.',2),(11,3,4,'Roll out dough, spread sauce, add toppings and cheese.',5),(12,3,5,'Bake until golden and bubbling.',10),(13,4,1,'Crush biscuits and mix with sugar, cardamom, butter, and salt.',10),(14,4,2,'Press into pie tins and bake until golden.',15),(15,4,3,'Make mango custard with sugar, gelatine, cream, cheese, mango pulp, and salt.',20),(16,4,4,'Fill pie shells with custard and chill until set.',15),(17,5,1,'Make chilli sauce by simmering tomatoes, harissa, sugar, and lemon.',10),(18,5,2,'Pickle onion with vinegar and chopped parsley.',5),(19,5,3,'Prepare yoghurt sauce with mint, salt, and pepper.',5),(20,5,4,'Toss mushrooms with spices and roast until golden.',10),(21,5,5,'Warm pitta, fill with mushrooms, sauces, and garnish.',5),(22,6,1,'Mix the flour, baking powder, sugar, and salt in a bowl.',5),(23,6,2,'In another bowl, whisk the oat milk, oil, and vanilla extract.',2),(24,6,3,'Combine the wet and dry ingredients into a smooth batter.',3),(25,6,4,'Heat a little oil in a non-stick frying pan and pour in small ladles of batter.',2),(26,6,5,'Cook each pancake for 2-3 minutes on each side until golden.',6);
/*!40000 ALTER TABLE `steps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dietary_preference` enum('none','vegan','vegetarian','pescetarian','gluten_free') DEFAULT 'none',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'BBC Admin','admin@bbc.com','bbc123','none');
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

-- Dump completed on 2025-07-26 12:02:54
