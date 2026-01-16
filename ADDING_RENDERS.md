# How to Add New Renders to the Home Page

To add a new render to the bottom of your scrolling page, follow these steps:

## 1. Add the File
Copy your new image file (e.g., `my_new_render.jpg`) into the folder:
`d:\PROJELER\testProjesi\public\renders\`

## 2. Update the Code
Open the file `src/pages/Home.jsx`.
Find the `renderImages` list (around line 5). You will see a list of images like this:

```javascript
const renderImages = [
  { src: "/renders/NewLevelSequence2.0021%20copy.jpg", title: "THE BEGINNING", subtitle: "..." },
  // ... other images
];
```

Add your new image to the end of the list:

```javascript
  // ... existing images
  { 
    src: "/renders/my_new_render.jpg", 
    title: "MY NEW SECTION", 
    subtitle: "Description of this shot" 
  }
];
```

## 3. Save
Once you save the file, the website will automatically update, and you will be able to scroll down to your new section!
