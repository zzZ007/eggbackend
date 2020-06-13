
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for g_user
-- ----------------------------
DROP TABLE IF EXISTS `g_user`;
CREATE TABLE `g_user` (
  `id` varchar(64) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `gender` int(1) unsigned DEFAULT '1',
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role_id` int(1) unsigned DEFAULT '1',
  `status` int(1) unsigned DEFAULT '1',
  `avatar` varchar(2000) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `pk_at` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of g_user
-- ----------------------------
BEGIN;
INSERT INTO `g_user` VALUES ('asdfafdsff1aefafe', 'admin', '管理员', 1, 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, 1, 1, NULL, '192.168.28.26', '2020-06-13 01:27:36', '2020-06-13 11:33:34');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
