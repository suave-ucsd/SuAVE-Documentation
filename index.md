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

---
# <b> Software Applications </b>
<br>

<link rel="stylesheet" type="text/css" href="styles.css">

<div class="button-container" style="margin-left: 50px;">
   <div class="arrow-container">
      <div class="button">
         <a href="https://suave-ucsd.github.io/SuAVE-Documentation/CSV_or_Tabular.html">CSV/Tabular</a>
         <div class="arrow"></div>
      </div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Image_Applications.html">Images</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Spatial_or_Map_Applications.html">Spatial/Map</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/SuAVE_General_Applications.html">SuAVE Applications</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Network_Applications.html">Networks</a>
      <div class="line"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="button">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Questionnaire.html">Questionnaire</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 170px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/QGIS_and_MyMaps.html">QGIS & MyMaps</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Jupyter_Applications.html">SuAVE-Jupyter Notebooks</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/CorpusDB_Applications.html">Corpus-DB</a>
      <div class="line"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="button">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Limesurvey_Application.html">Limesurvey</a>
   </div>
   <div class="button" style="margin-left: 490px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/OpenAlex_Applications.html">OpenAlex</a>
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
      margin-right: 10px; /* Adjusted margin for spacing */
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
   }
   .line {
      width: 3px;
      height: 25px; /* Adjust the height of the line */
      background-color: #808080;
      margin-top: 10px; /* Adjust the distance of the line from the button */
   }
   .arrow-container {
    display: flex;
    align-items: center;
  }

  .arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 12.5px solid transparent;
    border-bottom: 12.5px solid transparent;
    border-left: 25px solid #808080; /* Adjust the color of the arrow */
    left: 100%; /* Position the arrow to the right of the button */
    top: 50%; /* Align the arrow vertically */
    transform: translateY(-50%); /* Center the arrow vertically */
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
      width: 130px;
      height: 60px;
      background-color: transparent;
      border: 2px solid #007bff;
      color: #007bff;
      padding: 3px; /* Adjust the padding for the buttons with a height of 25px */
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      transition: background-color 0.3s, color 0.3s;
      text-decoration: none;
      
      display: flex;
      flex-direction: column;
      justify-content: center; /* Center the text vertically */
      align-items: center; /* Center the text horizontally */
      text-align: center; /* Center the text within the button */
   }

   .button:not(:last-child) {
      margin-right: 15px;
   }
   .button a:hover {
      background-color: #007bff;
      color: white;
   }
</style>



--------------

<html>
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
      background-color: #808080;
      margin-top: 10px; /* Adjust the distance of the line from the button */
   }
   .arrow-container {
      display: flex;
      align-items: center;
      position: relative;
   }
   .arrow {
      position: absolute;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 15px solid #808080; /* Adjust the color of the arrow */
      left: 100%; /* Position the arrow to the right of the button */
      top: 50%; /* Align the arrow vertically */
      transform: translateY(-50%); /* Center the arrow vertically */
   }
   .white-line {
      width: 3px;
      height: 25px; /* Adjust the height of the line */
      background-color: white;
      margin-top: 10px; /* Adjust the distance of the line from the button */
   }
</style>
</head>
<body>

<b>Software Applications</b>
<br>

<div class="button-container" style="margin-left: 50px;">
   <div class="arrow-container">
      <div class="button">
         <a href="https://suave-ucsd.github.io/SuAVE-Documentation/CSV_or_Tabular.html">CSV/Tabular</a>
      </div>
      <div class="arrow"></div>
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Image_Applications.html">Images</a>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Spatial_or_Map_Applications.html">Spatial/Map</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/SuAVE_General_Applications.html">SuAVE Applications</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Network_Applications.html">Networks</a>
      <div class="line"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="button">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Questionnaire.html">Questionnaire</a>
      <div class="line"></div>
   </div>
   <div class="button" style="margin-left: 170px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/QGIS_and_MyMaps.html">QGIS & MyMaps</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Jupyter_Applications.html">SuAVE-Jupyter Notebooks</a>
      <div class="white-line"></div>
   </div>
   <div class="button" style="margin-left: 15px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/CorpusDB_Applications.html">Corpus-DB</a>
      <div class="line"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="button">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Limesurvey_Application.html">Limesurvey</a>
   </div>
   <div class="button" style="margin-left: 490px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/OpenAlex_Applications.html">OpenAlex</a>
   </div>
</div>

</body>
</html>

------------
<html>
<head>
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
      background-color: #808080;
      margin-top: 10px; /* Adjust the distance of the line from the button */
   }
   .arrow-container {
    display: flex;
    align-items: center;
  }
   .arrow {
     position: absolute;
     width: 0;
     height: 0;
     border-top: 12.5px solid transparent;
     border-bottom: 12.5px solid transparent;
     border-left: 25px solid #808080; /* Adjust the color of the arrow */
     left: 100%; /* Position the arrow to the right of the button */
     top: 50%; /* Align the arrow vertically */
     transform: translateY(-50%); /* Center the arrow vertically */
   }
</style>
</head>
<body>

<b>Software Applications</b>
<br>

<div class="button-container" style="margin-left: 50px;">
   <div class="arrow-container">
      <div class="button">
         <a href="https://suave-ucsd.github.io/SuAVE-Documentation/CSV_or_Tabular.html">CSV/Tabular</a>
         <div class="arrow"></div>
      </div>
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Questionnaire.html">Questionnaire</a>
      <div class="arrow"></div>
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Limesurvey_Application.html">Limesurvey</a>
      <div class="arrow"></div>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="button">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Image_Applications.html">Images</a>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Spatial_or_Map_Applications.html">Spatial/Map</a>
      
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/QGIS_and_MyMaps.html">QGIS & MyMaps</a>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="arrow-container">
      <div class="button">
         <a href="https://suave-ucsd.github.io/SuAVE-Documentation/SuAVE_General_Applications.html">SuAVE Applications</a>
         <div class="arrow"></div>
      </div>
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Jupyter_Applications.html">SuAVE-Jupyter Notebooks</a>
   </div>
</div>
<div class="button-container" style="margin-top: 10px; margin-left: 50px">
   <div class="arrow-container">
      <div class="button">
         <a href="https://suave-ucsd.github.io/SuAVE-Documentation/Network_Applications.html">Networks</a>
         <div class="arrow"></div>
      </div>
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/CorpusDB_Applications.html">Corpus-DB</a>
      <div class="arrow"></div>
   </div>
   <div class="button" style="margin-left: 30px;">
      <a href="https://suave-ucsd.github.io/SuAVE-Documentation/OpenAlex_Applications.html">OpenAlex</a>
   </div>
</div>

</body>
</html>





