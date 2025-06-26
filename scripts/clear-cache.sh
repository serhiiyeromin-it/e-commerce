#!/bin/bash

echo "🧹 Удаляю кэш..."
rm -rf node_modules/.cache
rm -rf build dist
echo "✅ Кэш успешно очищен"
