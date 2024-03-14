// // свезующа модель для (brand type) бо там звязок багато до багато
// const TypeBrand = sequelize.define('type_brand', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })

const sequelize = require("../db")
const {DataTypes} = require("sequelize")

// USER
const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    birthDate: {type: DataTypes.DATE},
    phoneNumber: {type: DataTypes.INTEGER},
})

// DISCOUNTS 
const Discount = sequelize.define("discount", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    percent: {type: DataTypes.INTEGER, allowNull: false},
    timeStart: {type: DataTypes.DATE, allowNull: false},
    timeLife: {type: DataTypes.INTEGER, allowNull: false},
})
const DiscountCard = sequelize.define("discount_card", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.INTEGER, allowNull: false},
    percent: {type: DataTypes.INTEGER, allowNull: false},
    timeLife: {type: DataTypes.INTEGER, allowNull: false},
})
const DiscountCardForProduct = sequelize.define("discountCard_for_product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.INTEGER, allowNull: false},
    percent: {type: DataTypes.INTEGER, allowNull: false},
    timeLife: {type: DataTypes.INTEGER, allowNull: false},
})

// BASKETS
const BasketList = sequelize.define("basket_list", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketProduct = sequelize.define("basket_product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WishList = sequelize.define("wish_list", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const WishProduct = sequelize.define("wish_product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// ORDERS
const Order = sequelize.define("order", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    payMethod: {type: DataTypes.STRING, allowNull: false},
    placeOfDelivery: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
})

// REVIEWS
const Review = sequelize.define("review", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})

// RATING
const Rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

// PRODUCTS
const Product = sequelize.define("product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
})
// product info
const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})


// CATEGORIES
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const SubCategory = sequelize.define('subCategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
// type
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
// brand
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

// IMAGES
const Image = sequelize.define('image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    imgSrc: {type: DataTypes.STRING, allowNull: false},
})


// additional tables
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const ProductSubCategory = sequelize.define('product_subCategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const ProductCategory = sequelize.define('product_category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


// RELATIONS
// User has one BasketList
User.hasOne(BasketList, {foreignKey: 'userId'});
BasketList.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(BasketProduct, {foreignKey: 'productId'});
BasketProduct.belongsTo(Product, {foreignKey: 'productId'});

BasketList.hasMany(BasketProduct, {foreignKey: 'basketListId'});
BasketProduct.belongsTo(BasketList, {foreignKey: 'basketListId'});
// User has one WishList
User.hasOne(WishList, {foreignKey: 'userId'});
WishList.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(WishProduct, {foreignKey: 'wishListId'});
WishProduct.belongsTo(Product, {foreignKey: 'wishListId'});

WishList.hasMany(WishProduct, {foreignKey: 'wishListId'});
WishProduct.belongsTo(WishList, {foreignKey: 'wishListId'});

// ORDERS
User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(Order, {foreignKey: 'productId'});
Order.belongsTo(Product, {foreignKey: 'productId'});

// RATING
User.hasMany(Rating, {foreignKey: 'userId'});
Rating.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(Rating, {foreignKey: 'productId'});
Rating.belongsTo(Product, {foreignKey: 'productId'});


// REWIEWS
User.hasMany(Review, {foreignKey: 'userId'});
Review.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(Review, {foreignKey: 'productId'});
Review.belongsTo(Product, {foreignKey: 'productId'});

Review.hasMany(Image, {foreignKey: 'reviewId'});
Image.belongsTo(Review, {foreignKey: 'reviewId'});

// DISCOUNTS
User.hasMany(DiscountCard, {foreignKey: 'userId'});
DiscountCard.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(DiscountCardForProduct, {foreignKey: 'userId'});
DiscountCardForProduct.belongsTo(User, {foreignKey: 'userId'});

Product.hasMany(DiscountCardForProduct, {foreignKey: 'productId'});
DiscountCardForProduct.belongsTo(Product, {foreignKey: 'productId'});

// PRUDUCTS 
Product.hasMany(Discount, {foreignKey: 'productId'});
Discount.belongsTo(Product, {foreignKey: 'productId'});

Product.belongsTo(Type, {foreignKey: 'typeId'});
Type.hasMany(Product, {foreignKey: 'typeId'});

Product.belongsTo(Brand, {foreignKey: 'brandId'});
Brand.hasMany(Product, {foreignKey: 'brandId'});

Type.belongsToMany(Brand, {through: TypeBrand, foreignKey: 'typeId'});
Brand.belongsToMany(Type, {through: TypeBrand, foreignKey: 'brandId'});

// categories
Product.belongsToMany(SubCategory, {through: ProductSubCategory, foreignKey: 'productId'});
SubCategory.belongsToMany(Product, {through: ProductSubCategory, foreignKey: 'subCategoryId'});

Product.belongsToMany(Category, {through: ProductCategory, foreignKey: 'productId'});
Category.belongsToMany(Product, {through: ProductCategory, foreignKey: 'CategoryId'});

Category.hasMany(SubCategory, {foreignKey: 'categoryId'});
SubCategory.belongsTo(Category, {foreignKey: 'categoryId'});
// img
Product.hasMany(Image, {foreignKey: 'productId'});
Image.belongsTo(Product, {foreignKey: 'productId'});
// product info
Product.hasMany(ProductInfo, {foreignKey: 'productId'});
ProductInfo.belongsTo(Product, {foreignKey: 'productId'});


module.exports = {
    User,
    Discount,
    DiscountCard,
    DiscountCardForProduct,
    BasketList,
    BasketProduct,
    WishList,
    WishProduct,
    Order,
    Review,
    Rating,
    Product,
    ProductInfo,
    Category,
    SubCategory,
    Type,
    Brand,
    Image,
}