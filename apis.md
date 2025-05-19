---
title: SuAVE APIs
nav_order: 8
---

# {{page.title}}

# **Suave API**

In the following requests, <server> may be suave-net.sdsc.edu.

# A. http get requests

| **Request**                                                  | **Format**                                                   | **Example**                                                  | **Note**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Getting a previously saved snapshot:                         | http://<server>/snapshot/<snapshotID>                        | [http://suave-dev.sdsc.edu/snapshot/57a3e5f3efba572faafdd526](http://suave.sdsc.edu:3001/snapshot/57a3e5f3efba572faafdd526) | Returns web page                                             |
| Public view of a personal survey gallery                     | http://<server>/gallery/<username>                           | [http://suave-dev.sdsc.edu/gallery/zaslavsk](http://suave.sdsc.edu:3001/gallery/zaslavsk) | Returns web page                                             |
| Open SuAVE application                                       | [http:///main/file=&views=&view=](http://suave.sdsc.edu:3001/main/file=zaslavsk_GRSciColl.csv&views=111010&view=grid)<initialview> | [http://suave-dev.sdsc.edu/main/file=zaslavsk_GRSciColl.csv&views=1110101&view=grid](http://suave.sdsc.edu:3001/main/file=zaslavsk_GRSciColl.csv&views=111010&view=grid) In this case, “1110101” indicates that: “grid” view will be  shown; “bucket” view will be shown; “crosstab” view will be shown; “qca” view will not be shown; “map” view will be shown; “R” view will not be  shown; “Jupyter” view will be shown. | Opens SuAVE app for a specified dataset and views. SuAVE v2 has additional URL parameters described in the “Crowdsourcing” section. |
| Download survey data file                                    | http://[/getSurveys/](http://suave.sdsc.edu:3001/getSurveys/zaslavsk_GRSciColl-Collections.csv) | http://suave-dev.sdsc.edu/getSurveys/zaslavsk_GRSciColl-Collections.csv |                                                              |
| Administration interface, showing a list of user surveys     | http://<server>/home                                         | http://suave-dev.sdsc.edu/home                               |                                                              |
| Administration interface, showing a list of annotations over user surveys | http://<server>/comments                                     | [http://suave-dev.sdsc.edu/comments ](http://suave-dev.sdsc.edu/comments) |                                                              |

# B. Publishing SuAVE surveys in Python

In the code fragment below, consider the POST request which takes the following parameters:

r = requests.post(upload_url, files=csv, data=upload_data, headers=headers)

| Input      | Description                                                  | Example                                                      | Notes                                                        |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| upload_url | SuAVE server URL to publish the survey to, plus “uploadCSV”  | upload_url = ‘http://suave-dev.sdsc.edu/uploadCSV’           |                                                              |
| files      | pointer to a data file for the new survey                    | new_file = ‘../../temp_csvs/zaslavsk_datafile_v1.csv’  csv = {“file”: open(new_file, “rb”)}  files=csv | the data file should be materialized in the ‘temp_csvs’ directory, eg from a Pandas dataframe as  df.to_csv(new_file, index=None) |
| data       | additional survey attributes to post, including user name, dzc filem and survey name | survey_name=’New Survey’ dzc_file=’https://maxim.ucsd.edu/dzgen/lib-staging-uploads/bf7b12729303d827835937c0fa913c5c/content.dzc’ user=’zaslavsk’ data = {  ‘name’: survey_name,  ‘dzc’: dzc_file,  ‘user’:user  } | user must be logged in SuAVE for successful POST             |
| headers    | request headers, including referer and user agent. Referer is the root server URL | referer = ‘http://suave-dev.sdsc.edu/’ headers = {  ‘User-Agent’: ‘suave user agent’,  ‘referer’: referer  } |                                                              |

See code examples in SuAVE notebooks, and below:

```python
referer = survey_url.split("/main")[0] +"/"
upload_url = referer + "uploadCSV"
new_survey_url_base = survey_url.split(user)[0]

import requests
import re
csv = {"file": open(new_file, "rb")}
upload_data = {
'name': input_text.value,
'dzc': dzc_file,
'user':user
}
headers = {
'User-Agent': 'suave user agent',
'referer': referer
}

r = requests.post(upload_url, files=csv, data=upload_data, headers=headers)

if r.status_code == 200:
printmd("<b><span style='color:red'>New survey created successfully</span></b>")
regex = re.compile('[^0-9a-zA-Z_]')
s_url = survey_name
s_url = regex.sub('_', s_url)

url = new_survey_url_base + user + "_" + s_url + ".csv" + "&views=" + views + "&view=" + view
print(url)
printmd("<b><span style='color:red'>Click the URL to open the new survey</span></b>")
else:
printmd("<b><span style='color:red'>Error creating new survey. Check if a survey with this name already exists.</span></b>")
printmd("<b><span style='color:red'>Reason: </span></b>"+ str(r.status_code) + " " + r.reason)
```

