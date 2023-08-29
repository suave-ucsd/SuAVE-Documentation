---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: SuAVE Documentation
---


# <b>Main Workflows</b>

**SuAVE (Survey Analysis via Visual Exploration) is a free online data analysis platform with unique capabilities.**

**SuAVE lets you publish, share, analyze and annotate your datasets, including spreadsheets (such as raw survey data) and image galleries, integrate online data collection with data publishing, generate, curate and analyze bibliographic networks, publish maps and tables, and launch Jupyter notebooks with your data.**

<h2>Follow the links below if you wish to learn how to...</h2>

- Publish raw survey data: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Upload_Dataset.html)
- Publish an image gallery: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Publish_Gallery.html)
- Publish a bibliographic network: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Bibliographic_Network_Pulbish.html)
- Add a map to your SuAVE application: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Add_Map_SuAVE.html)
- Create a questionnaire linked to a SuAVE visualization: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/SuAVE_Survey.html)
- Collect student responses for a class questionnaire and immediately show them in SuAVE: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/SuAVE_Class_Survey.html)
- Update a published survey or image gallery: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Update_Gallery.html)
- Share data views with collaborators: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Share_Views.html)
- Clone a public SuAVE application: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Clone_Survey.html)
- Launch Jupyter Notebooks from SuAVE: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Jupyter_Notebook_SuAVE.html)
- Create a Limesurvey questionnaire for an existing SuAVE gallery: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Limesurvey_Existing_SuAVE.html)
- Set up a registration form for a Limesurvey questionnaire: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Registration_Form.html)
- Update images in DZGen that are used in a SuAVE visualization: click [here](https://suave-ucsd.github.io/SuAVE-Documentation/Update_DZGen.html).

<link rel="stylesheet" type="text/css" href="styles.css">

<a href="https://suave-ucsd.github.io/SuAVE-Documentation/Update_DZGen.html">
   <button class="custom-button">Images</button>
</a>

---------
<link rel="stylesheet" type="text/css" href="styles.css">


<div class="button-container">
   <div class="button">
      <a href="#">CSV/Tabular</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 20px;">
      <a href="#">Images</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 20px;">
      <a href="#">Spatial/Map</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 20px;">
      <a href="#">Jupyter</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 20px;">
      <a href="#">Networks</a>
      <div class="line"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px;">
   <div class="button">
      <a href="#">Questionnaire</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 180px;">
      <a href="#">QGIS & MyMaps</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 20px;">
      <a href="#">SuAVE-Jupyter Notebooks on Github</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 20px;">
      <a href="#">CorpusDB</a>
      <div class="line"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px;">
   <div class="button">
      <a href="#">Limesurvey</a>
   </div>
   <div class="button" style="margin-left: 500px;">
      <a href="#">OpenAlex</a>
   </div>
</div>

<style>
   .button-container {
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .button {
      position: relative;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
   }
   .line {
      width: 3px;
      height: 25px; /* Adjust the height of the line */
      background-color: black;
      margin-top: 10px; /* Adjust the distance of the line from the button */
   }
   .white-line {
      width: 3px;
      height: 25px; /* Adjust the height of the line */
      background-color: white;
      margin-top: 10px; /* Adjust the distance of the line from the button */
   }
   .empty-button {
      width: 120px;
      background-color: transparent;
      border: 2px solid #007bff;
      color: #007bff;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 1px;
      transition: background-color 0.3s, color 0.3s;
      text-decoration: none;
      visibility: hidden; /* Hide the empty button */
   }
   .button a {
      width: 120px;
      height: 100px;
      background-color: transparent;
      border: 2px solid #007bff;
      color: #007bff;
      padding: 5px 5px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      transition: background-color 0.3s, color 0.3s;
      text-decoration: none;
   }
   .button:not(:last-child) {
      margin-right: 20px;
   }
   .button a:hover {
    background-color: #007bff;
    color: white;
}
</style>
