#!/bin/bash

echo "🧹 Ich lösche den Cache..."
rm -rf node_modules/.cache
rm -rf build dist
echo "✅ Cache erfolgreich gelöscht"
