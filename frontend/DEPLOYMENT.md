# Vercel Deployment

Use `frontend` as the Vercel project root.

## Build settings

```txt
Framework Preset: Create React App
Install Command: npm install --legacy-peer-deps
Build Command: npm run build
Output Directory: build
```

## Environment variables

Set these in Vercel Project Settings, not only in `.env`:

```env
REACT_APP_API_URL=https://convoflow-eie7.onrender.com
REACT_APP_SOCKET_ENDPOINT=https://convoflow-eie7.onrender.com
```

After Vercel gives you the frontend URL, add it to the backend Render environment:

```env
CLIENT_URL=https://your-vercel-app.vercel.app
```
