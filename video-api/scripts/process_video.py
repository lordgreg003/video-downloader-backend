import sys
import yt_dlp
import requests
import os

def download_video(url):
    ydl_opts = {
        'outtmpl': './downloads/%(title)s.%(ext)s',
        'format': 'best',
        'noplaylist': True,  # Avoid downloading playlists
    }
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            result = ydl.extract_info(url, download=True)
            video_title = result['title']
            video_file = f"./downloads/{video_title}.{result['ext']}"
            return video_file
    except Exception as e:
        print(f"Error downloading video: {e}")
        return str(e)

def download_image(url):
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            file_name = url.split("/")[-1]
            file_path = f"./downloads/{file_name}"
            with open(file_path, 'wb') as out_file:
                out_file.write(response.content)
            return file_path
        else:
            return f"Failed to download image. Status code: {response.status_code}"
    except Exception as e:
        print(f"Error downloading image: {e}")
        return str(e)

def process_media(url):
    if 'youtube.com' in url or 'youtu.be' in url or 'vimeo.com' in url:
        return download_video(url)
    elif url.endswith(('jpg', 'jpeg', 'png', 'gif', 'webp')):
        return download_image(url)
    else:
        return "Unsupported URL format."

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No URL provided")
        sys.exit(1)

    media_url = sys.argv[1]
    file_path = process_media(media_url)
    print(file_path)
