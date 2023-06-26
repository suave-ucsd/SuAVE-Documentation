---
title: Generating Images for SuAVE Bibliographic Network
parent: SuAVE Bibliographic Network
nav_order: 7

---

# Generating Images for SuAVE Bibliographic Network

The following code will generate images based on search queries that are constructed from the variables "Name", "Affiliation", "City", and "Country" in the dataset.

**Run code as is unless specified to change something**.

**Use a VPN to run this code. I reccomend ProtonVPN**

Note: The only liberty you should take is balancing limit of number images generated per query and time to execute. If you are not as many valid results as desired (no valid images generated for some people), increase the image generation per query limit. Keep in mind this greatly impacts runtime for large datasets. Start at a limit of 2 and increase as needed.

**The only other things you should change are csv_file, download_dir, GENDER_MODEL, GENDER_PROTO, FACE_PROTO, and FACE_MODEL variables.**

# Collect Images From Google

>     #format: "/directory/file.csv"
>     csv_file = ""
>     
>     #format: "/directory/"
>     download_dir = ""
>
>     name_col = 'Name'
>     affiliation_col = 'Affiliation#sortquan'
>     city_col = 'City#sortquan'
>     country_col = 'Country#sortquan'
>     
>     
>     import face_recognition
>     import urllib.request
>     import urllib
>     import re
>     import lxml
>     import ssl
>     import itertools
>     import gender_guesser.detector as gender
>     import csv
>     import html
>     import requests
>     from bs4 import BeautifulSoup
>     import time
>     import os
>     import io
>     from PIL import Image
>     import json
>     import time
>     import scrapy
>     import cv2
>     import numpy as np
> 
>      def generate_queries(name, affiliation, country, city):
>          args = [name, affiliation, country, city]
>          combinations = []
>          for i in range(2, len(args) + 1):
>              comb = list(itertools.combinations(args, i))
>              for c in comb:
>                  if c[0] == name and "" not in c and "Unknown" not in c:
>                      if city in c and country in c:
>                          continue
>                      combinations.append(list(c))
>          final_combinations = [name]
>          for combo in combinations:
>              new_combo = ' '.join(combo)
>              final_combinations.append(new_combo)
>          return final_combinations
>          
>      
>      def get_image_urls(limit, name = '', sex = '', affiliation = '', country = '', city = ''):
>          headers = {
>              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60     
>               Safari/537.36",
>          }
>          #Guess sex by name
>          if sex == '':
>              d = gender.Detector(case_sensitive=False)
>              first = name.split(" ")[0]
>              guessed_gender = d.get_gender(first)
>              if "male" == guessed_gender or "female" == guessed_gender:
>                  sex = guessed_gender
>          #Generate queries from code above
>          queries = generate_queries(name, affiliation, country, city)
>          #Scrape using bs4 and circumventing the encryption using this code
>          all_links = {}
>          for query in queries:
>              html = requests.get("https://www.google.com/search?q=" + query + "+person&tbm=isch&hl=en&gl=us", headers = headers)
>              soup = BeautifulSoup(html.text, "lxml")
>              all_script_tags = soup.select("script")
>
>              matched_images_data = "".join(re.findall(r"AF_initDataCallback\(([^<]+)\);", str(all_script_tags)))
>              matched_images_data_fix = json.dumps(matched_images_data)
>              matched_images_data_json = json.loads(matched_images_data_fix)
>              matched_google_image_data = re.findall(r'\"b-GRID_STATE0\"(.*)sideChannel:\s?{}}', matched_images_data_json)
>              matched_google_images_thumbnails = ", ".join(
>                  re.findall(r'\[\"(https\:\/\/encry#sortpted-tbn0\.gstatic\.com\/images\?.*?)\",\d+,\d+\]',
>                             str(matched_google_image_data))).split(", ")
>              removed_matched_google_images_thumbnails = re.sub(
>                  r'\[\"(https\:\/\/encrypted-tbn0\.gstatic\.com\/images\?.*?)\",\d+,\d+\]', "", str(matched_google_image_data))
>              matched_google_full_resolution_images = re.findall(r"(?:'|,),\[\"(https:|http.*?)\",\d+,\d+\]",           
>              removed_matched_google_images_thumbnails)[:limit]
>      
>              full_res_images = [
>                  bytes(bytes(img, "ascii").decode("unicode-escape"), "ascii").decode("unicode-escape") for img in
>                  matched_google_full_resolution_images
>              ]
>              
>              all_links[query] = full_res_images
>          return all_links
>         

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


