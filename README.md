# Setup hello world extension

**Overview:** 

- Updated manifest.json: add name, action, permissions, and host permissions 
The manifest\_version is updated to 3, and the name of the app is added. An action field with a default popup of "index.html" is included. Permissions and host permissions are also added to allow scripting and access to all http and https websites.

- Update manifest.json: add icons and host permissions array
This update adds an "icons" field to manifest.json, specifying various icon sizes. It also moves the "host_permissions" field into a proper array. Permissions were given to begin scripting.

-Add types for chrome and dependencies
This commit adds the @types/chrome package as a devDependency and includes its dependencies: @types/filesystem and @types/har-format.|


# Instructions

If you want to read commit messages go to "2-setup-hello-world-extension" branch

To run the code must run following commands in terminal...

To install initial dependencies:
npm install

other dependencies:
npm install -D @types/chrome

To update code: 
ctrl + k and s
npm run build

To run webpage:
npm run dev

