---
title: Embedding in other pages
parent: Installation
nav_order: 4
---

# {{page.title}}

Embedding SuAVE in other pages

To embed SuAVE into any website, we need to use iframe, a HTML component.

Simply replace your SuAVE url into “src” part, and then put the block of HTML code in any website.

Example:

```
<iframe 
    src="http://suave-dev.sdsc.edu/main/file=eyulaeva2016_2015_GFL_Forest_Images.csv&views=111010&view=map" 
    style="border:0px #ffffff none;" 
    name="myiFrame" 
    scrolling="no" 
    frameborder="1" 
    marginheight="0px" 
    marginwidth="0px" 
    height="400px" 
    width="600px" 
    allowfullscreen>
</iframe>
```

The above code block creates an iframe component that has some customized features.

To easily generate customized iframe code, refer to http://www.iframe-generator.com/

### Remove the header bar:

SuAVE is modified to be used with authoring  system, but if you simply want to remove the header, change the url from ‘/main/file=*..” to “/loading_without_authoring.html?file=*..” to get  rid of authoring check.