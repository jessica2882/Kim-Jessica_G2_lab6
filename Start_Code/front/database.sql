-- Clean up if tables already exist
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS journalist;
DROP TABLE IF EXISTS category;

-- 1. Create Journalist table
CREATE TABLE journalist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT
);

-- 2. Create Category table (for article categories or tags)
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- 3. Create Article table with foreign keys to journalist and category
CREATE TABLE article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category INT, -- foreign key to category table
  journalist_id INT, -- foreign key to journalist table
  FOREIGN KEY (category) REFERENCES category(id) ON DELETE SET NULL,
  FOREIGN KEY (journalist_id) REFERENCES journalist(id) ON DELETE SET NULL
);

-- 4. Insert example journalists
INSERT INTO journalist (name, email, bio) VALUES
('Alice Tan', 'alice@example.com', 'Tech journalist based in Singapore.'),
('Ronan Lee', 'ronan@example.com', 'Writes about AI and emerging tech.'),
('Sophea Chan', 'sophea@example.com', 'Covers environmental issues in Cambodia.');

-- 5. Insert example categories (these are your tags)
INSERT INTO category (name) VALUES
('Environment'),
('Technology'),
('Future'),
('AI'),
('Tech');

-- 6. Insert example articles
INSERT INTO article (title, content, category, journalist_id) VALUES
('Tech Advances', 'Content about technology...', 2, 2),
('Green Future', 'Sustainability efforts in Southeast Asia...', 1, 3),
('AI Revolution', 'AI is changing the world rapidly...', 4, 2),
('Future Cities', 'Cities of tomorrow are being planned today...', 3, 1),
('Khmer Post', 'hello my name is Pov Yanghai from KPC. I am lazy but want money.', 5, 3);
