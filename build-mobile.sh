#!/bin/bash
echo "📦 Building Ionic app for mobile..."
ionic build --configuration mobile

if [ $? -ne 0 ]; then
  echo "❌ Build failed."
  exit 1
fi

echo "🔄 Syncing with Capacitor..."
npx cap sync

echo "✅ Mobile build completed!"
