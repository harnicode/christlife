# Gallery Image Sync - Setup & Usage Guide

This guide explains how to sync images from Google Drive to your gallery page.

---

## 🚀 Quick Start

### One-Time Setup (5-10 minutes)

#### 1. Install Dependencies

```bash
yarn add googleapis dotenv
```

#### 2. Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Google Drive API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

#### 3. Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Name it: `christlife-gallery-sync`
4. Click "Create and Continue" > "Done"

#### 4. Generate Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose **JSON** format
5. Download the file
6. **Rename it to `google-credentials.json`**
7. **Move it to your project root** (same level as package.json)

> ⚠️ **IMPORTANT**: This file contains sensitive credentials. It's already in `.gitignore` - never commit it to git!

#### 5. Share Google Drive Folder with Service Account

1. Open the `google-credentials.json` file
2. Copy the `client_email` value (looks like: `christlife-gallery-sync@...iam.gserviceaccount.com`)
3. Go to your Google Drive folder: https://drive.google.com/drive/folders/1I4QGeb65-IK8paMXEy35sdTcM2czO6kM
4. Click "Share"
5. Paste the service account email
6. Give **Viewer** permission
7. Click "Send"

#### 6. Configure Environment

Copy the example env file:
```bash
cp .env.local.example .env.local
```

The default values should work, but you can customize if needed.

---

## 📥 Usage

### Sync Gallery Images

Run this command whenever you want to download new images from Google Drive:

```bash
yarn gallery:refresh
```

This will:
1. ✅ Download all images from Google Drive
2. ✅ Save them to `public/images/gallery/`
3. ✅ Auto-generate `lib/gallery-data.ts`
4. ✅ Your gallery page will automatically use the new images!

### Individual Commands

If you need more control:

```bash
# Download images only
yarn sync:gallery

# Update gallery data only (after manual image changes)
yarn update:gallery-data
```

---

## 📁 Workflow

### Adding New Gallery Images

1. **Upload images to Google Drive folder**
   - Go to: https://drive.google.com/drive/folders/1I4QGeb65-IK8paMXEy35sdTcM2czO6kM
   - Upload your church photos

2. **Run sync command**
   ```bash
   yarn gallery:refresh
   ```

3. **Review changes**
   - Check `public/images/gallery/` for downloaded images
   - Review `lib/gallery-data.ts` for generated data

4. **Test locally**
   ```bash
   yarn dev
   ```
   - Visit http://localhost:3000/gallery
   - Verify images display correctly

5. **Commit and deploy**
   ```bash
   git add public/images/gallery lib/gallery-data.ts
   git commit -m "Update gallery images"
   git push
   ```

---

## 🎨 Customizing Image Metadata

After running the sync, you can manually edit `lib/gallery-data.ts` to:
- Update image titles
- Add better descriptions
- Categorize images (worship, events, community, etc.)
- Reorder images

The next time you run `yarn update:gallery-data`, it will preserve your manual changes if the image filenames haven't changed.

---

## 🔧 Troubleshooting

### "Authentication failed"
- ✅ Ensure `google-credentials.json` exists in project root
- ✅ Check the file is valid JSON
- ✅ Verify the service account has the correct permissions

### "Failed to list files"
- ✅ Confirm you shared the Google Drive folder with the service account email
- ✅ Check the folder ID in `.env.local` is correct
- ✅ Ensure the service account has "Viewer" access

### "No images found"
- ✅ Verify there are images in the Google Drive folder
- ✅ Check the folder ID is correct
- ✅ Ensure images are directly in the folder (not in subfolders)

### Images not showing on website
- ✅ Run `yarn dev` to restart the dev server
- ✅ Clear browser cache
- ✅ Check browser console for errors

---

## 📊 File Structure

```
christlife/
├── google-credentials.json          # Service account credentials (gitignored)
├── .env.local                        # Configuration (gitignored)
├── scripts/
│   ├── sync-gallery-images.js       # Downloads images from Google Drive
│   └── update-gallery-data.js       # Generates gallery data file
├── public/
│   └── images/
│       └── gallery/                  # Downloaded images
│           ├── image-1.jpg
│           ├── image-2.jpg
│           └── metadata.json         # Image metadata
└── lib/
    └── gallery-data.ts               # Auto-generated gallery data
```

---

## 🔒 Security Notes

- ✅ `google-credentials.json` is in `.gitignore` - never commit it
- ✅ `.env.local` is in `.gitignore` - never commit it
- ✅ Service account has read-only access to Google Drive
- ✅ Scripts run locally only, not on the server

---

## 💡 Tips

- **Organize images in Google Drive** with descriptive filenames (e.g., `sunday-worship-jan-2024.jpg`)
- **Run sync weekly** or after major church events
- **Optimize images** before uploading to Google Drive (resize to max 2000px width)
- **Use consistent naming** for easier management

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review the error messages carefully
3. Ensure all setup steps were completed
4. Verify Google Drive folder permissions

---

**Happy syncing! 🎉**
