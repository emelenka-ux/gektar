# Интеграция блога с Make

## Настройка сценария в Make

### 1. Добавление новой статьи

**HTTP модуль в Make:**
- **Method:** POST
- **URL:** `https://your-domain.ru/blog/api/update-posts.php`
- **Content-Type:** application/json

**Body (JSON):**
```json
{
  "secret": "gektar_blog_2025_secret",
  "action": "add",
  "post": {
    "title": "Заголовок статьи",
    "slug": "url-stati",
    "excerpt": "Краткое описание для превью (2-3 предложения)",
    "content": "<p>Полный HTML контент статьи</p><h2>Подзаголовок</h2><p>Текст...</p>",
    "image": "/blog/images/post-7.jpg",
    "date": "2025-01-20"
  }
}
```

### 2. Обновление существующей статьи

```json
{
  "secret": "gektar_blog_2025_secret",
  "action": "update",
  "post": {
    "slug": "url-stati",
    "title": "Новый заголовок"
  }
}
```

### 3. Удаление статьи

```json
{
  "secret": "gektar_blog_2025_secret",
  "action": "delete",
  "slug": "url-stati"
}
```

## Поля статьи

| Поле | Обязательное | Описание |
|------|-------------|----------|
| `title` | Да | Заголовок статьи |
| `slug` | Да | URL-идентификатор (латиница, дефисы) |
| `excerpt` | Да | Краткое описание для карточки |
| `content` | Да | HTML-контент статьи |
| `image` | Нет | Путь к обложке (по умолчанию placeholder) |
| `date` | Да | Дата в формате YYYY-MM-DD |

## Важно

1. **Секретный ключ:** Измените `gektar_blog_2025_secret` в файле `api/update-posts.php` на свой!

2. **Изображения:** Загружайте изображения в `/blog/images/` перед добавлением статьи.

3. **Slug должен быть уникальным** — это URL-идентификатор статьи.

4. **HTML в content:** Используйте теги `<p>`, `<h2>`, `<h3>`, `<ul>`, `<li>`, `<strong>`.

## Пример сценария в Make

```
[Триггер: Новая строка в Google Sheets]
    ↓
[HTTP: POST на update-posts.php]
    ↓
[Уведомление: Статья добавлена]
```

Google Sheets должен содержать колонки:
- Title
- Slug  
- Excerpt
- Content
- Image
- Date
- Status (published/draft)
