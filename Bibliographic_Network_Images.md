---
title: Generating Images for SuAVE Bibliographic Network
parent: SuAVE Bibliographic Network
nav_order: 6

---

# Generating Images for SuAVE Bibliographic Network

The following code will generate images based on search queries that are constructed from the variables "Name", "Affiliation", "City", and "Country" in the dataset.

**Requirements**
- Use a VPN to run this code. I recommend ProtonVPN as it is free
- In addition, this code only works for Python versions 3.7 and 3.8 due to the package face_recognition.
- Dataset with the following columns (at least): "Name", "Affiliation", "City", and "Country" in the dataset.

To get a notebook to run within these requirements, follow these steps (you need Anaconda Navigator for this to work):

1. Navigate to your terminal
2. Create a virtual environment using the following command (replace "myenv" with the environment name of your choosing):
   - `conda create -n myenv python=3.7`
3. Activate the environment with the following command (replace "myenv" with the environment name of your choosing):
   - conda activate myenv
4. Create a kernel that works in Python 3.7. For this step, make sure to have ipykernel package (if not, enter the command  `conda install ipykernel`)To do this, use the following command (replace "myenv_kernel" with the environment name of your choosing):
   - `python -m ipykernel install --user --name=myenv_kernel`
5. Next, in your terminal, enter the command `jupyter notebook`. This will open jupyter for you. If this does not work, type in `conda install jupyter` and it should work then.
6. Now, open a Jupyter Notebook. Click on "Kernel" and then "Change kernel". Select the one you just created.

**Checkpoint**

- Dataset (to run the code on) with the columns "Name", "Affiliation", "City", and "Country"

- Utilizing VPN

- Jupyter Notebook open with a kernel running in Python 3.7 or 3.8


***Note for the Following Code***: The only liberty you should take in this code (besides changing the variables names designated to custom to the specific laptop and dataset) is balancing the limit of the number of images generated per query and the time to execute. If you are not getting as many valid results as desired (no valid images generated for some people), increase the image generation per query limit. Keep in mind this greatly impacts runtime for large datasets. Start at a limit of 2 and increase as needed.


# Imports

>    import face_recognition
> import urllib.request
> import urllib
> import re
> import ssl
> import itertools
> import gender_guesser.detector as gender
> import csv
> import html
> import os
> import requests
> from bs4 import BeautifulSoup
> from PIL import Image
> import json
> import time
> import io
> from PIL import Image
> import cv2
> import numpy as np
> import lxml

# Dataset Information
**In this code, change `csv_file` and `download_dir` to the specific location of the dataset and where you want pictures to be downloaded to. Also change the column names to match the ones in the dataset.**

> #In this code, change `csv_file` and `download_dir` to the specific location of the dataset and where you want pictures to be downloaded to
> csv_file = ""
> #format: "/directory/"
> download_dir = ""
> #format: "/directory/"
>
> #edit the names of these to what they are in the datatset
> name_col = 'Name'
> affiliation_col = 'Affiliation'
> city_col = 'City'
> country_col = 'Country'

# General Functions

> def generate_queries(name, affiliation, country, city):
>     args = [name, affiliation, country, city]
>     combinations = []
>     for i in range(2, len(args) + 1):
>         comb = list(itertools.combinations(args, i))
>         for c in comb:
>             if c[0] == name and "" not in c and "Unknown" not in c:
>                 if city in c and country in c:
>                     continue
>                 combinations.append(list(c))
>     final_combinations = [name]
>     for combo in combinations:
>         new_combo = ' '.join(combo)
>         final_combinations.append(new_combo)
>     return final_combinations
> 
> def get_image_urls(limit, name='', sex='', affiliation='', country='', city=''):
>     headers = {
>         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36",
>     }
>     if sex == '':
>         d = gender.Detector(case_sensitive=False)
>         first = name.split(" ")[0]
>         guessed_gender = d.get_gender(first)
>         if "male" == guessed_gender or "female" == guessed_gender:
>             sex = guessed_gender
>     
>     queries = generate_queries(name, affiliation, country, city)
> 
>     all_links = {}
>     for query in queries:
>         html = requests.get("https://www.google.com/search?q=" + query + "+person&tbm=isch&hl=en&gl=us", headers=headers)
>         soup = BeautifulSoup(html.text, "lxml")
>         all_script_tags = soup.select("script")
> 
>         matched_images_data = "".join(re.findall(r"AF_initDataCallback\(([^<]+)\);", str(all_script_tags)))
>         matched_images_data_fix = json.dumps(matched_images_data)
>         matched_images_data_json = json.loads(matched_images_data_fix)
>         matched_google_image_data = re.findall(r'\"b-GRID_STATE0\"(.*)sideChannel:\s?{}}', matched_images_data_json)
>         matched_google_images_thumbnails = ", ".join(
>             re.findall(r'\[\"(https\:\/\/encry#sortpted-tbn0\.gstatic\.com\/images\?.*?)\",\d+,\d+\]',
>                        str(matched_google_image_data))).split(", ")
>         removed_matched_google_images_thumbnails = re.sub(
>             r'\[\"(https\:\/\/encrypted-tbn0\.gstatic\.com\/images\?.*?)\",\d+,\d+\]', "", str(matched_google_image_data))
>         matched_google_full_resolution_images = re.findall(r"(?:'|,),\[\"(https:|http.*?)\",\d+,\d+\]", removed_matched_google_images_thumbnails)[:limit]
> 
>         full_res_images = [
>             bytes(bytes(img, "ascii").decode("unicode-escape"), "ascii").decode("unicode-escape") for img in
>             matched_google_full_resolution_images
>         ]
>         
>         all_links[query] = full_res_images
>     return all_links

