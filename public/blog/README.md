# Блог Гектарь — Инструкция по переносу

## Структура блога

```
/blog/
├── index.html          # Список статей
├── article.html        # Шаблон страницы статьи
├── posts.json          # База данных статей
├── README.md           # Этот файл
├── MAKE_SETUP.md       # Инструкция для Make
├── api/
│   └── update-posts.php  # API для обновления из Make
└── images/
    ├── post-1.jpg      # Обложки статей
    ├── post-2.jpg
    ├── ...
    └── placeholder.jpg # Заглушка
```

## Перенос на REG.RU

### 1. Загрузка файлов

Загрузите папку `/blog/` в корень вашего сайта на REG.RU:
```
/public_html/blog/
```

### 2. Права доступа

Установите права 755 на папку `blog/api/`:
```bash
chmod 755 /public_html/blog/api/
```

### 3. Проверка PHP

Убедитесь, что PHP версии 7.4+ включён на хостинге.

### 4. Безопасность

**ВАЖНО!** Измените секретный ключ в файле `api/update-posts.php`:

```php
// Старый ключ
$SECRET_KEY = 'gektar_blog_2025_secret';

// Новый ключ (придумайте свой!)
$SECRET_KEY = 'your_unique_secret_key_here';
```

### 5. Проверка работы

После загрузки проверьте:
- Блог: `https://your-domain.ru/blog/`
- API: `https://your-domain.ru/blog/api/update-posts.php`
- JSON: `https://your-domain.ru/blog/posts.json`

## URL структура

| Страница | URL |
|----------|-----|
| Список статей | `/blog/` |
| Статья | `/blog/article.html?slug=url-stati` |
| API | `/blog/api/update-posts.php` |
| JSON | `/blog/posts.json` |

## Редактирование статей

### Вручную

1. Откройте `posts.json`
2. Добавьте/измените объект в массиве `posts`
3. Сохраните файл

### Через Make

См. файл `MAKE_SETUP.md`

## Формат posts.json

```json
{
  "posts": [
    {
      "title": "Заголовок",
      "slug": "url-stati",
      "excerpt": "Краткое описание",
      "content": "<p>HTML контент</p>",
      "image": "/blog/images/post-1.jpg",
      "date": "2025-01-15"
    }
  ]
}
```

## Добавление изображений

1. Загрузите изображение в `/blog/images/`
2. Укажите путь в поле `image` статьи: `/blog/images/your-image.jpg`
3. Рекомендуемый размер: 1200×675px (16:9)

## Поддержка

При возникновении проблем:
1. Проверьте права доступа на файлы
2. Убедитесь, что PHP работает
3. Проверьте консоль браузера (F12) на ошибки
