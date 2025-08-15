# Memebers only
project performed during the odin project full stack web development on authenticaton and authorizaiton using `passport.js` with `express-session` and `local strategy`

## project structure


```
project-root/
│
├── src/
│   ├── config/              # Database & environment config
│   │   ├── db.js            # pg Pool or Sequelize/Prisma connection
│   │   └── env.js           # Load .env variables
│   │
│   ├── models/              # Database layer
│   │   ├── userModel.js
│   │   └── messageModel.js
│   │
│   ├── controllers/         # Logic layer
│   │   ├── userController.js
│   │   └── messageController.js
│   │
│   ├── routes/              # API endpoints
│   │   ├── userRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── middlewares/         # Authentication, validation
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── views/               # If using server-rendered pages (EJS/Pug)
│   │   ├── users.ejs
│   │   └── messages.ejs
│   │
│   ├── utils/               # Helper functions
│   │   └── validators.js
│   │
│   └── app.js               # Express app setup
│
├── migrations/              # SQL migration scripts
│   ├── 001_create_users.sql
│   └── 002_create_messages.sql
│
├── seed/                    # Test data
│   └── seed.sql
│
├── .env
├── package.json
└── README.md
```