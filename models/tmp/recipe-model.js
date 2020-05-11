// Назвал это философией
const dishPhilosophy = {
    default: 'default',
    vegeterian: 'vegeterian',
    vegan: 'vegan',
    healthy: 'healthy'
}

// Типы блюд
const dishTypes = {
    soup: 'soup',
    main: 'main',
    snacks: 'snacks',
    dessert: 'dessert',
    other: 'other'
}

// Владелец рецепта (если вдруг в будущем дадим пользователям возможность добавлять свои рецепты)
const owners = {
    user: 'user',
    default: 'default'
}

const units = {
    1: 'gramm',
    2: ''
}

// Пример модели рецепта
const recipeModel = {
    id: 1, 
    title: 'Борщ домашний',
    shortDescription: 'Вкусный красный борщ с говядиной и еще чем-то там',
    imgSrc: [  // Массив ссылок на фотографии (делается массивом чтобы можно было использовать несколько фотографий)
        'https://img1.russianfood.com/dycontent/images_upl/64/sm_63397.jpg',
        'https://img1.russianfood.com/dycontent/images_upl/64/sm_63397.jpg',
        'https://img1.russianfood.com/dycontent/images_upl/64/sm_63397.jpg'
    ],
    dishType: 'soup',
    dishPhilosophy: 'vegeterian',
    dishOwner: 'default',  // Default = 'по умолчанию' или 'стандартно'
    hardnessLvl: 2,  // Уровень сложности
    estimate: 60, // Время на приготовление в минутах
    ingredients: [ // Массив объектов где каждый объект это один из игридиентов [{},{},{}]
        {
            productId: 31, // Порядковый номер продукта в базе данных
            productName: 'Buryak',
            productType: 'Овощ',
            quantity: 400, // В граммах
            imgSrc: [],
            structure: {
                kilocaloriesInOneHandredGramms: 800, // Килокалорий в 1 грамме продукта
                fatInOneHandredGramms: 25,     
                proteinsInOneHandredGramms: 25,
                carbohydratesInOneHandredGramms: 50,
            },
            interestingFact: '' // Интересный факт о продукте
        },
        {
            productId: 21, 
            productName: 'Лук',
            productType: 'Овощ',
            quantity: 150,
            structure: {
                kilocaloriesInOneHandredGramms: 800, 
                fatInOneHandredGramms: 25,     
                proteinsInOneHandredGramms: 25,
                carbohydratesInOneHandredGramms: 50,
            },
            interestingFact: '' 
        },
        // И так далее
    ],
    recipe: {
        introText: 'String with description',
        steps: {
            1: {
                stepName: 'Нарезать овощи',
                videoSrc: '', // Ссылка на видео. Если видео нет, то можно оставить пустым  
                description: 'Some text',
                estimate: 10, // Время на этап в минутах
                isTimerRequired: false, // Если в интерфейсе нужен будет таймер для этого этапа
            },
            2: {
                stepName: 'Нарезать овощи',
                videoSrc: '', 
                description: 'Some text',
                estimate: 10,
                isTimerRequired: false, 
            }
        }
    }
}