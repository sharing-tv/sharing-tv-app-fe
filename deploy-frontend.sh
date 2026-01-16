
#!/bin/bash

set -e

IMAGE_NAME="sharing-tv-frontend"
CONTAINER_NAME="sharing-tv-frontend-test"
PORT=4200

echo "🛑 Stop & remove existing frontend container (if any)..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "🧹 Remove old frontend image (optional)..."
docker rmi $IMAGE_NAME 2>/dev/null || true

echo "🐳 Building frontend Docker image..."
docker build -t $IMAGE_NAME .

echo "🚀 Running frontend container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p ${PORT}:80 \
  $IMAGE_NAME

echo "⏳ Waiting frontend to start..."
sleep 3

echo "🔍 Frontend check:"
curl -I http://localhost:${PORT}/ || true

echo ""
echo "✅ Frontend running!"
echo "➡ Web / PWA: http://localhost:${PORT}"
echo "➡ Installable PWA: apri Chrome → ⋮ → Installa app"
echo ""
echo "📜 To follow logs:"
echo "   docker logs -f ${CONTAINER_NAME}"

