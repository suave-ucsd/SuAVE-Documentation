---
title: Organizing Images for SuAVE Galleries
parent: SuAVE Bibliographic Network
nav_order: 9

---

# Organizing Images for SuAVE Galleries

This code only works if you use the code in "Generating Images for SuAVE Bibliographic Network" to generate images for a SuAVE gallery. Please make sure you first ran the code in "Generating Images for SuAVE Bibliographic Network".

Now, if you want to obtain a list of the searches that obtained the images in the SuAVE gallery, add this to the end of the code:

>     best_search = []
>     for i in range(len(names)):
>         to_add = {}
>         to_add[names[i]] = list(final_results[i].keys())[0]
>         best_search.append(to_add)
>     best_search

This will return a list of dictionaries, where the xth dictionary corresponds to the xth person in the dataset, where the dictionary follows this format: {name: best search for image}.
