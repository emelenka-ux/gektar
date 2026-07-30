# Передача проекта «ГектарЪ» — партнёрский сайт

Документ для новой команды / нового компьютера. Здесь всё, что нужно, чтобы
запустить, дорабатывать и деплоить сайт.

---

## 1. Что это

- **Партнёрский лендинг** компании ГектарЪ (программа заработка агентов на продаже
  земельных участков).
- **Живёт на:** https://partners.gektar.expert
- **Стек:** Vite + React 19 + TypeScript + Tailwind CSS + framer-motion.
- **Репозиторий:** https://github.com/emelenka-ux/gektar (ветка `main`).
- Клонированный репозиторий = сам проект (папка `app` = корень репо, всё самодостаточно).

---

## 2. Доступы, которые нужно передать новой команде

Это делает **владелец** (нельзя передать через код):

1. **GitHub** — доступ к репозиторию `emelenka-ux/gektar`:
   - вариант А: добавить человека в **Settings → Collaborators**;
   - вариант Б: **Settings → General → Transfer ownership** (передать репозиторий насовсем);
   - вариант В: новая команда создаёт **свой** репозиторий и переносит туда код
     (тогда заново настраивают секреты деплоя — см. п.4).
2. **reg.ru** — хостинг + домен `gektar.expert` / `partners.gektar.expert`
   (доступ в личный кабинет reg.ru и в панель хостинга ISPmanager).
3. **(для формы заявок)** Telegram-бот `@gektar_request` и Google-таблица — см. п.5.

---

## 3. Как запустить локально (на другом компьютере)

1. Установить **Node.js 20+** — https://nodejs.org
2. В терминале:
   ```bash
   git clone https://github.com/emelenka-ux/gektar.git
   cd gektar
   npm install
   npm run dev
   ```
3. Открыть http://localhost:5173

Сборка production-версии: `npm run build` (результат в папке `dist/`).

---

## 4. Как работает деплой (автоматический)

- Любой **push в ветку `main`** запускает GitHub Actions, которые собирают сайт и
  заливают его по **FTP на reg.ru**. Ручной деплой не нужен.
- Настройка деплоя: файл **`.github/workflows/deploy.yml`**.
- Для работы нужны **4 секрета** в репозитории
  (GitHub → Settings → Secrets and variables → Actions):

  | Секрет | Что это |
  |---|---|
  | `FTP_SERVER` | FTP-хост (напр. `server34.hosting.reg.ru`) |
  | `FTP_USERNAME` | FTP-логин (напр. `u3451496`) |
  | `FTP_PASSWORD` | пароль FTP-пользователя |
  | `FTP_SERVER_DIR` | папка сайта на хостинге (напр. `/www/partners.gektar.expert/`) |

  ⚠️ При переносе в **другой** GitHub-репозиторий эти секреты нужно создать заново
  (значения берутся в панели reg.ru → FTP-пользователи).

- Хостинг reg.ru — обычный виртуальный, панель **ISPmanager**
  (`server34.hosting.reg.ru:1500`).

---

## 5. Важные детали (обязательно прочитать)

### 3D-туры лежат на хостинге, НЕ в git
Виртуальные туры большие (~200 МБ), поэтому лежат прямо на хостинге:
- `partners.gektar.expert/tour/kostomarovo/` (Щёкинские берега)
- `partners.gektar.expert/tour/silverlake/` (Серебряные пруды)

При переезде на другой хостинг их нужно перенести отдельно (через файловый менеджер / FTP).
Ссылки на туры прописаны в `src/pages/TulaPage.tsx` и `src/pages/MoscowPage.tsx`.

### Форма заявки и БЕЗОПАСНОСТЬ 🔴
Форма «Фиксация клиента» отправляет данные в **Telegram** и **Google Sheets**.
Ключи зашиты в `src/components/ContactForm.tsx`:
- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота;
- ссылка на Google Apps Script.

**Это клиентский код — токен виден любому посетителю сайта в исходниках.**
При передаче посторонним **обязательно замените бот-токен и таблицу на свои**
(старый бот отзовите в @BotFather), иначе чужие люди получат доступ к вашим заявкам.

### Чистые URL (/tula, /blog/)
Работают благодаря файлу **`public/.htaccess`** (правила Apache для reg.ru).
На другом хостинге (nginx и т.п.) нужен аналогичный SPA-fallback.

### SEO
- `public/sitemap.xml`, `public/robots.txt`
- мета-теги каждой страницы — через `src/lib/usePageMeta.ts`.

---

## 6. Структура проекта (кратко)

```
src/
  pages/          HomePage, BlogPage, TulaPage/TverPage/CrimeaPage/MoscowPage, InstallmentPage
  components/     LandPageTemplate, ContactForm, Footer, SocialLinks, CountUp, ui/ (shadcn)
  lib/            usePageMeta.ts (SEO), utils.ts
  App.tsx         маршруты (BrowserRouter)
  index.css       дизайн-система (цвета, шрифты Manrope/Unbounded, стекло, .htaccess-стили)
public/
  images/         все фото и планы участков
  .htaccess       SPA-fallback для reg.ru
  sitemap.xml, robots.txt, blog/ (данные блога)
.github/workflows/deploy.yml   авто-деплой
```

Проекты участков и данные (названия, ссылки на диски, кнопки) — прямо в файлах
`src/pages/*Page.tsx`.

---

## 7. Дизайн-скиллы для ИИ-помощи (необязательно)

Сайт делался с помощью Claude Code и дизайн-скиллов. Если новая команда тоже хочет
их использовать — установить в проект (папка `.claude/skills/`):
- **ui-ux-pro-max** — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **frontend-design** — https://github.com/anthropics/skills (папка `skills/frontend-design`)

Для запуска и правок сайта они НЕ обязательны.

---

## 8. Контакты проекта (в коде/на сайте)

- Телефон: +7 (995) 169-12-30
- Почта: Gektar.RF@yandex.com
- Telegram-канал агентов: https://t.me/gektarexpert_agents
- MAX, VK, YouTube, Pinterest — ссылки в `src/components/SocialLinks.tsx`
