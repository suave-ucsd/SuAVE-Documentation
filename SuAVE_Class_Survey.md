---
title: Create Class Limesurvey Questionnaire Linked to SuAVE
parent: Main Workflows
nav_order: 6
---

# Create a Class Limesurvey Questionnaire Linked to SuAVE

**Follow the steps below to create a SuAVE visualization that will update in real time with your classroom questionnaire**

1. First, login to [Limesurvey](https://limesurvey.sdsc.edu/limesurvey/index.php/admin/authentication/sa/login).
2. Learn how to set up your questionnaire [here](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/limesurvey_setup.html).
  - **TEST YOUR QUESTIONNAIRE**. This includes all aspects of the questionnaire, which can include all combinations of survey flow, the registration form, among other things.
  - Some common stylistic tools within Limesurvey are survey logic and question type. Survey logic is used when only respondents who answered previous questions in a certain way should see the question. As the survey creator, you also decide how respondents answers to questions, whether "Select all that Apply" or "Free response". With these aspects of Limesurvey, it is up to you to make the survey logic understandable for other developers and the question types logical for the question and unbiased.
3. Follow [these steps](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/Preparing%20a%20class%20roster%20for%20import%20in%20LimeSurvey.html) to learn how to create a dataset of your class roster and add it to your questionnaire (so that only your students have access to fill out the questionnaire). You can also learn how to add TAs as administrators to the questionnaire.    
4. Once you have your questionnaire set up, you will need to go to [Google Sheets](https://docs.google.com/spreadsheets) to set up the dataset for the questionnaire.
5. To set up your Google Sheet for the questionnaire, follow [these steps](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/google_sheets_setup.html).
  - This [page](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/multiple_response_formatting_tool.html) offers a tool to help map multiple choice and list questions.
  - Linked [here](https://docs.google.com/spreadsheets/d/1BHOFtE8XwGCOsY9aGsUU6Ry-yHPXv6geGDwmgvBQP1I/edit#gid=539759871) is a list of common mappings.
6. Now, test your mapping. This can be done by filling out the questionnaire and seeing if it properly maps to the Google Sheets. Once you fill out the questionnaire, go to [https://limesurvey.sdsc.edu/limesurvey-update](https://limesurvey.sdsc.edu/limesurvey-update) (Username is **lsadmin** and password is **VocalMimic**). Enter the SurveyID and hit “Update”. If a message populates on the screen and the Google Sheet updates, then you can move to the next step.
  - If nothing appears in the Google Sheet after you have completed the questionnaire, that means you have messed up a mapping or skipped a step. Retrace your steps and check for typos. Do not move forward until the mapping is correct.
7. Once you have completed testing the Google Sheet, navigate to [https://suave-net.sdsc.edu](https://suave-net.sdsc.edu).
8. Now, set up the SuAVE visualization for the questionnaire by following the steps linked [here](https://suave-ucsd.github.io/SuAVE-Documentation/limesurvey_suave/suave_setup.html).
  - If you want participants of the questionnaire to see the SuAVE visualization, navigate back to Limesurvey; go to "Text Elements" and link the SuAVE visualization URL in the "End message".
9. You should now have 3 things: the Limesurvey questionnaire, Google Sheet dataset, and SuAVE visualization.
10. Test that everything is in sync. Fill out the questionnaire a couple more times. These responses should now populate in the Google Sheet dataset and then the SuAVE visualization. If the responses do not show up in SuAVE and the Google Sheet, then it is a mapping issue. If the response do not populate in the SuAVE visualization only, then it is an issue between the Google Sheet and SuAVE. Fix the issue and then you are ready to publish the questionnaire.

