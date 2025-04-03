-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255),
  auth_token TEXT,
  full_name VARCHAR(100),
  industry VARCHAR(100),
  bio TEXT,
  theme_preference VARCHAR(50) DEFAULT 'light',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  onboarding_completed_at TIMESTAMP NULL,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- Create social_links table for one-to-many relationship
CREATE TABLE IF NOT EXISTS social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(255) NOT NULL,
  button_text VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);