---
title: Adding and Accessing Jupyter Notebooks Tied with SuAVE Visualizations
parent: Main Workflows
nav_order: 10
---

# Adding a Jupyter Notebook of a SuAVE Visualization

A basic overview is given [here](https://docs.google.com/document/d/1_hE7fin7xvYcFWCa1ukDo8bAH5-ipo6CgWHsObm4cFM/edit#heading=h.rwpzgzb98mp5), but follow the step-by-step guide below.

1. Make sure you have a verified account with NRP Nautilus. If you do not, create an account [here](https://portal.nrp-nautilus.io) and request access to NRP Nautilus services with that verified academic email [here](https://element.nrp-nautilus.io/#/room/#general:matrix.nrp-nautilus.io/$otJHIgxLiCsRjsqEFnM9mfgxutSmHhnpfIb1YQfuRVE).
2. Make sure you have access to the specific NRP Nautilus JupyterHub. If you do not, request for access from the administrator by emailing izaslavsky@ucsd.edu.
3. Craft the correct URL; it should be in the following format: https://jupyter-suave.nrp-nautilus.io/user/***your email***/notebooks/jupyter-suave/SuaveDispatch.ipynb?surveyurl=***survey URL***&user=***user***&csv=***CSV tied to visualization***&params=none&dzc=***maxim DZC URL***. An example is provided below.
   - Example: https://jupyter-suave.nrp-nautilus.io/user/jkaminsky@ucsd.edu/notebooks/jupyter-suave/SuaveDispatch.ipynb?surveyurl=https://suave-net.sdsc.edu/main/file=joeykaminsky2_Tester_13.csv&view=grid&user=jkaminsky&csv=joeykaminsky2_Tester_13.csv&params=none&dzc=https://dzgen.sdsc.edu/dzgen/lib-staging-uploads/6eb3af87e3c855ed01cdaad5591b4722/content.dzc&activeobject=null
   - To get the **survey URL**: navigate to the SuAVE visualization and open it. Copy the URL at the top of the page.
   - To get the **user**: This should be whoever created the SuAVE visualization. This field is not that important, but
   - To get the **CSV**: Within the link to the survey, there should be an argument that says ***file=***. Copy what comes after it until .csv. In the case above, within the survey URL is file=joeykaminsky2_Tester_13.csv, so csv=joeykaminsky2_Tester_13.csv.
   - To get the **DZC URL**: Navigate to the gallery view of SuAVE surveys. Click on "Edit" then "Settings" for the survey of interest. Scroll down to "Image Definition Link" and copy the URL.
4. Next, copy the URL you have created and run it in a web browser. It should populate the SuAVE Dispatch notebook with information pertaining to the particular survey (as seen from running the code cell in step 2).
5. Run all the code; this will add the survey to the Jupyter Hub.
6. Finally, go back to the SuAVE gallery view of visualizations and go back to the "Settings" of the particular survey. Here, enable public "Jupyter" view and hit "submit".

---
# Adding a Jupyter Notebook of a SuAVE Image Gallery

Follow all the steps from **Adding a Jupyter Notebook of a SuAVE Visualization** except step 3 (crafting the URL). Instead, do the following:

The URL should be in the following format: https://joeykaminsky.nrp-nautilus.io/user/***your email***/notebooks/jupyter-suave/SuaveDispatch.ipynb?user=***user***&csv=***CSV tied to gallery***&params=none&dzc=***maxim DZC URL***&surveyurl=***Image Gallery URL***
   - Example: https://jupyter-suave.nrp-nautilus.io/user/jkaminsky@ucsd.edu/notebooks/jupyter-suave/SuaveDispatch.ipynb?surveyurl=https://suave-net.sdsc.edu/main/file=joeykaminsky2_Tester_13.csv&view=grid&user=jkaminsky&csv=joeykaminsky2_Tester_13.csv&params=none&dzc=https://dzgen.sdsc.edu/dzgen/lib-staging-uploads/6eb3af87e3c855ed01cdaad5591b4722/content.dzc&activeobject=null
   - To get the **DZC URL**: Navigate to the gallery view of SuAVE surveys. Click on "Edit" then "Settings" for the survey of interest. Scroll down to "Image Definition Link" and copy the URL.
   - To get the **user**: This should be whoever created the SuAVE visualization. This field is not that important, but
   - To get the **CSV**: Within the link to the survey, there should be an argument that says ***file=***. Copy what comes after it until .csv. In the case above, within the survey URL is file=joeykaminsky2_Tester_13.csv, so csv=joeykaminsky2_Tester_13.csv.
   - To get the **survey URL**: navigate to the SuAVE visualization and open it. Copy the URL at the top of the page.


---
# Accessing a Jupyter Notebook Tied with a SuAVE Visualization

1. Navigate to the desired SuAVE visualization.
2. Select the Jupyter Hub logo in the top right (with all the view options).
   - If you do not see this option, you will have to add the Jupyter Notebook tied to the SuAVE visualization to the Jupyter Hub.
4. Select the NRP Nautilus server and hit "Connect".
    - If you do not have an account with NRP Nautilus, you will need to create an account [here](https://portal.nrp-nautilus.io) and request access to NRP Nautilus services with that verified academic email [here](https://element.nrp-nautilus.io/#/room/#general:matrix.nrp-nautilus.io/$otJHIgxLiCsRjsqEFnM9mfgxutSmHhnpfIb1YQfuRVE).
    - Once you are approved, you will also need to ask for access to the Jupyter Hub.
5. Once you are approved to access the Jupyter Hub (if needed), you will be able to access the Jupyter Notebook tied to the SuAVE visualization.


