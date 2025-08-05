import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import errorHandleMiddleware  from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)


const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

app.use(express.static(path.join(__dirname,'../frontend/dist')));

app.get('/debug-path', (_, res) => {
  const fullPath = path.resolve(__dirname, '../frontend/dist/index.html');
  res.send(`Trying to access: ${fullPath}`);
});

app.use(errorHandleMiddleware)
if(process.env.NODE_ENV!=='PRODUCTION'){
dotenv.config({path:'backend/config/config.env'})
}
export default app;