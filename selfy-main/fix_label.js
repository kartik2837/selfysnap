const fs = require('fs');
const path = require('path');

const controllerPath = 'c:/Users/ajayb/Downloads/selfysnap/backend/src/controllers/sellerOrderController.js';
const logoPath = 'c:/Users/ajayb/Downloads/selfysnap/frontend/public/logo.jpeg';

try {
    const logoData = fs.readFileSync(logoPath);
    const base64Logo = 'data:image/jpeg;base64,' + logoData.toString('base64');

    let content = fs.readFileSync(controllerPath, 'utf8');

    // Replace logo source with base64
    content = content.replace(/src=\"https:\/\/raw\.githubusercontent\.com\/[^"]+\"/, `src="${base64Logo}"`);

    // Update CSS for smaller printable size
    content = content.replace(/width: 680px;/, 'width: 580px;');
    content = content.replace(/padding: 40px;/, 'padding: 10px;');
    content = content.replace(/padding: 25px;/, 'padding: 15px;');
    content = content.replace(/height: 75px;/, 'height: 60px;');
    content = content.replace(/height: 50px;/, 'height: 40px;');
    content = content.replace(/height: 120px;/, 'height: 100px;');
    content = content.replace(/font-size: 24px;/, 'font-size: 20px;');
    content = content.replace(/font-size: 26px;/, 'font-size: 22px;');
    content = content.replace(/font-size: 20px;/, 'font-size: 16px;');
    content = content.replace(/margin-top: 40px;/, 'margin-top: 20px;');

    fs.writeFileSync(controllerPath, content);
    console.log('Successfully updated logo and optimized CSS for printing.');
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