>      def predict_gender(image_url):
>          #Takes an image url and returns the gender of people in the image with the confidence ratings of those predictions
>          #The code only returns predictions for valid images with only 1 person in the image; else "delete" is returned
>          opener = urllib.request.build_opener()
>          opener.addheaders = [
>              ('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 
>              Safari/537.36')
>          ]
>          urllib.request.install_opener(opener)
>          try:
>              req = urllib.request.urlopen(image_url)
>              arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
>              image = cv2.imdecode(arr, -1)
>          except Exception as e:
>              #print("Error occurred while reading the image from URL:", str(e))
>              return "delete"
>      
>          # Detect faces in the image
>          try:
>              face_locations = face_recognition.face_locations(image)
>              face_encodings = face_recognition.face_encodings(image, face_locations)
>          except Exception as e:
>              print("Error occurred while reading the image from URL:", str(e))
>              return "delete"
>      
>          genders = []
>      
>          for face_location, face_encoding in zip(face_locations, face_encodings):
>              # Extract face region from the image
>              top, right, bottom, left = face_location
>              face = image[top:bottom, left:right]
>      
>              # Perform gender prediction
>              blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)
>              genderNet.setInput(blob)
>              genderPreds = genderNet.forward()
>              gender = genderList[genderPreds[0].argmax()]
>              confidence = genderPreds[0][genderPreds[0].argmax()]
>      
>              genders.append((gender, confidence))
>      
>              label = f"{gender}, {confidence:.2f}"
>              cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 2)
>              cv2.putText(image, label, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
>      
>          if len(genders) == 1:
>                  return genders[0][0] + ": " + str(genders[0][1])
>          else:
>              return "delete"
>    # Disable SSL image certificate verification
>    ssl._create_default_https_context = ssl._create_unverified_context

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

**If the column names are not exactly "Name", "Affiliation#sortquan", "City#sortquan", and "Country#sortquan", you will need to make the needed fixes to lines #32-41. For example, if a column in your dataset is just "Country", change line #38 to  "Country".**

**IMPORTANT disclaimer**: this code may take a while to finish. If you are in a time crunch, lower the limit (for 2 images per query, the code takes 2-10 seconds per person). Once you finish this code, if you do not have time to run the image gender identifier, save names and dict_collection as json files so you do not lose them.

>      limit = 2
>    
>      predicted_genders = []
>    
>      final_results = []
>      final_img_predictions = []
>      to_redo = []
>    
>      with open(csv_file, 'r') as file:
>          reader = csv.reader(file)
>          num_rows = len(list(reader))
>    
>      names = []    
>      def process_data(csv_file, start_index, end_index, counter):
>          #Run the code above in chunks of 100 (or whatever you set the code to run at once
>          internal = []
>          print(F"{start_index}-{end_index}")
>          errors = []
>          inner_count = 0
>          dict_collection = []
>          d = gender.Detector(case_sensitive=False)
>          with open(csv_file, 'r') as file:
>              query_dict = {}
>              reader = csv.DictReader(file)
>              for i, row in enumerate(reader):
>                  if i < start_index:
>                      continue
>                  if i >= end_index:
>                      break
>                  ###
>                  #operates that these are the names of columns
>                  name = row[name_col]
>                  name = html.unescape(name)
>                  names.append(name)
>                  #print(F"{counter}: {name}")
>                  affiliation = row[affiliation_col]
>                  affiliation = html.unescape(affiliation)
>                  country = row[country_col]
>                  country = html.unescape(country)
>                  city = row[city_col]
>                  city = html.unescape(city)
>                  ###
>                  predicted_genders.append(d.get_gender(name.split(" ")[0]))
>                  #Print statement to keep track of progress
>                  if i % 25 == 0 and i != 0:
>                      print(i)
>                  try:
>                      imgs = get_image_urls(limit, name=name, affiliation=affiliation, country=country, city=city)
>                      dict_collection.append(imgs)
>                      ##
>                      total_length = 0
>                      for lst in imgs.values():
>                          total_length += len(lst)
>                      if total_length == 0 and inner_count not in errors:
>                          errors.append({inner_count:[name, affiliation, country, city, counter]})
>                      ##
>                  except requests.exceptions.ReadTimeout as e:
>                      print(f"Request timed out for row {i}. Skipping.")
>                      dict_collection.append({name: []})
>                      errors.append({inner_count:[name, affiliation, country, city, counter]})
>                  counter += 1
>                  inner_count += 1
>          #print(dict_collection) 
>          #print(F"# redos: {len(errors)}")
>          #For rows that had errors the first time; it is was something wacky that happened, the code should wrk here for the row
>          for error in errors:
>              try:
>                  name = list(error.values())[0][0]
>                  affiliation = list(error.values())[0][1]
>                  country = list(error.values())[0][2]
>                  city = list(error.values())[0][3]
>                  ovr_index = list(error.values())[0][4]
>                  
>                  print(F"Redo for: {name}")
>      
>                  imgs = get_image_urls(limit, name=name, affiliation=affiliation, country=country, city=city)
>                  dict_collection[list(error.keys())[0]] = imgs
>                  
>                  total_length = 0
>                  for lst in imgs.values():
>                      total_length += len(lst)
>                  if total_length == 0:
>                      to_redo.append({ovr_index:[name, affiliation, country, city]})
>      
>              except requests.exceptions.ReadTimeout as e:
>                  print(f"Request timed out for {name}. Skipping.")
>          #Guessing genders for each image url generated
>          print(F"Gender Guesses for {start_index}-{end_index}")    
>          ct_2 = 0    
>          img_results = []        
>          first_iteration = True
>          for image_dict in dict_collection:
>              if ct_2 % 25 == 0:
>                  print(ct_2)
>              ct_2 += 1
>              to_add = {}
>              for search, images in image_dict.items():
>                  if first_iteration:
>                      first_iteration = False
>                  else:
>                      print("\n")
>                  #print(F"Search: {search}\n")
>                  search_result = []
>                  to_delete = []
>                  #number pictures
>                  count = 1
>                  for index in range(len(images)):
>                      ##remove images with multiple/no faces
>                      #print(F"Image {count}")
>                      gender_guess = predict_gender(images[index])
>                      #print(gender_guess)
>                      count += 1
>                      #removes unwanted photos from list - ones with too many faces, no faces, or raises an error in the code
>                      if gender_guess == "delete" or gender_guess == None:
>                          to_delete.append(index)
>                      else:
>                          search_result.append(gender_guess)
>                  for index in reversed(to_delete):
>                      #use dict_collection so that you can add images
>                      image_dict[search].remove(images[index])
>                  to_add[search] = search_result
>              img_results.append(to_add)
>          
>          #print(img_results)
>          #based on information present, removes incorrectly gendered images
>          index_count = 0
> 
>          for image_dictionary in img_results:
>              sex = ""
>              for key in image_dictionary.keys():
>                  if 'female' in key:
>                      sex = 'female'
>                  elif 'male' in key and 'female' not in key:
>                      sex = 'male'
>      
>              filtered_dict = {}
>              for k, v in image_dictionary.items():
>                  to_remove = []
>                  filtered_list = []
>                  for i in v:
>                      if sex != "" and sex == 'male' and "Female" not in i:
>                          filtered_list.append(i)
>                      elif sex != "" and sex == 'female' and "Male" not in i:
>                          filtered_list.append(i)
>                      elif sex != "":
>                          to_remove.append(v.index(i))
>                  reversed_remove = reversed(to_remove)
>                  for index in reversed_remove:
>                      #removes misclassified images from dict_collection
>                      dict_collection[index_count][k].pop(index)
>                      image_dictionary[k].pop(index)
>      
>                  filtered_dict[k] = filtered_list
>              image_dictionary = filtered_dict
>              index_count += 1
>              
>          #Rank the search results    
>          idx_ct = 0
>          curr_results = []
>          for image_dict in img_results:
>              #print(image_dict)
>              if image_dict == {}:
>                  final_results.append({"none":[]})
>                  final_img_predictions.append({"none":[]})
>                  idx_ct += 1
>                  continue
>              fin_results = {}
>              for key, results in image_dict.items():
>                  if len(results) != 0:
>                      img_pctg = len(results) / limit
>                      avg_rating = 0
>                      for result in results:             
>                          avg_rating += float(extract_numbers_and_periods(result))
>                      avg_rating = (avg_rating / len(results)) / 100
>                      fin_results[key] = (avg_rating * 0.5) + (0.5 * img_pctg)
>                  else:
>                      fin_results[key] = 0
>      
>              best = image_dict[max_value(fin_results)[0]]
>              best_search = max_value(fin_results)[0]
>              #print(best_search)
>              to_add = {}
>              to_add_2 = {}
>              to_add[best_search] = dict_collection[idx_ct][best_search]
>              to_add_2[best_search] = best
>              final_results.append(to_add)
>              curr_results.append(to_add)
>              final_img_predictions.append(to_add_2)
>              idx_ct += 1    
>          print(curr_results)    
>          return counter
>                      
>      
>      ####
>      start = time.time()
>      start_index = 0
>      end_index = 100
>      counter = 0
>      while start_index <= num_rows:
>          counter = process_data(csv_file, start_index, end_index, counter)
>          start_index += 100
>          end_index += 100
>          time.sleep(60)
>      end = time.time()
>      ####
>      print(end - start)

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
>                 first_urls.append("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR08w3j9UMPcMqpu55Q-sQAJGXRwJ-
>                   20KEJfwiAyrcMjuO1NW5MhJ2otwqIejs&s")
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
   - Alternatively, upload your images to [dzgen.sdsc.edu/upload](dzgen.sdsc.edu/upload); enter your email, select the images to upload, and select stire in file server. Then, click upload. Wait until it sends a link to your email, and copy that link under the upload your images via link option.

Now you will have a SuAVE visualization with images. Be sure to manually check some images to assure validaity and scan over images to make sure there are no wacky images.
