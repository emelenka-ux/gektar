<?php
/**
 * API Endpoint для обновления posts.json из Make
 * 
 * POST /blog/api/update-posts.php
 * Content-Type: application/json
 * 
 * Body:
 * {
 *   "secret": "YOUR_SECRET_KEY",
 *   "action": "add|update|delete",
 *   "post": {
 *     "title": "Заголовок статьи",
 *     "slug": "url-stati",
 *     "excerpt": "Краткое описание",
 *     "content": "<p>HTML контент</p>",
 *     "image": "/blog/images/post-7.jpg",
 *     "date": "2025-01-20"
 *   }
 * }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Для preflight запросов
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Проверяем метод
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// Секретный ключ для авторизации (измените на свой!)
$SECRET_KEY = 'gektar_blog_2025_secret';

// Путь к posts.json
$POSTS_FILE = __DIR__ . '/../posts.json';

// Получаем входные данные
$input = json_decode(file_get_contents('php://input'), true);

// Проверяем секретный ключ
if (!isset($input['secret']) || $input['secret'] !== $SECRET_KEY) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Invalid secret key']);
    exit;
}

// Проверяем action
if (!isset($input['action'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Action is required']);
    exit;
}

$action = $input['action'];

// Читаем текущий posts.json
if (!file_exists($POSTS_FILE)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'posts.json not found']);
    exit;
}

$postsData = json_decode(file_get_contents($POSTS_FILE), true);
if (!$postsData || !isset($postsData['posts'])) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Invalid posts.json format']);
    exit;
}

$posts = $postsData['posts'];

// Выполняем действие
switch ($action) {
    case 'add':
        // Добавление новой статьи
        if (!isset($input['post'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Post data is required']);
            exit;
        }
        
        $newPost = $input['post'];
        
        // Проверяем обязательные поля
        $requiredFields = ['title', 'slug', 'excerpt', 'content', 'date'];
        foreach ($requiredFields as $field) {
            if (!isset($newPost[$field]) || empty($newPost[$field])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => "Field '$field' is required"]);
                exit;
            }
        }
        
        // Проверяем, что slug уникален
        $existingSlugs = array_column($posts, 'slug');
        if (in_array($newPost['slug'], $existingSlugs)) {
            http_response_code(409);
            echo json_encode(['success' => false, 'error' => 'Slug already exists']);
            exit;
        }
        
        // Устанавливаем изображение по умолчанию, если не указано
        if (!isset($newPost['image']) || empty($newPost['image'])) {
            $newPost['image'] = '/blog/images/placeholder.jpg';
        }
        
        // Добавляем статью в начало массива
        array_unshift($posts, $newPost);
        break;
        
    case 'update':
        // Обновление существующей статьи
        if (!isset($input['post']) || !isset($input['post']['slug'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Post with slug is required']);
            exit;
        }
        
        $updatePost = $input['post'];
        $slug = $updatePost['slug'];
        $found = false;
        
        foreach ($posts as &$post) {
            if ($post['slug'] === $slug) {
                $post = array_merge($post, $updatePost);
                $found = true;
                break;
            }
        }
        
        if (!$found) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Post not found']);
            exit;
        }
        break;
        
    case 'delete':
        // Удаление статьи
        if (!isset($input['slug'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Slug is required for delete']);
            exit;
        }
        
        $slug = $input['slug'];
        $initialCount = count($posts);
        $posts = array_filter($posts, function($post) use ($slug) {
            return $post['slug'] !== $slug;
        });
        $posts = array_values($posts); // Reindex array
        
        if (count($posts) === $initialCount) {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Post not found']);
            exit;
        }
        break;
        
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid action. Use: add, update, delete']);
        exit;
}

// Сохраняем обновленный posts.json
$postsData['posts'] = $posts;
$result = file_put_contents($POSTS_FILE, json_encode($postsData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to write posts.json']);
    exit;
}

// Успешный ответ
echo json_encode([
    'success' => true,
    'message' => "Action '$action' completed successfully",
    'total_posts' => count($posts)
]);
