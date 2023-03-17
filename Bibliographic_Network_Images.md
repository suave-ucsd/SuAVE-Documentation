---
title: Generating Images for SuAVE Bibliographic Network
parent: SuAVE Bibliographic Network
nav_order: 7

---

# Generating Images for SuAVE Bibliographic Network

The following code will generate images based on search queries that are constructed from the values in the dataset.

**Run code as is unless specified to change something**.

**Use a VPN to run this code. UCSD offers a VPN if you do not possess one.**

Note: The only liberty you should take is balancing limit of number images generated per query and time to execute. If you are not as many valid results as desired (no valid images generated for some people), increase the image generation per query limit. Keep in mind this greatly impacts runtime for large datasets. Start at a limit of 2 and increase as needed.

**The only other things you should change are csv_file, download_dir, GENDER_MODEL, GENDER_PROTO, FACE_PROTO, and FACE_MODEL variables.**

# Collect Images From Google

>     #format: "/directory/file.csv"
>     csv_file = "/Users/joeykaminsky/Downloads/test 5 csv - Sheet1-2.csv"
>     
>     #format: "/directory/"
>     download_dir = "/Users/joeykaminsky/Downloads/"
>     
>     
>     import urllib.request
>     import urllib
>     import re
>     import ssl
>     import itertools
>     import gender_guesser.detector as gender
>     import csv
>     import html
>     import os
>     import requests
>     from bs4 import BeautifulSoup
>     
>     def generate_queries(name, sex, affiliation, country, city):
>             args = [name, sex, affiliation, country, city]
>             combinations = []
>             for i in range(2, len(args) + 1):
>                 comb = list(itertools.combinations(args, i))
>                 for c in comb:
>                     if c[0] == name and "" not in c and "Unknown" not in c:
>                         combinations.append(list(c))
>             final_combinations = []
>             final_combinations.append(name)
>             for combo in combinations:
>                 new_combo = ' '.join(combo)
>                 final_combinations.append(new_combo)
>             return final_combinations
>     
>     def get_image_urls(limit, name = '', sex = '', affiliation = '', country = '', city = ''):
>         if sex == '':
>             d = gender.Detector(case_sensitive=False)
>             first = name.split(" ")[0]
>             guessed_gender = d.get_gender(first)
>             if "male" == guessed_gender or "female" == guessed_gender:
>                 sex = guessed_gender
>         
>         queries = generate_queries(name, sex, affiliation, country, city)
>         
>         all_links = {}
>         for query in queries:
>     
>             search_url = "https://www.google.com/search?q=" + query + "&tbm=isch"
>             response = requests.get(search_url)
>             soup = BeautifulSoup(response.text, "html.parser")
>     
>             # Find all the images on the page
>             images = soup.find_all("img")
>     
>             # Extract the URLs of the first limit images
>             urls = [image["src"] for image in images[1:limit+1]] 
>             all_links[query] = urls
>             
>         return all_links
>     
>     
>     def add_column_to_csv(filename, column_name, data):
>         # Read the existing CSV file into memory
>         rows = []
>         with open(filename, 'r') as file:
>             reader = csv.reader(file)
>             headers = next(reader)
>             headers.append(column_name)
>             rows.append(headers)
>             for row in reader:
>                 row.append(data.pop(0))
>                 rows.append(row)
>     
>         # Write the updated data back to the CSV file
>         with open(filename, 'w', newline='') as file:
>             writer = csv.writer(file)
>             for row in rows:
>                 writer.writerow(row)

# Face Gender Recognition

**Download deploy_gender.prototxt, gender_net.caffemodel, deploy.prototxt.txt, and res10_300x300_ssd_iter_140000_fp16.caffemodel and change GENDER_MODEL, GENDER_PROTO, FACE_PROTO, and FACE_MODEL to the respective file destinations (lines 7, 10, 17, and 19)**

