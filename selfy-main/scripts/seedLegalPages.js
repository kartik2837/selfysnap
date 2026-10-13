const mongoose = require("mongoose");
const LegalPage = require("../models/LegalPage");
require("dotenv").config();

const pages = [
  {
    slug: "about",
    title: "About Us",
    category: "about",
    isSystem: true,
    order: 0,
    description: "Learn more about Selfysnap",
    content: `
      <h2>About Selfysnap</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      <p>Selfysnap is India's fastest growing multi-vendor marketplace connecting sellers and customers across the nation. We empower small and medium businesses to reach millions of customers online with zero investment.</p>
      
      <h3>Our Mission</h3>
      <p>To democratize online selling in India by providing an easy-to-use platform where anyone can start their business with zero setup cost.</p>
      
      <h3>Our Vision</h3>
      <p>To become India's most trusted marketplace that helps 1 million+ sellers grow their business online by 2030.</p>
      
      <h3>What We Offer</h3>
      <ul>
        <li><strong>Zero Registration Cost</strong> - Start selling for free</li>
        <li><strong>Fast Payments</strong> - Get paid within 24 hours</li>
        <li><strong>Pan-India Shipping</strong> - Deliver to 25,000+ pin codes</li>
        <li><strong>Marketing Tools</strong> - Built-in ads and promotions</li>
        <li><strong>24×7 Support</strong> - Always here to help</li>
      </ul>
      
      <h3>Why Choose Us?</h3>
      <ul>
        <li>10,000+ Active Sellers</li>
        <li>45,000+ Products Listed</li>
        <li>20,000+ Happy Customers</li>
        <li>99% Success Rate</li>
      </ul>
      
      <h3>Contact Us</h3>
      <p>We'd love to hear from you!</p>
      <ul>
        <li><strong>Email:</strong> support@selfysnap.com</li>
        <li><strong>Phone:</strong> +91 99920 88843</li>
        <li><strong>Address:</strong> Selfysnap Warehouse, Plot No. 12, Main Market, Hisar, Haryana</li>
      </ul>
    `,
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    category: "customer",
    isSystem: true,
    order: 1,
    description: "Terms and conditions for using Selfysnap",
    content: `
      <h2>Terms & Conditions</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      <p>Welcome to Selfysnap. By accessing our platform, you agree to these terms.</p>
      
      <h3>1. Acceptance of Terms</h3>
      <p>By using our Platform, you agree to these terms. You must be at least 18 years old.</p>
      
      <h3>2. User Accounts</h3>
      <ul>
        <li>Provide accurate information during registration</li>
        <li>Maintain confidentiality of your credentials</li>
        <li>Notify us immediately of unauthorized access</li>
      </ul>
      
      <h3>3. Product Information</h3>
      <p>We strive for accuracy but errors may occur. If a product isn't as described, return it unused.</p>
      
      <h3>4. Pricing & Payment</h3>
      <ul>
        <li>All prices in Indian Rupees (₹) with applicable GST</li>
        <li>We can change prices anytime without notice</li>
        <li>Payment through approved methods only</li>
      </ul>
      
      <h3>5. Order Acceptance</h3>
      <p>We can accept or decline orders for reasons like unavailability, pricing errors, or fraud suspicion.</p>
      
      <h3>6. Intellectual Property</h3>
      <p>All content is Selfysnap's property, protected by copyright laws.</p>
      
      <h3>7. Contact</h3>
      <p>Email: support@selfysnap.com</p>
    `,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    category: "customer",
    isSystem: true,
    order: 2,
    description: "How we protect your data",
    content: `
      <h2>Privacy Policy</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      <p>Your privacy is our priority.</p>
      
      <h3>1. Information We Collect</h3>
      <ul>
        <li>Name, email, phone number</li>
        <li>Shipping and billing address</li>
        <li>Payment info (encrypted)</li>
        <li>Device and browsing data</li>
      </ul>
      
      <h3>2. How We Use It</h3>
      <ul>
        <li>Process orders and payments</li>
        <li>Send order updates</li>
        <li>Improve our services</li>
        <li>Marketing (with consent)</li>
      </ul>
      
      <h3>3. Data Security</h3>
      <p>We use SSL/TLS encryption and secure storage to protect your data.</p>
      
      <h3>4. Contact</h3>
      <p>Email: privacy@selfysnap.com</p>
    `,
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    category: "customer",
    isSystem: true,
    order: 3,
    description: "Our refund process and timelines",
    content: `
      <h2>Refund Policy</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      
      <h3>Refund Eligibility</h3>
      <ul>
        <li>✅ Damaged product received</li>
        <li>✅ Wrong product delivered</li>
        <li>✅ Missing parts</li>
      </ul>
      
      <h3>Non-Refundable</h3>
      <ul>
        <li>❌ Change of mind</li>
        <li>❌ Used products</li>
        <li>❌ Customized items</li>
      </ul>
      
      <h3>Timeline</h3>
      <ul>
        <li>Return request: within 7 days</li>
        <li>Product pickup: 2-3 days</li>
        <li>Refund: 5-7 business days</li>
      </ul>
      
      <h3>Contact</h3>
      <p>Email: refunds@selfysnap.com</p>
    `,
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    category: "general",
    isSystem: true,
    order: 4,
    description: "Delivery times and charges",
    content: `
      <h2>Shipping Policy</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      
      <h3>Delivery Coverage</h3>
      <p>We deliver to 25,000+ pin codes across India.</p>
      
      <h3>Delivery Time</h3>
      <ul>
        <li>Metro cities: 2-4 days</li>
        <li>Tier 1 cities: 3-5 days</li>
        <li>Remote areas: 5-8 days</li>
      </ul>
      
      <h3>Shipping Charges</h3>
      <ul>
        <li>Free above ₹499</li>
        <li>₹49 below ₹499</li>
        <li>Express: ₹99</li>
      </ul>
      
      <h3>Contact</h3>
      <p>Email: shipping@selfysnap.com</p>
    `,
  },
  {
    slug: "return-policy",
    title: "Return Policy",
    category: "general",
    isSystem: true,
    order: 5,
    description: "7-day easy returns",
    content: `
      <h2>Return Policy</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      
      <h3>Return Window</h3>
      <p>Return within 7 days of delivery.</p>
      
      <h3>Eligibility</h3>
      <ul>
        <li>✅ Unused condition</li>
        <li>✅ Original packaging</li>
        <li>✅ Tags intact</li>
      </ul>
      
      <h3>Non-Returnable</h3>
      <ul>
        <li>❌ Innerwear and swimwear</li>
        <li>❌ Opened cosmetics</li>
        <li>❌ Perishable food</li>
      </ul>
      
      <h3>Contact</h3>
      <p>Email: returns@selfysnap.com</p>
    `,
  },
  {
    slug: "seller-agreement",
    title: "Seller Agreement",
    category: "seller",
    isSystem: true,
    order: 6,
    description: "Terms for selling on Selfysnap",
    content: `
      <h2>Seller Agreement</h2>
      <p><strong>Last Updated:</strong> January 2025</p>
      <p>This Agreement governs your use of Selfysnap as a seller.</p>
      
      <h3>Seller Eligibility</h3>
      <ul>
        <li>18+ years old</li>
        <li>Valid GST and PAN</li>
        <li>Accurate bank details</li>
      </ul>
      
      <h3>Commission Structure</h3>
      <ul>
        <li>Electronics: 8%</li>
        <li>Fashion: 15%</li>
        <li>Home & Kitchen: 12%</li>
        <li>Beauty: 18%</li>
      </ul>
      
      <h3>Order Fulfillment</h3>
      <ul>
        <li>Ship within 48 hours</li>
        <li>Maintain 95% fulfillment rate</li>
        <li>Respond within 24 hours</li>
      </ul>
      
      <h3>Payment Terms</h3>
      <ul>
        <li>Settled every 7 days</li>
        <li>Minimum ₹500</li>
      </ul>
      
      <h3>Prohibited Items</h3>
      <p>Counterfeit, drugs, weapons, adult content, stolen goods.</p>
      
      <h3>Contact</h3>
      <p>Email: sellers@selfysnap.com</p>
    `,
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("❌ MONGO_URI not found");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("✅ Connected");

    for (const pageData of pages) {
      const existing = await LegalPage.findOne({ slug: pageData.slug });
      if (!existing) {
        await LegalPage.create(pageData);
        console.log(`✅ Created: ${pageData.title}`);
      } else {
        await LegalPage.updateOne({ slug: pageData.slug }, { $set: pageData });
        console.log(`🔄 Updated: ${pageData.title}`);
      }
    }

    console.log("\n🎉 Done!");
    process.exit(0);
  } catch (error) {
    console.error("❌", error);
    process.exit(1);
  }
}

seed();