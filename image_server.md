---
title: Image Server
parent: Installation
nav_order: 3
---

# {{page.title}}

Due to the demand for high-quality images in data analysis, users can attach their image set definition as URL when  uploading a new CSV file. With image server, it saves users’ efforts to  transfer large datasets.

## CORS: cross-origin resource sharing

One problem that occurs at setting an image  server is to enable CORS on the image server. If not well set up on  image servers, browsers will usually reject the request for security  reasons.

To easily solve the problem, the server needs to add additional info to its response:

```
Access-Control-Allow-Origin: *
```

An example CORS configuration on Amazon S3:

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

Depending on types of web servers, there will be different ways to quickly to change headers.

For detailed instruction, refer to https://enable-cors.org/index.html

### Other approaches to easily overcome CORS problem:

- Set up a proxy server. For example, if SuAVE is hosted on Nginx  server, add the following to configuration will solve the problem:

```
    proxy_pass      YOUR_IMAGE_SERVER_URL
```
