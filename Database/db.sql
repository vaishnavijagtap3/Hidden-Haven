-- 1. INSERT USERS
-- Timeline: Users registered between Jan 2023 and Nov 2023
-- Password is stored as PLAIN TEXT: "password"

INSERT INTO users (created_on, updated_on, name, email, password, phone, role) VALUES 
('2023-01-15 10:00:00', '2023-01-15 10:00:00', 'Admin User', 'admin@test.com', 'password', '9876543210', 'ADMIN'),
('2023-03-22 14:30:00', '2023-03-25 09:15:00', 'John Doe', 'john@test.com', 'password', '9123456789', 'VIEWER'),
('2023-06-10 11:45:00', '2023-06-10 11:45:00', 'Sarah Smith', 'sarah@test.com', 'password', '9988776655', 'VIEWER'),
('2023-11-05 16:20:00', '2024-01-02 10:00:00', 'Mike Traveller', 'mike@test.com', 'password', '8877665544', 'VIEWER');

-- 2. INSERT LOCATIONS
-- Timeline: Locations added between Feb 2023 and Jan 2024
INSERT INTO locations (created_on, updated_on, title, description, category, address, city, state, latitude, longitude, image_url) VALUES
('2023-02-01 09:00:00', '2023-02-01 09:00:00', 'The Secret Blue Lagoon', 'A hidden gem with crystal clear turquoise waters perfect for snorkeling. Located away from the main tourist hubs.', 'BEACH', 'North Coast Road, Hidden Cove', 'Port Blair', 'Andaman', 11.6234, 92.7265, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('2023-04-10 11:20:00', '2023-05-01 14:00:00', 'Misty Pine Forest', 'Ancient pine trees surrounded by a permanent low-hanging mist. A photographer\'s paradise and very quiet.', 'FOREST', 'Highland Peak Trail', 'Manali', 'Himachal Pradesh', 32.2396, 77.1887, 'https://images.unsplash.com/photo-1448375240586-dfd8f3793371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('2023-07-15 08:45:00', '2023-07-15 08:45:00', 'Ruins of Old Fort', 'Lesser known ruins located on the outskirts of the main city. Great for history buffs.', 'HISTORICAL', 'Old Fort Road', 'Jaipur', 'Rajasthan', 26.9124, 75.7873, 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('2023-12-20 13:10:00', '2023-12-20 13:10:00', 'Silent Waterfall', 'A secluded waterfall that requires a 2km trek. The water is freezing but pure.', 'WATERFALL', 'Forest Reserve Area', 'Shillong', 'Meghalaya', 25.5788, 91.8933, 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'),
('2024-01-05 10:00:00', '2024-02-14 12:00:00', 'Sacred Hill Temple', 'A small temple at the top of a hill offering a panoramic view of the valley.', 'HOLYPLACES', 'Hilltop Access Road', 'Rishikesh', 'Uttarakhand', 30.0869, 78.2676, 'https://images.unsplash.com/photo-1566830646676-47b2ae60e454?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');

-- 3. INSERT REVIEWS
-- Timeline: Reviews posted after locations were created (Summer 2023 - Spring 2024)
INSERT INTO reviews (created_on, updated_on, rating, comment, user_id, location_id) VALUES
('2023-05-01 18:30:00', '2023-05-01 18:30:00', 5, 'Absolutely breathtaking! The water was so clear I could see the fish without goggles.', 2, 1), -- John (ID 2) on Lagoon (ID 1)
('2023-08-12 09:15:00', '2023-08-12 09:15:00', 4, 'Very peaceful, but bring mosquito repellent. The hike was worth it.', 3, 2), -- Sarah (ID 3) on Forest (ID 2)
('2023-09-25 14:00:00', '2023-09-25 14:00:00', 5, 'A trip back in time. Loved the architecture. Not crowded at all.', 2, 3), -- John (ID 2) on Fort (ID 3)
('2024-02-14 16:45:00', '2024-02-14 16:45:00', 3, 'Beautiful view, but the road to get there is in very bad condition.', 4, 5), -- Mike (ID 4) on Temple (ID 5)
('2024-03-01 10:20:00', '2024-03-01 10:20:00', 5, 'My favorite spot in the city. Highly recommended for a quiet evening.', 3, 1); -- Sarah (ID 3) on Lagoon (ID 1)

-- 4. INSERT CONTACT MESSAGES
-- Timeline: Random inquiries throughout the year
INSERT INTO contact_messages (created_on, updated_on, name, email, subject, message) VALUES
('2023-10-05 11:30:00', '2023-10-05 11:30:00', 'Alice Guest', 'alice@guest.com', 'Partnership Inquiry', 'Hi, I run a travel blog and would love to feature some of your locations. Do you have an affiliate program?'),
('2023-12-15 08:00:00', '2023-12-15 08:00:00', 'Bob User', 'bob@user.com', 'Bug Report', 'I am unable to upload images from my iPhone. The app crashes when I select a large file.'),
('2024-02-20 15:50:00', '2024-02-20 15:50:00', 'Charlie Fan', 'charlie@fan.com', 'Suggestion', 'Please add a category for "Desert Safaris". I know some great hidden spots in Jaisalmer.');