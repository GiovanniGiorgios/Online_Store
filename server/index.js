require('dotenv').config()
const express = require('express') //фреймворк для створення веб-додатків і веб-серверів
const sequelize = require('./db')
const cors = require('cors') // щоб можна було отправляти запроси из браузера
const fileUpload = require('express-fileupload') // щоб можна було файли в post get
const router = require('./routes/index') // основний роутер
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000 //port

const { User, BasketList, Product, BasketProduct, Review, Rating } = require('./models/models')

const app = express()
app.use(cors())
app.use(express.json()) // щоб наше приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, 'static'))) // явно указати серверу що файли з папки static треба роздавати як static
app.use(fileUpload({})) // для роботи з файлами
app.use('/api', router) // /api - url по якому повинен оброблятися router

//последний middleware, тому не траба передавати next
app.use(errorHandler) // повинен підключаться в останю чергу

//отрправка запроса якщо перейти в браузере localhost:9000 
// app.get('/', (req, res) => {
//     res.status(200).json({message: 'WORKING!'})
// })

const start = async () => {
    try { 
        await sequelize.authenticate() //підключення до БД
        await sequelize.sync() //провіряє стан БД із схемою даних

        // await sequelize.sync({ force: true }) // force true - видаляє всі дані з БД і створює нові таблиці
        // async function testDatabase() {
        //     try {
        //         // Create a new user
        //         const user = await User.create({ email: 'test@example.com', password: 'password' });
        
        //         // Create a new basket for the user
        //         const basket = await BasketList.create({ userId: user.id });
        
        //         // Create a new product
        //         const product = await Product.create({ title: 'Test Product', price: 100 });

        //         // Add the product to the basket
        //         const basketProduct = await BasketProduct.create({ productId: product.id, basketListId: basket.id });
        
        //         // Create a new review for the product
        //         const review = await Review.create({ description: 'Great product!', userId: user.id, productId: product.id });
        
        //         // Create a new rating for the product
        //         const rating = await Rating.create({ rate: 5, userId: user.id, productId: product.id });
        
        //         console.log('Database has been populated!');
        //     } catch (error) {
        //         console.error('Error populating database:', error);
        //     }
        // }
        // testDatabase();

        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()