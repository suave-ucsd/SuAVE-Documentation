---
title: Create a SuAVE Survey for Data Visualization and Interaction
parent: LimeSurvey Integration
nav_order: 3
---

# {{page.title}}

### What you'll need:

- [ ] The link to the Google Spreadsheet created in the previous section
- [ ] A SuAVE Account
- Login to your SuAVE Account
- Ensure that you're in the "Gallery Section" on the SuAVE Homepage. This can be accessed from the left navigation bar of the website.

![Untitled]({{ site.image_base_url }}\limesurvey_suave\assets\Untitled 27.png)

- Click the "New Survey" button on the top left of the gallery menu.

![newsurveysuave.png]({{ site.image_base_url }}\limesurvey_suave\assets\newsurveysuave.png)

- You should be presented with a menu that looks like this:

![Untitled]({{ site.image_base_url }}\limesurvey_suave\assets\Untitled 28.png)

- In the following steps we're going to configure the settings to connect it to our LimeSurvey survey and Google Spreadsheet.

### Configuring your Survey

- In order to connect our SuAVE survey to the survey that we created in LimeSurvey and Google Sheets, we are going to configure it using the following settings:

- **Name the survey:**

  - You can name your survey anything. It is recommended that the survey name is informative. It will appear at the top of your SuAVE visualization and cannot be changed later.

- **Link to Survey (URL)**

  - Grab the link from the Google Spreadsheet you created. It should look something like this:

  ```
  https://docs.google.com/spreadsheets/d/[SPREADSHEET ID]/edit?usp=sharing
  ```

  - Edit the end of the link such that  "/export?format=csv" comes after the spreadsheet ID. It should look like this now:

  ```
  https://docs.google.com/spreadsheets/d/[SPREADSHEET ID]/export?format=csv
  ```

  - Select the "Link to Survey (URL)" option and insert your new link into the text box.

- **Image Definition**

  You must select "Create empty repository" in this field or else images from your survey will not be able to be accessed.

- Your survey configuration should look something like this:

![Untitled]({{ site.image_base_url }}\limesurvey_suave\assets\Untitled 29.png)

- Press "submit"

**Note**: Nothing will appear in the survey until there are responses that are submitted to the survey. If there are no responses you will get the error below, but do not worry. This does not mean that the survey creation failed.

![Untitled]({{ site.image_base_url }}\limesurvey_suave\assets\Untitled 30.png)