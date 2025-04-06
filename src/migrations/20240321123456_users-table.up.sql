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

-- Create the profile_analytics table
-- Create the profile_analytics table for MySQL
CREATE TABLE profile_analytics (
  id CHAR(36) PRIMARY KEY,
  profile_username VARCHAR(255) NOT NULL,
  visitor_id VARCHAR(255),
  session_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  link_data JSON,
  referrer TEXT,
  user_agent TEXT,
  country VARCHAR(100),
  city VARCHAR(100),
  device VARCHAR(50),
  browser VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Add an index on profile_username for faster queries
  CONSTRAINT fk_profile_username FOREIGN KEY (profile_username) 
    REFERENCES users(username) ON DELETE CASCADE
);

-- Create indexes for common queries
CREATE INDEX idx_profile_analytics_username ON profile_analytics(profile_username);
CREATE INDEX idx_profile_analytics_created_at ON profile_analytics(created_at);
CREATE INDEX idx_profile_analytics_event_type ON profile_analytics(event_type);