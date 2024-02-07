# PWA Todo App

In this codebase you find a todo app that is created as a PWA. It was created with only JS to make it available and understandable, also for people who can only write JS or feel most comfortable with it.

- The app works offline once installed
- Todos can be added, checked and deleted and are stored in the cache

:collision: Find more information on PWA and how you can create your own in [my e-learning course on Medium.](https://medium.com/@nadineklr/pwa-essentials-revolutioniere-deine-webanwendungen-mit-progressive-web-app-development-b9c654d14917)

### Important side notes

For a real-life application that would be publicly available through a browser, it's crucial to implement additional security measures. As this app is primarily designed to demonstrate the structure of a PWA, focusing on the service worker, the manifest.json, and caching, the input form was intentionally left without validation, making it vulnerable to XSS (Cross-Site Scripting) attacks. Also it is not optimized for usability in terms of that there is no sorting of the todos when they are checked. These features can easily be added to complete the app.

## App Features

### Service Worker:

The service worker is registered in the main.js file to enable caching and offline usage for the PWA.

### Caching:

With the Cache API data is stored and recieved from the cache. The most important files and assets are precached so they are available after installing the service worker even when network connection is bad or not available. When the app is loaded, it checks if there is a cached to-do list in the "todo-cache." If this is the case, it retrieves the data and displays all todos with the corresponding checkbox status from the todoList array.

### Manifest.json

The manifest.json contains a json object and is a required feature to create a installable PWA. You can find the required members of a manifest here: [MDN Required Members in Manifest.json](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable#required_manifest_members)

### Add todo items

When the user wants to submit a new to-do item, it adds the item to the todoList array and updates the cache with the new data. Even after page reload, the data can be recieved from the cache.

### Show the todo items

The function generates the HTML to add the todo list items from the array to the DOM.

### Check todos

With an event listener the tasks can be checked with the checkbox and marked as done. This value also is stored in the cache.

### Delete todos

The user can delete todo items with the button and the todoList will be updated. Also this information will then be updated with the new todoList array in the cache.

### Subpage Notes

Here you can add some notes which are automatically stored in the cache after input.

# Setup

You can easily setup the PWA on your own server. It works with https or http on your local server like XAMPP or MAMP.

# Testing

A few words to testing the PWA on your devices:

The Chrome browser with its dev tools is a very useful and easy way to test, for example, if the service worker was registered, installed and activated. You can check the cache or directly inspect the service worker with the 'Application' tab. Lighthouse also offers testing, especially designed for PWAs to check if the requirements for installation were fulfilled.

You can check the app through the Chrome browser and activate "offline" in the Application tab to check offline stability. Also you can istall it on your device and turn off the local server and see it still working fine.

Also in Firefox you can see the staus of the service worker in the dev tools under the application tab and inspect data in the cache.

As you see in the main.js a console.log gets executed to check if the service worker was registered and give you a direct feedback on the service worker status and scope.

For Safari, make sure Develop menu is activated in your settings to be able to check the console. If you are working on OS, you can install the iOS Simulator which is part of XCode to simulate iOS Devices.

Keep in mind that on iOS caching behaviour is different in the browser than when the app is installed. If the app is closed in the background on mobile, the cache gets deleted and data is lost. Depending on your device and its settings cache and service worker might behave different from testing on desktop.

For first level support, if you face any problems with the PWA, first empty the browser cache and check again. Especially when altering the code and reloading, older cached data can lead to issues with the new code version.