deploy_gender.prototxt: [https://drive.google.com/file/d/1AW3WduLk1haTVAxHOkVS_BEzel1WXQHP/view](https://drive.google.com/file/d/1AW3WduLk1haTVAxHOkVS_BEzel1WXQHP/view)

gender_net.caffemodel: [https://drive.google.com/file/d/1W_moLzMlGiELyPxWiYQJ9KFaXroQ_NFQ/view](https://drive.google.com/file/d/1W_moLzMlGiELyPxWiYQJ9KFaXroQ_NFQ/view)

deploy.prototxt.txt: [https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy.prototxt](https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy.prototxt)

res10_300x300_ssd_iter_140000_fp16.caffemodel: [https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel](https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel)

>     # Import Libraries
>     import cv2
>     import numpy as np
>     
>     # The gender model architecture
>     # https://drive.google.com/open?id=1W_moLzMlGiELyPxWiYQJ9KFaXroQ_NFQ
>     GENDER_MODEL = '/Users/joeykaminsky/Downloads/weights/deploy_gender.prototxt'
>     # The gender model pre-trained weights
>     # https://drive.google.com/open?id=1AW3WduLk1haTVAxHOkVS_BEzel1WXQHP
>     GENDER_PROTO = '/Users/joeykaminsky/Downloads/weights/gender_net.caffemodel'
>     # Each Caffe Model impose the shape of the input image also image preprocessing is required like mean
>     # substraction to eliminate the effect of illunination changes
>     MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
>     # Represent the gender classes
>     GENDER_LIST = ['Male', 'Female']
>     # https://raw.githubusercontent.com/opencv/opencv/master/samples/dnn/face_detector/deploy.prototxt
>     FACE_PROTO = "/Users/joeykaminsky/Downloads/weights/deploy.prototxt.txt"
>     # https://raw.githubusercontent.com/opencv/opencv_3rdparty/dnn_samples_face_detector_20180205_fp16/res10_300x300_ssd_iter_140000_fp16.caffemodel
>     FACE_MODEL = "/Users/joeykaminsky/Downloads/weights/res10_300x300_ssd_iter_140000_fp16.caffemodel"
>     
>     # load face Caffe model
>     face_net = cv2.dnn.readNetFromCaffe(FACE_PROTO, FACE_MODEL)
>     # Load gender prediction model
>     gender_net = cv2.dnn.readNetFromCaffe(GENDER_MODEL, GENDER_PROTO)
>     
>     def get_faces(frame, confidence_threshold=0.5):
>         # convert the frame into a blob to be ready for NN input
>         blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104, 177.0, 123.0))
>         # set the image as input to the NN
>         face_net.setInput(blob)
>         # perform inference and get predictions
>         output = np.squeeze(face_net.forward())
>         # initialize the result list
>         faces = []
>         # Loop over the faces detected
>         for i in range(output.shape[0]):
>             confidence = output[i, 2]
>             if confidence > confidence_threshold:
>                 box = output[i, 3:7] * \
>                     np.array([frame.shape[1], frame.shape[0],
>                              frame.shape[1], frame.shape[0]])
>                 # convert to integers
>                 start_x, start_y, end_x, end_y = box.astype(np.int32)
>                 # widen the box a little
>                 start_x, start_y, end_x, end_y = start_x - \
>                     10, start_y - 10, end_x + 10, end_y + 10
>                 start_x = 0 if start_x < 0 else start_x
>                 start_y = 0 if start_y < 0 else start_y
>                 end_x = 0 if end_x < 0 else end_x
>                 end_y = 0 if end_y < 0 else end_y
>                 # append to our list
>                 faces.append((start_x, start_y, end_x, end_y))
>         return faces
>     
>     def display_img(title, img):
>         """Displays an image on screen and maintains the output until the user presses a key"""
>         # Display Image on screen
>         cv2.imshow(title, img)
>         # Mantain output until user presses a key
>         cv2.waitKey(0)
>         # Destroy windows when user presses a key
>         cv2.destroyAllWindows()
>         
>     def get_optimal_font_scale(text, width):
>         """Determine the optimal font scale based on the hosting frame width"""
>         for scale in reversed(range(0, 60, 1)):
>             textSize = cv2.getTextSize(text, fontFace=cv2.FONT_HERSHEY_DUPLEX, fontScale=scale/10, thickness=1)
>             new_width = textSize[0][0]
>             if (new_width <= width):
>                 return scale/10
>         return 1
>     
>     # from: https://stackoverflow.com/questions/44650888/resize-an-image-without-distortion-opencv
>     def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
>         # initialize the dimensions of the image to be resized and
>         # grab the image size
>         dim = None
>         (h, w) = image.shape[:2]
>         # if both the width and height are None, then return the
>         # original image
>         if width is None and height is None:
>             return image
>         # check to see if the width is None
>         if width is None:
>             # calculate the ratio of the height and construct the
>             # dimensions
>             r = height / float(h)
>             dim = (int(w * r), height)
>         # otherwise, the height is None
>         else:
>             # calculate the ratio of the width and construct the
>             # dimensions
>             r = width / float(w)
>             dim = (width, int(h * r))
>         # resize the image
>         return cv2.resize(image, dim, interpolation = inter)
>     
>     import urllib.request
>     
>     def predict_gender(input_url: str):
>         """Predict the gender of the faces showing in the image"""
>         try:
>             # Read Input Image from URL
>             with urllib.request.urlopen(input_url) as url:
>                 s = url.read()
>             img = np.array(bytearray(s), dtype=np.uint8)
>             img = cv2.imdecode(img, cv2.IMREAD_COLOR)
>     
>             # resize the image, uncomment if you want to resize the image
>             # img = cv2.resize(img, (frame_width, frame_height))
>             # Take a copy of the initial image and resize it
>             frame = img.copy()
>             ######if frame.shape[1] > frame_width:
>                 #####frame = image_resize(frame, width=frame_width)
>             # predict the faces
>             faces = get_faces(frame)
>             # Loop over the faces detected
>             # for idx, face in enumerate(faces):
>             labels = []
>             for i, (start_x, start_y, end_x, end_y) in enumerate(faces):
>                 face_img = frame[start_y: end_y, start_x: end_x]
>                 # image --> Input image to preprocess before passing it through our dnn for classification.
>                 # scale factor = After performing mean substraction we can optionally scale the image by some factor. (if 1 -> no scaling)
>                 # size = The spatial size that the CNN expects. Options are = (224*224, 227*227 or 299*299)
>                 # mean = mean substraction values to be substracted from every channel of the image.
>                 # swapRB=OpenCV assumes images in BGR whereas the mean is supplied in RGB. To resolve this we set swapRB to True.
>                 blob = cv2.dnn.blobFromImage(image=face_img, scalefactor=1.0, size=(
>                     227, 227), mean=MODEL_MEAN_VALUES, swapRB=False, crop=False)
>                 # Predict Gender
>                 gender_net.setInput(blob)
>                 gender_preds = gender_net.forward()
>                 i = gender_preds[0].argmax()
>                 gender = GENDER_LIST[i]
>                 gender_confidence_score = gender_preds[0][i]
>                 # Draw the box
>                 label = "{}-{:.2f}%".format(gender, gender_confidence_score*100)
>                 print(label)
>                 labels.append(label)
>                 yPos = start_y - 15
>                 while yPos < 15:
>                     yPos += 15
>                 # get the font scale for this image size
>                 optimal_font_scale = get_optimal_font_scale(label,((end_x-start_x)+25))
>                 box_color = (255, 0, 0) if gender == "Male" else (147, 20, 255)
>                 cv2.rectangle(frame, (start_x, start_y), (end_x, end_y), box_color, 2)
>                 # Label processed image
>                 cv2.putText(frame, label, (start_x, yPos),
>                             cv2.FONT_HERSHEY_SIMPLEX, optimal_font_scale, box_color, 2)
>             # Display processed image
>             #display_img("Gender Estimator", frame)
>             # uncomment if you want to save the image
>             # cv2.imwrite("output.jpg", frame)
>             # Cleanup
>             cv2.destroyAllWindows()
>             if len(labels) == 1:
>                 return labels[0]
>             else:
>                 return "delete"
>         except urllib.error.HTTPError as e:
>             print("HTTPError")
>         except Exception as e:
>             if 'ssize.empty() in function' in str(e):
>                 print("Resize error")
>     
>     # Disable SSL image certificate verification
>     ssl._create_default_https_context = ssl._create_unverified_context

