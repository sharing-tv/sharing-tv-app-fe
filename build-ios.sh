#!/bin/bash
set -e

# Percorso base
cd "$(dirname "$0")"

echo "➡️ Aggiorno codice..."
git pull origin main

echo "📦 Installo dipendenze..."
npm ci

echo "🧱 Build Ionic..."
ionic build --prod

echo "🔗 Sync Capacitor..."
ionic capacitor sync ios

echo "📦 Compilo progetto Xcode..."
xcodebuild -workspace ios/App/App.xcworkspace \
  -scheme App \
  -configuration Release \
  -archivePath ../ios-builds/App.xcarchive archive

echo "📤 Esporto IPA..."
xcodebuild -exportArchive \
  -archivePath ../ios-builds/App.xcarchive \
  -exportOptionsPlist exportOptions.plist \
  -exportPath ../ios-builds

echo "✅ Build completata!"
