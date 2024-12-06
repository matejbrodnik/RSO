DROP TABLE IF EXISTS Users

CREATE TABLE Users (
   id INT PRIMARY KEY IDENTITY(1,1),
   username NVARCHAR(50) NOT NULL,
   password NVARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Locations

CREATE TABLE Locations (
    id INT PRIMARY KEY IDENTITY(1,1),
    uid INT,
    lat FLOAT,
    lng FLOAT,
	CONSTRAINT uid FOREIGN KEY (id) REFERENCES Users(id)
);
