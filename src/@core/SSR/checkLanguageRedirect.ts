export function ensureLanguageSegment(url: string, preferredLocale: string): string {
  const segments = url.split('/');

  // Найти существующий префикс языка в URL
  const langIndex = segments.findIndex(segment => ['en', 'ru', 'ty', 'kgz'].includes(segment));

  if (langIndex !== -1) {
    // Если префикс языка найден, заменить его на предпочтительный
    segments[langIndex] = preferredLocale;
  } else {
    // Если префикс языка не найден, добавить предпочтительный префикс
    segments.splice(1, 0, preferredLocale);
  }

  return segments.join('/');
}
