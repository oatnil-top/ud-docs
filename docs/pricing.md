---
sidebar_position: 2
---

# Pricing

UnderControl is **100% self-hosted** with flexible pricing tiers to match your needs. All tiers run on your own infrastructure, ensuring complete data privacy and control.

## Subscription Tiers

### Personal (Free)

Perfect for individual users managing their own finances.

**Price:** Free forever, no license required

**Key Features:**
- ✓ Budget management
- ✓ Expense tracking
- ✓ Task management
- ✓ Account history
- ✓ Single user access
- ✓ Self-hosted deployment

**Limitations:**
- Single user only
- SQLite database only
- Local file storage only
- No admin dashboard
- No team collaboration

**Perfect for:**
- Personal finance management
- Individual budget tracking
- Getting started with UnderControl
- Testing before upgrading

---

### Pro

Professional features for teams and advanced use cases.

**Price:** Coming soon

**Everything in Personal, plus:**
- ✓ **Multiple users** with role management
- ✓ **Admin dashboard** for user management
- ✓ **PostgreSQL support** for better performance
- ✓ **S3 storage integration** (AWS S3, Cloudflare R2, MinIO)
- ✓ **Team collaboration** features
- ✓ Flexible deployment options

**Database Options:**
- SQLite (same as Personal)
- PostgreSQL (recommended for teams)

**Storage Options:**
- Local filesystem (same as Personal)
- S3-compatible storage (AWS S3, Cloudflare R2, MinIO)

**Perfect for:**
- Small teams (2-10 users)
- Businesses requiring cloud storage
- Multi-user households
- Advanced self-hosters

---

### Max (Supporter)

Support the project while enjoying Pro features.

**Price:** Coming soon (higher than Pro)

**Features:** Identical to Pro tier

**Why choose Max?**
- 🎁 Support continued development of UnderControl
- 🚀 Help fund new features and improvements
- ⭐ Show your appreciation for open-source software
- 💪 Enable faster updates and better support

**Perfect for:**
- Enthusiasts who love the project
- Organizations wanting to give back
- Users who value open-source sustainability

:::info Supporter Tier
Max tier has the same features as Pro. The higher price directly supports UnderControl's development and helps keep the project thriving. Thank you for your support!
:::

---

## Feature Comparison

| Feature                   | Personal | Pro | Max |
|---------------------------|----------|-----|-----|
| **Price**                 | Free     | Paid | Paid (Supporter) |
| **License Required**      | No       | Yes | Yes |
| **Users**                 | 1        | Multiple | Multiple |
| **Database**              | SQLite   | SQLite or PostgreSQL | SQLite or PostgreSQL |
| **File Storage**          | Local    | Local or S3 | Local or S3 |
| **Admin Dashboard**       | ✗        | ✓   | ✓   |
| **Budget Management**     | ✓        | ✓   | ✓   |
| **Expense Tracking**      | ✓        | ✓   | ✓   |
| **Task Management**       | ✓        | ✓   | ✓   |
| **Account History**       | ✓        | ✓   | ✓   |
| **User Roles**            | N/A      | Admin, User | Admin, User |
| **Team Collaboration**    | ✗        | ✓   | ✓   |
| **Self-Hosted**           | ✓        | ✓   | ✓   |
| **Data Privacy**          | 100%     | 100% | 100% |
| **Open Source**           | ✓        | ✓   | ✓   |

---

## How Licensing Works

### Personal Tier (Free)
- **No license needed** - Just install and start using UnderControl
- Perfect for personal use
- Get started in minutes

### Pro/Max Tiers (Paid)
1. Purchase your license
2. Receive a license key via email
3. Add the license key when installing UnderControl
4. All Pro/Max features unlock automatically

:::tip Simple Setup
After purchasing, you'll receive detailed instructions on how to activate your license. It's as simple as adding one line to your installation.
:::

---

## Installation

UnderControl works on any platform:

- **Windows** - One-click installation
- **Mac** - Simple setup via Terminal
- **Linux** - Works on any distribution
- **Docker** - Container-based deployment (recommended)

**Quick Install (Free Personal Tier):**

**Mac/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1 | iex
```

See the [Installation Guide](/docs/deployment/docker-compose-local) for detailed instructions.

---

## Upgrade Path

### From Personal to Pro/Max

1. Purchase a Pro or Max license
2. Add the license token to your configuration
3. Restart the application
4. Pro/Max features activate immediately
5. Configure PostgreSQL or S3 storage (optional)
6. Invite additional users

**No data migration required** - Your existing data stays intact.

### From Pro to Max

Simply replace your Pro license with a Max license. All features remain the same.

---

## Frequently Asked Questions

### Is UnderControl cloud-hosted?

No. UnderControl is **100% self-hosted**. You run it on your own infrastructure (server, VPS, or local machine). We never host your data.

### Do I need technical knowledge to self-host?

**Personal tier:** No! Our one-line installation script handles everything. If you can copy and paste a command, you can run UnderControl.

**Pro/Max tiers:** Basic computer skills are enough. Advanced features like cloud storage are optional and come with step-by-step guides.

### Can I try Pro features before purchasing?

Yes! The Personal tier includes all core features. You can evaluate UnderControl thoroughly before upgrading. Pro/Max mainly adds multi-user support and storage flexibility.

### What happens if my Pro/Max license expires?

Don't worry - your data is safe! Your UnderControl installation automatically switches back to Personal tier (free version):
- Only one user can access the system (the admin)
- Advanced features like team management become unavailable
- Cloud storage switches to local storage

**Important: Your data is never deleted.** You can renew your license anytime to restore full functionality.

### What cloud storage options are available?

Pro and Max tiers support popular cloud storage providers:
- **AWS S3** - Amazon's cloud storage
- **Cloudflare R2** - Cost-effective alternative to S3
- **MinIO** - Self-hosted option
- **Backblaze B2** - Affordable cloud storage
- **DigitalOcean Spaces** - Simple cloud storage
- **Wasabi** - Hot cloud storage

You can also use local storage (files saved on your server) with any tier.

### Is the license per server or per user?

**One license per installation.** If you install UnderControl on one server, you need one license - no matter how many people use it (up to your license's user limit).

Example: If you have a Pro license for 10 users, all 10 people can use the same installation with one license.

### Can I get a refund?

Yes! We offer a **30-day money-back guarantee**. If UnderControl doesn't work for you, just let us know and we'll refund your purchase - no questions asked.

### How do I purchase a license?

License purchasing will be available soon. For early access or questions, contact us at: support@undercontrol.io

---

## Still Have Questions?

We're here to help!

- 📧 **Email Support**: support@undercontrol.io
- 📚 **Read the Docs**: [Getting Started Guide](/docs/intro)
- 🚀 **Installation Help**: [Step-by-Step Setup](/docs/deployment/docker-compose-local)
- 💬 **Need to talk?**: Contact us for a demo or consultation

---

## Ready to Get Started?

### Try Personal Tier (Free)

Start using UnderControl in minutes with our Personal tier:

**Mac/Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1 | iex
```

After installation, open your browser to `http://localhost:3000` and you're ready to go!

### Upgrade to Pro/Max

Already using Personal tier? [Contact us](mailto:support@undercontrol.io) to upgrade and unlock team features.
