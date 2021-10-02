---
title: Updating Documentation
---

# {{page.title}}

* This website is built using Jekyll with Github Pages and Markdown.
* In order to edit the documentation, you can edit any of the markdown files with a markdown editor of your choice. Typora is a good starting point.
* Pushing changes to the Github will automatically trigger jekyll to format everything into the documentation that is viewable.

### Testing the site locally:

* This is entirely optional, though you may find it helpful to be able to test commits locally on your computer.
* By setting up a local server we can make changes to our documentation files and preview the site before pushing to Github.

#### Install Ruby+Devkit and Bundler

* Install Ruby+Devkit [here](https://jekyllrb.com/docs/installation/) if you haven't already installed it. Make sure to follow the instructions to install Jekyll and Bundler as well.

* Clone the documentation repository locally.

* Navigate to the folder using the terminal of your choice.

* ```bash
  # Example:
  cd "C:\Users\yourusername\Documents\GitHub\SuAVE-Documentation"
  ```

* initialize bundler by running

* ```bash
  bundle init
  ```

* Configure the bundler installation path. Optional but it configures bundler to install gems into the ./vendor/bundle/ project subdirectory.

  - This helps avoid permissions errors since it designates a local install folder in your project directory for "gem install" rather than the default one that is used by "gem install"
  - This is only required once, since this configuration is saved into "./.bundle/config" and this is where future "gem install"s will be redirected to for your project
  - Read more here: https://jekyllrb.com/tutorials/using-jekyll-with-bundler/

```bash
bundle config set --local path 'vendor/bundle'
```

- Next, add the github-pages gem

```bash
bundle add --group=":jekyll-plugins" github-pages
```

- **Important: after running this command, you will see a line at the end that reads "Installing github-pages XXX"** where XXX will be the version number of your pages. Keep this as we'll need it soon in another step

- Next, create a Jekyll scaffold

- ```bash
  bundle exec jekyll new --force --skip-bundle .
  bundle install
  ```
  - The "--force" parameter is required since our folder has some bundler files in it already and isn't empty
  - "bundle install" is run separately because Jekyll gets confused if a Gemfile already exists

- Next, edit the "Gemfile" file that should now be in your documentation folder to add github-pages gem and comment out jekyll gem

  - The line you want to comment out starts with 'gem "jekyll"'

  ```bash
  # This will help ensure the proper Jekyll version is running.
  # Happy Jekylling!
  # gem "jekyll", "~> 3.9.0"
  ```

  - Mine looked like this afterwards.

- Next, we are going to replace the line with 'gem "github-pages"' with the following code, ensuring we replace 'GITHUB-PAGES-VERSION' with the github-pages version we parsed from the command line.

  ```bash
  gem "github-pages", "~> GITHUB-PAGES-VERSION", group: :jekyll_plugins
  # Example:
  # gem "github-pages", "~> 218", group: :jekyll_plugins
  ```

- Add webrick gem to Gemfile

  - I've gotten this error when executing jekyll later on that leads me to need to add 'gem "webrick"' to my Gemfile as well since I believe it's a dependency.
    - [source: "Jekyll serve fails on Ruby 3.0 #8523"](https://github.com/jekyll/jekyll/issues/8523)

  ```bash
  gem "webrick"
  ```

  - this is what the end of my Gemfile looks like now

    - Alternatively, you can run the command:

    - ```bash
      bundle add webrick
      ```

- Next, update bundle

  - This should ensure all the dependencies are up to date

  ```bash
  bundle update
  ```

  ***IMPORTANT:***

- Next, update your config.yml file (jekyll settings)

  - This config file is where jekyll site customization comes into play with theme designations, variables, and other constants.

  - Replace all the contents of config.yml with just:

  - ```bash
    remote_theme: pmarsceill/just-the-docs
    ```
    
    - The remote_theme variable is important in order to properly style our documentation. 
  
- Run jekyll locally

  - Source: "[Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)"
  - Use your terminal that should be still open in the cloned folder of the SuAVE-Documentation repository to enter this command:

  ```bash
  bundle exec jekyll serve
  ```

  - Now, you should be able to use your web browser to navigate to localhost:4000 and interact with the documentation webpage locally without having to commit to github
    - **Note:** Sometimes your browser caches the webpage and changes to markdown locally won't update immediately. In this case, you can open a private window in your browser and navigate to the same page and it should be updated. You could also clear your cache for the webpage.

- Lastly, ensure all of the unnecessary files are in your .gitignore file as to not upload unecessary files.

  - The unnecessary files/folders that got installed with my instance are:

    - .bundle/
    - _site/
    - vendor/
    - Gemfile
    - Gemfile.lock
    - .sass-cache/

  - and I will be deleting the following files since they are unnecessary and I think they came with the default minima theme

    - _posts/
    - [about.md](http://about.md)

  - My final .gitignore file looks like:

    ```bash
    _site
    .sass-cache
    .jekyll-metadata
    .bundle
    vendor
    Gemfile
    Gemfile.lock
    ```

  - The _site, .sass-cache, and .jekyll-metadata were initialized with the github repository