Some general functions

>     def extract_numbers_and_periods(string):
>         numbers_and_periods = re.findall(r"[\d.]+", string)
>         return "".join(numbers_and_periods)
>     def max_value(dictionary):
>         if dictionary == {}:
>             return {"No pics found": ""}
>         max_key = max(dictionary, key=dictionary.get)
>         max_value = dictionary[max_key]
>         return max_key, max_value

# Image Generation (#22-#88), Gender Prediction per Image (removes images with duplicate faces or no faces) (#91 - #119), Gender Comparison to Predicted (no comparisons if gender was not male or female) (#122-#150), Determine Which Results are the Best (based on numer of valid images and the average gender prediction confidence level) (#153 - #180).

Change the limit on line #6 to the number of pictures you want per query (recommendation is 2). Make sure the csv has the following columns: Name, Affiliation, Country, and City (you may need to make minor changes so they match up in lines #33 through #44 as they are in the CSV file).

For the Image Gender Prediction (#91 - #119) here are some pointers at looking at the output of the code cell. An image is filtered out if there are multiple faces in the image (2+ gender guesses for the image), if there is a Resize error, HTTPError error, or the image has no faces (0 gender guesses for the image)

**IMPORTANT disclaimer**: this code may take a while to finish. If you are in a time crunch, lower the limit (for 2 images per query, the code takes 2-10 seconds per person). Once you finish this code, if you do not have time to run the image gender identifier, save names and dict_collection as json files so you do not lose them.

>     import csv
>     import time
>     import requests
>     
>     
>     limit = 2
>     
>     
>     predicted_genders = []
>     
>     final_results = []
>     final_img_predictions = []
>     to_redo = []
>     
>     with open(csv_file, 'r') as file:
>         reader = csv.reader(file)
>         num_rows = len(list(reader))
>     
>     names = []    
>     def process_data(csv_file, start_index, end_index, counter):
>         errors = []
>         inner_count = 0
>         dict_collection = []
>         d = gender.Detector(case_sensitive=False)
>         with open(csv_file, 'r') as file:
>             query_dict = {}
>             reader = csv.DictReader(file)
>             for i, row in enumerate(reader):
>                 if i < start_index:
>                     continue
>                 if i >= end_index:
>                     break
>                 ###
>                 #operates that these are the names of columns
>                 name = row["Name"]
>                 name = html.unescape(name)
>                 names.append(name)
>                 print(F"{counter}: {name}")
>                 affiliation = row["Affiliation#sortquan"]
>                 affiliation = html.unescape(affiliation)
>                 country = row["Country#sortquan"]
>                 country = html.unescape(country)
>                 city = row["City#sortquan"]
>                 city = html.unescape(city)
>                 ###
>                 predicted_genders.append(d.get_gender(name.split(" ")[0]))
>                 try:
>                     imgs = get_image_urls(limit, name=name, affiliation=affiliation, country=country, city=city)
>                     dict_collection.append(imgs)
>                     ##
>                     total_length = 0
>                     for lst in imgs.values():
>                         total_length += len(lst)
>                     if total_length == 0 and inner_count not in errors:
>                         errors.append({inner_count:[name, affiliation, country, city, counter]})
>                     ##
>                 except requests.exceptions.ReadTimeout as e:
>                     print(f"Request timed out for row {i}. Skipping.")
>                     dict_collection.append({name: []})
>                     errors.append({inner_count:[name, affiliation, country, city, counter]})
>                 if counter % 250 == 0 and counter != 0:
>                     print(f"Processed {counter} rows. Pausing for 3 minutes...")
>                     time.sleep(180)
>                 counter += 1
>                 inner_count += 1
>         print(dict_collection)   
>         for error in errors:
>             try:
>                 name = list(error.values())[0][0]
>                 affiliation = list(error.values())[0][1]
>                 country = list(error.values())[0][2]
>                 city = list(error.values())[0][3]
>                 ovr_index = list(error.values())[0][4]
>                 
>                 print(F"Redo for: {name}")
>     
>                 imgs = get_image_urls(limit, name=name, affiliation=affiliation, country=country, city=city)
>                 dict_collection[list(error.keys())[0]] = imgs
>                 
>                 total_length = 0
>                 for lst in imgs.values():
>                     total_length += len(lst)
>                 if total_length == 0:
>                     to_redo.append({ovr_index:[name, affiliation, country, city]})
>     
>             except requests.exceptions.ReadTimeout as e:
>                 print(f"Request timed out for {name}. Skipping.")
>         
>             
>             
>         img_results = []        
>         first_iteration = True
>         for image_dict in dict_collection:
>             to_add = {}
>             for search, images in image_dict.items():
>                 if first_iteration:
>                     first_iteration = False
>                 else:
>                     print("\n")
>                 print(F"Search: {search}\n")
>                 search_result = []
>                 to_delete = []
>                 #number pictures
>                 count = 1
>                 for index in range(len(images)):
>                     ##remove images with multiple/no faces
>                     print(F"Image {count}")
>                     gender_guess = predict_gender(images[index])
>                     count += 1
>                     #removes unwanted photos from list - ones with too many faces, no faces, or raises an error in the code
>                     if gender_guess == "delete" or gender_guess == None:
>                         to_delete.append(index)
>                     else:
>                         search_result.append(gender_guess)
>                 for index in reversed(to_delete):
>                     #use dict_collection so that you can add images
>                     image_dict[search].remove(images[index])
>                 to_add[search] = search_result
>             img_results.append(to_add)
>         
>         
>         index_count = 0
>         sex = ""
>         for image_dictionary in img_results:
>             for key in image_dictionary.keys():
>                 if 'female' in key:
>                     sex = 'female'
>                 elif 'male' in key and 'female' not in key:
>                     sex = 'male'
>     
>             filtered_dict = {}
>             for k, v in image_dictionary.items():
>                 to_remove = []
>                 filtered_list = []
>                 for i in v:
>                     if sex != "" and sex == 'male' and "Female" not in i:
>                         filtered_list.append(i)
>                     elif sex != "" and sex == 'female' and "Male" not in i:
>                         filtered_list.append(i)
>                     elif sex != "":
>                         to_remove.append(v.index(i))
>                 reversed_remove = reversed(to_remove)
>                 for index in reversed_remove:
>                     #removes misclassified images from dict_collection
>                     dict_collection[index_count][k].pop(index)
>                     image_dictionary[k].pop(index)
>     
>                 filtered_dict[k] = filtered_list
>             image_dictionary = filtered_dict
>             index_count += 1
>             
>             
>         idx_ct = 0
>         for image_dict in img_results:
>             if image_dict == {}:
>                 final_results.append({"none":[]})
>                 final_img_predictions.append({"none":[]})
>                 idx_ct += 1
>                 continue
>             fin_results = {}
>             for key, results in image_dict.items():
>                 if len(results) != 0:
>                     img_pctg = len(results) / limit
>                     avg_rating = 0
>                     for result in results:             
>                         avg_rating += float(extract_numbers_and_periods(result))
>                     avg_rating = (avg_rating / len(results)) / 100
>                     fin_results[key] = (avg_rating * 0.5) + (0.5 * img_pctg)
>                 else:
>                     fin_results[key] = 0
>     
>             best = image_dict[max_value(fin_results)[0]]
>             best_search = max_value(fin_results)[0]
>             print(best_search)
>             to_add = {}
>             to_add_2 = {}
>             to_add[best_search] = dict_collection[idx_ct][best_search]
>             to_add_2[best_search] = best
>             final_results.append(to_add)
>             final_img_predictions.append(to_add_2)
>             idx_ct += 1    
>             
>         return counter
>                     
>     
>     ####
>     start_index = 0
>     end_index = 100
>     counter = 0
>     while start_index <= num_rows:
>         counter = process_data(csv_file, start_index, end_index, counter)
>         start_index += 100
>         end_index += 100
>     ####
>     
>     add_column_to_csv(csv_file, "Guessed_Gender", predicted_genders)

# Add Image URLs and Gender Prediction Based on Best Images to CSV

>     first_urls = []
>     first_img_result = []
>     rest_urls = []
>     # Iterate through the list of dictionaries
>     count = 0
>     for image_dictionary in final_results:
>         for key, values in image_dictionary.items():
>             # Check if there are URLs for this key
>             if len(values) > 0:
>                 # Add the first URL to the first_urls list
>                 first_urls.append(values[0])
>                 ###
>                 first_img_result.append(final_img_predictions[count][key][0])
>                 ###
>                 # Add the rest of the URLs to the rest_urls list
>             else: 
>                 first_urls.append("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08w3j9UMPcMqpu55Q-sQAJGXRwJ-20KEJfwiAyrcMjuO1NW5MhJ2otwqIejs&s")
>                 first_img_result.append("")
>             if len(values) > 1:
>                 rest_urls.append(", ".join(values[1:]))
>             else:
>                 # Add "" to both lists if there are no URLs
>                 rest_urls.append("")
>             count += 1
>     
>     def download_image(url, directory):
>         response = requests.get(url)
>         if response.status_code == 200:
>             filename = os.path.basename(url)
>             filepath = os.path.join(directory, filename)
>             with open(filepath, 'wb') as f:
>                 f.write(response.content)
>             print(f"Downloaded {filename} successfully!")
>         else:
>             print("Failed to download image")
>             
>             
>     add_column_to_csv(csv_file, "Image", first_urls)
>     add_column_to_csv(csv_file, "Image Result", first_img_result)
>     add_column_to_csv(csv_file, "Images", rest_urls)

# Gender Predictions Comparison Column

If both the gender prediction based on the first image of the best search query and the gender prediction based on first name match, "Match" is returned. If not, "Do not match" is returned. If the gender prediction for the first name or image either or both do not make a desired prediction (male or female), "Not Applicable" is returned.

>     names = []
>     with open(csv_file, 'r') as file:
>         d = gender.Detector(case_sensitive=False)
>         reader = csv.DictReader(file)
>         for i, row in enumerate(reader):
>             #operates that these are the names of columns
>             name = row["Name"]
>             name = html.unescape(name)
>             names.append(name)
>             
>             
>     first_img_result = []
>     count = 0
>     for image_dictionary in final_results:
>         for key, values in image_dictionary.items():
>             # Check if there are URLs for this key
>             if len(values) > 0:
>                 # Add the first URL to the first_urls list
>                 first_img_result.append(final_img_predictions[count][key][0])
>                 ###
>                 # Add the rest of the URLs to the rest_urls list
>             else: 
>                 first_img_result.append("")
>             count += 1
>     d = gender.Detector(case_sensitive=False)        
>     predict_genders = []
>     for name in names:
>         predict_genders.append(d.get_gender(name.split(" ")[0]))
>     
>     
>     matches = []
>     for i in range(counter):
>         if "Male" in first_img_result[i]:
>             if "female" in predict_genders[i].lower():
>                 matches.append("Do not match")
>             elif "male" in predict_genders[i].lower():
>                 matches.append("Match")
>             else:
>                 matches.append("Not Applicable")
>         elif "Female" in first_img_result[i]:
>             if "female" in predict_genders[i].lower():
>                 matches.append("Match")
>             elif "male" in predict_genders[i].lower():
>                 matches.append("Do not match")
>             else:
>                 matches.append("Not Applicable")
>         else:
>             matches.append("Not Applicable")
>     add_column_to_csv(csv_file, "Gender Match", matches)

# Display image for SuAVE

**Create a new folder to store the images for organizaitonal purposes** 

>     def keep_allowed_chars(input_string):
>         pattern = r'[^a-zA-Z0-9_\-\.]'  # pattern to match non-allowed chars
>         return re.sub(pattern, '', input_string)
>     
>     image_info = []
>     
>     with open(csv_file, 'r') as file:
>     
>         # create a CSV reader object
>         csv_reader = csv.reader(file)
>     
>         # read in the values in the "Image" column
>         header = next(csv_reader)
>         image_col_index = header.index('Image')
>         name_col_index = header.index('Name')
>         for row in csv_reader:
>             to_add = {}
>             if row[image_col_index] == "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08w3j9UMPcMqpu55Q-sQAJGXRwJ-20KEJfwiAyrcMjuO1NW5MhJ2otwqIejs&s":
>                 to_add['url'] = ""
>             else:
>                 to_add['url'] = row[image_col_index]
>             name = row[name_col_index].replace(" ", "")
>             name = name.replace(".", "")
>             name = keep_allowed_chars(name)
>             to_add['filename'] = name
>             
>             image_info.append(to_add)
>         
>     column_name = '#img'
>     if not os.path.exists(download_dir):
>         os.makedirs(download_dir)
>     
>     # Download images and save to directory
>     file_paths = []
>     nofilename = os.path.join(download_dir, "NoImageAvailable.jpg")
>     noresponse = requests.get("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08w3j9UMPcMqpu55Q-sQAJGXRwJ-20KEJfwiAyrcMjuO1NW5MhJ2otwqIejs&s")
>     with open(nofilename, 'wb') as f:
>         f.write(noresponse.content)
>         file_paths.append(os.path.abspath(nofilename))
>         
>     for info in image_info:
>         url = info['url']
>         if url == "":
>             continue
>         filename = os.path.join(download_dir, f"{info['filename']}.jpg")
>         response = requests.get(url)
>         with open(filename, 'wb') as f:
>             f.write(response.content)
>         file_paths.append(os.path.abspath(filename))
>     
>     # Append image information to CSV file
>     add_to_csv = []
>     for i in image_info:
>         if i['url'] == "":
>             add_to_csv.append("NoImageAvailable")
>         else:
>             add_to_csv.append(i['filename'])
>     add_column_to_csv(csv_file, column_name, add_to_csv)

In the end, the following columns should be added to the csv: Guessed_Gender (based off of first name), Image (the first image url of the best search query for each observation), Image Result (the gender prediction based off of the first image url of the best search query for each observation), Images (the rest of the images in the best search query), Gender Match (if Guessed_Gender and Image Result match), and #img (to display the best image in the SuAVE visualization)

# Creating SuAVE Visualization

To produce the SuAVE visualization, do these steps:

1. Choose upload CSV and upload the updated CSV
2. Title your SuAVE visualization
3. Instead of creating an empty repository, upload the images you downloaded (the order your upload the images does not matter)

Now you will have a SuAVE visualization with images. Be sure to manually check some images to assure validaity and scan over images to make sure there are no wacky images.
