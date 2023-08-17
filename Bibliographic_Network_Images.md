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


# Collect Images From Google

import face_recognition
import urllib.request
import urllib
import re
import ssl
import itertools
import gender_guesser.detector as gender
import csv
import html
import os
import requests
from bs4 import BeautifulSoup
from PIL import Image
import json
import time
import io
from PIL import Image
import cv2
import numpy as np
import lxml


In the end, the following columns should be added to the csv: Guessed_Gender (based off of first name), Image (the first image url of the best search query for each observation), Image Result (the gender prediction based off of the first image url of the best search query for each observation), Images (the rest of the images in the best search query), Gender Match (if Guessed_Gender and Image Result match), and #img (to display the best image in the SuAVE visualization)

# Creating SuAVE Visualization

To produce the SuAVE visualization, do these steps:

1. Choose upload CSV and upload the updated CSV
2. Title your SuAVE visualization
3. Instead of creating an empty repository, upload the images you downloaded (the order your upload the images does not matter)
   - Alternatively, upload your images to [dzgen.sdsc.edu/upload](dzgen.sdsc.edu/upload); enter your email, select the images to upload, and select stire in file server. Then, click upload. Wait until it sends a link to your email, and copy that link under the upload your images via link option.

Now you will have a SuAVE visualization with images. Be sure to manually check some images to assure validaity and scan over images to make sure there are no wacky images.
