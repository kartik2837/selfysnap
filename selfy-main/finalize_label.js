const fs = require('fs');

const controllerPath = 'c:/Users/ajayb/Downloads/selfysnap/backend/src/controllers/sellerOrderController.js';
const base64Path = 'c:/Users/ajayb/Downloads/selfysnap/backend/logo_base64.txt';

try {
    const base64Logo = fs.readFileSync(base64Path, 'utf8').trim();
    let content = fs.readFileSync(controllerPath, 'utf8');

    // Update CSS sizes
    content = content.replace('.selfysnap-logo { height: 35px; object-fit: contain; }', '.selfysnap-logo { height: 60px; object-fit: contain; }');
    content = content.replace('.delhivery-logo { height: 25px; object-fit: contain; }', '.delhivery-logo { height: 45px; object-fit: contain; }');
    content = content.replace('.main-barcode { width: 100%; height: 60px; object-fit: contain; }', '.main-barcode { width: 100%; height: 120px; object-fit: contain; }');

    // Update Logo Base64
    // Match the placeholder base64 I used
    content = content.replace(/src="data:image\/png;base64,iVBORw0KGgoAAAANSUh[^"]+"/, `src="data:image/png;base64,${base64Logo}"`);

    // Update Phone Number Logic
    content = content.replace('Ph: ${pkg.phone || pkg.ph || pkg.ordered_product_recipient_phone || \'Not Available\'}', 'Ph: ${order.shippingAddress?.mobile || pkg.phone || pkg.ph || pkg.ordered_product_recipient_phone || \'Not Available\'}');

    fs.writeFileSync(controllerPath, content);
    console.log('Successfully updated shipping label with final fixes.');
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