# Face Prediction Code
**Download deploy_gender.prototxt, gender_net.caffemodel, deploy.prototxt.txt, and res10_300x300_ssd_iter_140000_fp16.caffemodel and change GENDER_MODEL, GENDER_PROTO, FACE_PROTO, and FACE_MODEL to the respective file destinations**

deploy_gender.prototxt: [https://drive.google.com/file/d/1AW3WduLk1haTVAxHOkVS_BEzel1WXQHP/view](https://drive.google.com/file/d/1AW3WduLk1haTVAxHOkVS_BEzel1WXQHP/view)

gender_net.caffemodel: [https://drive.google.com/file/d/1W_moLzMlGiELyPxWiYQJ9KFaXroQ_NFQ/view](https://drive.google.com/file/d/1W_moLzMlGiELyPxWiYQJ9KFaXroQ_NFQ/view)

deploy.prototxt.txt: [https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy.prototxt](https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy.prototxt)

res10_300x300_ssd_iter_140000_fp16.caffemodel: [https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel](https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel)

> faceProto = "/Users/jdk23/Downloads/deploy.prototxt (1).txt"
> faceModel = "/Users/jdk23/Downloads/res10_300x300_ssd_iter_140000_fp16.caffemodel"
> genderProto = '/Users/jdk23/Downloads/gender_net.caffemodel'
> genderModel = '/Users/jdk23/Downloads/deploy_gender.prototxt'
> 
> 
> faceNet = cv2.dnn.readNet(faceModel, faceProto)
> genderNet = cv2.dnn.readNet(genderModel, genderProto)
> 
> MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
> genderList = ['Male', 'Female']
> padding = 20
> 
> 
> def faceBox(faceNet, frames):
>     frameHeight = frames.shape[0]
>     frameWidth = frames.shape[1]
>     blob = cv2.dnn.blobFromImage(frames, 1.0, (300, 300), [104, 117, 123], swapRB=False)
>     faceNet.setInput(blob)
>     detection = faceNet.forward()
>     bboxs = []
>     for i in range(detection.shape[2]):
>         confidence = detection[0, 0, i, 2]
>         if confidence > 0.7:
>             x1 = int(detection[0, 0, i, 3] * frameWidth)
>             y1 = int(detection[0, 0, i, 4] * frameHeight)
>             x2 = int(detection[0, 0, i, 5] * frameWidth)
>             y2 = int(detection[0, 0, i, 6] * frameHeight)
>             bboxs.append([x1, y1, x2, y2])
>             cv2.rectangle(frames, (x1, y1), (x2, y2), (0, 255, 0), 1)
>     return frames, bboxs
> 
> 
> def predict_gender(image_url):
>     opener = urllib.request.build_opener()
>     opener.addheaders = [
>         ('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36')
>     ]
>     urllib.request.install_opener(opener)
>     try:
>         req = urllib.request.urlopen(image_url)
>         arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
>         image = cv2.imdecode(arr, -1)
>     except Exception as e:
>         #print("Error occurred while reading the image from URL:", str(e))
>         return "delete"
> 
>     # Detect faces in the image
>     try:
>         face_locations = face_recognition.face_locations(image)
>         face_encodings = face_recognition.face_encodings(image, face_locations)
>     except Exception as e:
>         print("Error occurred while reading the image from URL:", str(e))
>         return "delete"
> 
>     genders = []
> 
>     for face_location, face_encoding in zip(face_locations, face_encodings):
>         # Extract face region from the image
>         top, right, bottom, left = face_location
>         face = image[top:bottom, left:right]
> 
>         # Perform gender prediction
>         blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)
>         genderNet.setInput(blob)
>         genderPreds = genderNet.forward()
>         gender = genderList[genderPreds[0].argmax()]
>         confidence = genderPreds[0][genderPreds[0].argmax()]
> 
>         genders.append((gender, confidence))
> 
>         label = f"{gender}, {confidence:.2f}"
>         cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
>         cv2.putText(image, label, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
> 
>     if len(genders) == 1:
>         return genders[0][0] + ": " + str(genders[0][1])
>     else:
>         return "delete"


In the end, the following columns should be added to the csv: Guessed_Gender (based off of first name), Image (the first image url of the best search query for each observation), Image Result (the gender prediction based off of the first image url of the best search query for each observation), Images (the rest of the images in the best search query), Gender Match (if Guessed_Gender and Image Result match), and #img (to display the best image in the SuAVE visualization)

# Creating SuAVE Visualization

To produce the SuAVE visualization, do these steps:

1. Choose upload CSV and upload the updated CSV
2. Title your SuAVE visualization
3. Instead of creating an empty repository, upload the images you downloaded (the order your upload the images does not matter)
   - Alternatively, upload your images to [dzgen.sdsc.edu/upload](dzgen.sdsc.edu/upload); enter your email, select the images to upload, and select stire in file server. Then, click upload. Wait until it sends a link to your email, and copy that link under the upload your images via link option.

Now you will have a SuAVE visualization with images. Be sure to manually check some images to assure validaity and scan over images to make sure there are no wacky images.
