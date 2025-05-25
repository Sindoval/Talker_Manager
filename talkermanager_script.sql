SET
  NAMES utf8mb4;

USE talkermanagerdb;

DROP TABLE IF EXISTS talkers;

CREATE TABLE
  talkers (
    name VARCHAR(512),
    age INT,
    id INT AUTO_INCREMENT PRIMARY KEY,
    talk_watched_at VARCHAR(512),
    talk_rate INT
  );

INSERT INTO
  talkers (name, age, talk_watched_at, talk_rate)
VALUES
  ('Henrique Albuquerque', 62, '22/10/2020', 5),
  ('Heloísa Albuquerque', 67, '22/10/2020', 4),
  ('Ricardo Xavier Filho', 33, '22/10/2020', 3),
  ('Marcos Costa', 24, '30/10/2020', 5),
  ('Henrique dos Santos', 44, '29/10/2020', 5);