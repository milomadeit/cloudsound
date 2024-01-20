import boto3
import botocore
import os
import uuid

# name for songs bucket
BUCKET_NAME = os.environ.get("S3_BUCKET")

# need images bucket variable

# location of songs bucket
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"

# allowed extensions for songs
ALLOWED_EXTENSIONS = {"mp3", "mp4", "wav", "flac", "aiff"}

# need location of images bucket

# allowed extensions for images


# should be same to access both buckets
s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


# functions for song upload and removal
def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        print(str(e))
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


def remove_file_from_s3(song_url):
    # AWS needs the song file name, not the URL, 
    # so you split that out of the URL
    key = song_url.rsplit("/", 1)[1]
    print(key)
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


# need functions for image upload and removal 