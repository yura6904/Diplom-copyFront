db.factories.insertMany([
    {
        "_id": 0,
        "name": "Завод 1",
        "address": "Адрес завода 1",
        "coordinates": [48.14161, 12.73583],
    },
    {
        "_id": 1,
        "name": "Завод 2",
        "address": "Адрес завода 2",
        "coordinates": [52.51545, 13.3736],
    },        
    {
        "_id": 2,
        "name": "Завод 3",
        "address": "Адрес завода 3",
        "coordinates": [51.06132, 13.79108],
    },        
    {
        "_id": 3,
        "name": "Завод 4",
        "address": "Адрес завода 4",
        "coordinates": [48.76984, 9.22077],
    },        
    {
        "_id": 4,
        "name": "Завод 5",
        "address": "Адрес завода 5",
        "coordinates": [50.1409, 8.69343],
    },]
)
db.products.insertMany(
    [
        {
            "_id": 0,
            "name": 'Полимерная пленка 1',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": "https://foodupak.ru/uploads/proto/_info/k5sipmzzaeyyxljf7.jpg",
            "factoriesID": [1,2],
        },
        {
            "_id": 1,
            "name": 'Пластиковая карта 1',            
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Credit-cards.jpg',
            "factoriesID": [2,3],
        },
        {
            "_id": 2,
            "name": 'Пластиковый контейнер 1',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://cdn1.ozone.ru/s3/multimedia-f/wc1200/6018914919.jpg',
            "factoriesID": [0,1,4],
        },
        {
            "_id": 3,
            "name": 'Полимерная пленка 2',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": "https://foodupak.ru/uploads/proto/_info/k5sipmzzaeyyxljf7.jpg",
            "factoriesID": [1,2,3],
        },
        {
            "_id": 4,
            "name": 'Пластиковая карта 2',            
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Credit-cards.jpg',
            "factoriesID": [3],
        },
        {
            "_id": 5,
            "name": 'Пластиковый контейнер 2',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://cdn1.ozone.ru/s3/multimedia-f/wc1200/6018914919.jpg',
            "factoriesID": [0,3],
        },
        {
            "_id": 6,
            "name": 'Полимерная пленка 3',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": "https://foodupak.ru/uploads/proto/_info/k5sipmzzaeyyxljf7.jpg",
            "factoriesID": [1,4],
        },
        {
            "_id": 7,
            "name": 'Пластиковая карта 3',            
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Credit-cards.jpg',
            "factoriesID": [1,4],
        },
        {
            "_id": 8,
            "name": 'Пластиковый контейнер 3',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://cdn1.ozone.ru/s3/multimedia-f/wc1200/6018914919.jpg',
            "factoriesID": [2],
        },
        {
            "_id": 9,
            "name": 'Полимерная пленка 4',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": "https://foodupak.ru/uploads/proto/_info/k5sipmzzaeyyxljf7.jpg",
            "factoriesID": [4],
        },
        {
            "_id": 10,
            "name": 'Пластиковый контейнер 4',
            "price": '22$',
            "info": 'Информация о товаре',
            "img": 'https://cdn1.ozone.ru/s3/multimedia-f/wc1200/6018914919.jpg',
            "factoriesID": [0],
        },    
    ]
)
db.customers.insertMany(
    [
        {
            "_id": 0,
            "name": 'Заказчик 1',
            "address": 'Прага',
            "contacts": '98562335522',
            "coordinates": [50.07044, 14.40632]
        },
        {
            "_id": 1,
            "name": 'Заказчик 2',
            "address": 'Варшава',
            "contacts": '5852600655',
            "coordinates": [52.26066, 21.04948],
        },
        {
            "_id": 2,
            "name": 'Заказчик 3',
            "address": 'Милан',
            "contacts": '2259995',
            "coordinates": [45.48471, 9.22317],
        },
        {
            "_id": 3,
            "name": 'Заказчик 4',
            "address": 'Гамбург',
            "contacts": '2259995',
            "coordinates": [53.53828, 9.97024],
        }
    ]
)
