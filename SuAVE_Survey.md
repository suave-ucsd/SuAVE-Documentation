---
title: Create Limesurvey Questionnaire Linked to SuAVE
parent: Main Workflows
nav_order: 5
---

# Create Limesurvey Questionnaire Linked to SuAVE

**Follow the steps below to create a SuAVE visualization that will update in real time with your survey**

1. First, login to [Limesurvey](https://limesurvey.sdsc.edu/limesurvey/index.php/admin/authentication/sa/login).
2. Learn how to set up your survey [here](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/limesurvey_setup.html).
  - **TEST YOUR SURVEY**. This includes all aspects of the survey, which can include all combinations of survey flow, the registration form, among other things.
  - If you want participants to be able to answer the survey multiple times, follow the steps [here](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/Multiple_Records.html).
  - If you do not have a list of participants to fill out the survey, you can create a registration form for the survey by following [these steps](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/Custom_Limesurvey_Registration_Form.html).
  - Some common stylistic tools within Limesurvey are survey logic and question type. Survey logic is used when only respondents who answered previous questions in a certain way should see a certain question. As the survey creator, you also decide how respondents answer questions, which can range from "Select all that Apply" to "Free response". With these aspects of Limesurvey, it is up to you to make the survey logic understandable for other developers and the question types logical for the question and unbiased.
3. Once you have your survey set up, you will need to go to [Google Sheets](https://docs.google.com/spreadsheets) to set up the dataset for the survey.
4. To set up your Google Sheet for the survey, follow [these steps](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/google_sheets_setup.html).
  - This [page](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/multiple_response_formatting_tool.html) offers a tool to help map multiple choice and list questions.
  - Linked [here](https://docs.google.com/spreadsheets/d/1BHOFtE8XwGCOsY9aGsUU6Ry-yHPXv6geGDwmgvBQP1I/edit#gid=539759871) is a list of common mappings.
5. Now, test your mapping. This can be done by filling out the survey and seeing if it properly maps to the Google Sheets. Once you fill out the survey, go to [https://limesurvey.sdsc.edu/limesurvey-update](https://limesurvey.sdsc.edu/limesurvey-update) (Username is **lsadmin** and password is **VocalMimic**). Enter the SurveyID and hit "Update". If a message populates on the screen and the Google Sheet updates, then you can move to the next step.
  - If nothing appears in the Google Sheet after you have completed the survey, that means you have messed up a mapping or skipped a step. Retrace your steps and check for typos. Do not move forward until the mapping is correct.
6. Once you have completed testing the Google Sheet, navigate to [https://suave-net.sdsc.edu](https://suave-net.sdsc.edu).
7. Now, set up the SuAVE visualization for the survey by following the steps linked [here](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/suave_setup.html).
  - If you want participants of the survey to see the SuAVE visualization, navigate back to Limesurvey; go to "Text Elements" and link the survey URL in the "End message".
8. You should now have 3 things: the Limesurvey survey, Google Sheet dataset, and SuAVE visualization.
9. Test that everything is in sync. Fill out the survey a couple more times. These responses should now populate in the Google Sheet dataset and then the SuAVE visualization. If the responses do not show up in SuAVE and the Google Sheet, then it is a mapping issue. If the response do not populate in the SuAVE visualization only, then it is an issue between the Google Sheet and SuAVE. Fix the issue and then you are ready to publish the survey.

