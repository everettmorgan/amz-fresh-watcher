# Amazon Fresh Watcher
Monitor the "select a time" page in the Amazon Fresh checkout flow. An alert will appear once a time is available.

## Installation
1. Install "TamperMonkey" extension for your browser
2. Access the extension and create a new script
3. Copy the code from index.js and replace everything within the TamperMonkey edit

## Usage
1. Go to Amazon Fresh Checkout Flow
2. On the "select a time" page you'll see glasses in the bottom-left

![example-image1]("example-image.png")

3. Click on the glasses to activate the watcher
4. You'll see the glasses switch to eyes, and the script will start monitoring for times.

Glasses = Disabled
Eyes = Enabled

### Todo
- build out automatically selecting an available time based on user preferences
- make it through the full checkout flow (?)