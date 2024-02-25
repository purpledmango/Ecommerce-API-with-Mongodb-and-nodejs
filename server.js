import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import connectToDb from './src/database/db.js';
import AuthRoutes from './src/routes/auth.js';
import ProductRoutes from './src/routes/products.js';
import OrderRoutes from "./src/routes/orders.js"
import CartRoutes from "./src/routes/cart.js"
import CategoryRoutes from "./src/routes/category.js"
import TagRoutes from "./src/routes/tag.js"
import KPIRoutes from "./src/routes/KPIs.js"
import InventoryRoutes from "./src/routes/inventory.js"
import UsersRoutes from "./src/routes/users.js"
import authMiddleware from './src/middlewares/authMiddleWare.js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
connectToDb();

// Middleware
app.use(
  cors({
    origin: process.env.PROD_HOST,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use('/product-imgs', express.static(path.join(__dirname, 'product-imgs')));


const store = new MongoDBStore(session)({
  uri: process.env.DB_PROD,
  collection: 'sessions',
});

store.on('error', function (error) {
  console.error(error);
});
const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    saveUninitialized: false,
    resave: false,
    store: store, // Use the MongoDBStore for session storage
    cookie: {
      maxAge: oneMonthInMilliseconds,
    },
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Greetings From Ecom API');
});

app.use('/auth', AuthRoutes);
app.use('/product', ProductRoutes);
app.use('/order', OrderRoutes);
app.use('/cart', CartRoutes);
app.use('/category', CategoryRoutes);
app.use('/tag', TagRoutes);
app.use('/kpi', KPIRoutes);
app.use('/inventory', InventoryRoutes);
app.use('/users', UsersRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n 🚀Server Online on PORT-${PORT} 💡`);
});
