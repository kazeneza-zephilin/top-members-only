-- Seeder for "users" table
INSERT INTO users (first_name, second_name, username, email, is_admin, is_member, password)
VALUES
('John', 'Doe', 'johndoe', 'john@example.com', TRUE, TRUE, 'hashed_password1'),
('Jane', 'Smith', 'janesmith', 'jane@example.com', FALSE, TRUE, 'hashed_password2'),
('Mark', 'Lee', 'marklee', 'mark@example.com', FALSE, FALSE, 'hashed_password3');

-- Seeder for "messages" table
INSERT INTO messages (user_id, title, message, created_at)
VALUES
(1, 'Welcome Message', 'Hello John, welcome to Only Members!', NOW()),
(2, 'Membership Info', 'Jane, your membership is active.', NOW()),
(3, 'Reminder', 'Mark, please activate your membership.', NOW());
