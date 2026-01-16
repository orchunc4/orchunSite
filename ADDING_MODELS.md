# How to Add New 3D Models

Since this is a static website (no backend database), adding a model involves 3 simple steps:

## 1. Prepare Your Files
*   **Model**: You need a `.glb` or `.gltf` file (GLB is recommended).
*   **Thumbnail**: (Optional) A small image `.jpg` or `.png` (~100x100px).

## 2. Place Files in the Public Folder
*   Copy your **.glb** file to: `d:\PROJELER\testProjesi\public\models\`
*   Copy your **image** file to: `d:\PROJELER\testProjesi\public\thumbnails\`
    *(I have triggered a command to create these folders for you)*

## 3. Update the Code
Open `src/pages/ThreeDGallery.jsx` and look for the `availableModels` list (around line 23). Add a new line like this:

```javascript
const availableModels = [
  { id: 1, name: 'Concept Orb', url: '', type: 'placeholder' },
  { id: 2, name: 'Cyber Skull', url: '', type: 'placeholder' },
  
  // ADD YOUR NEW MODEL HERE:
  { 
    id: 4, 
    name: 'My New Sword', 
    url: '/models/sword.glb', 
    type: 'gltf' 
  }
];
```

Save the file, and your model will instantly appear in the sidebar!
