---
sidebar_position: 2
---

# Pricing

UnDercontrol is **self-hostable** — run any tier on your own infrastructure for complete data control, or use our hosted app at [ud.oatnil.com](https://ud.oatnil.com). Flexible pricing to match your needs.

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
- Getting started with UnDercontrol
- Testing before upgrading

---

### Pro

Professional features for teams and advanced use cases.

**Price:** [Contact us](/contact) for pricing

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

**Price:** [Contact us](/contact) for pricing (higher than Pro)

**Features:** Identical to Pro tier

**Why choose Max?**
- 🎁 Support continued development of UnDercontrol
- 🚀 Help fund new features and improvements
- ⭐ Show your appreciation for the project
- 💪 Enable faster updates and better support

**Perfect for:**
- Enthusiasts who love the project
- Organizations wanting to give back
- Users who value the project's sustainability

:::info Supporter Tier
Max tier has the same features as Pro. The higher price directly supports UnDercontrol's development and helps keep the project thriving. Thank you for your support!
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
| **Self-Hostable**         | ✓        | ✓   | ✓   |
| **Your Data, Your Infra** | ✓        | ✓   | ✓   |

---

## How Licensing Works

### Personal Tier (Free)
- **No license needed** - Just install and start using UnDercontrol
- Perfect for personal use
- Get started in minutes

### Pro/Max Tiers (Paid)
1. Purchase your license
2. Receive a license key via email
3. Add the license key when installing UnDercontrol
4. All Pro/Max features unlock automatically

:::tip Simple Setup
After purchasing, you'll receive detailed instructions on how to activate your license. It's as simple as adding one line to your installation.
:::

---

## Installation

UnDercontrol works on any platform:

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

### Where does UnDercontrol run?

You choose. Self-host it on your own infrastructure (server, VPS, or local machine) for complete control of your data — or use our hosted app at [ud.oatnil.com](https://ud.oatnil.com) if you'd rather not run your own server. For maximum privacy, self-hosting keeps everything on hardware you control.

### Do I need technical knowledge to self-host?

**Personal tier:** No! Our one-line installation script handles everything. If you can copy and paste a command, you can run UnDercontrol.

**Pro/Max tiers:** Basic computer skills are enough. Advanced features like cloud storage are optional and come with step-by-step guides.

### Can I try Pro features before purchasing?

Yes! The Personal tier includes all core features. You can evaluate UnDercontrol thoroughly before upgrading. Pro/Max mainly adds multi-user support and storage flexibility.

### What happens if my Pro/Max license expires?

Don't worry - your data is safe! Your UnDercontrol installation automatically switches back to Personal tier (free version):
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

**One license per installation.** If you install UnDercontrol on one server, you need one license - no matter how many people use it (up to your license's user limit).

Example: If you have a Pro license for 10 users, all 10 people can use the same installation with one license.

### How do I purchase a license?

Paid Pro and Max tiers are not on sale yet — pricing is still being finalized. In the meantime the Personal tier is free and fully functional. For early access or any questions, [contact us](/contact).

---

## Still Have Questions?

We're here to help!

- 📧 **Contact**: [Get in touch](/contact)
- 📚 **Read the Docs**: [Getting Started Guide](/docs/intro)
- 🚀 **Installation Help**: [Step-by-Step Setup](/docs/deployment/docker-compose-local)
- 💬 **Need to talk?**: Contact us for a demo or consultation

---

## Ready to Get Started?

### Try Personal Tier (Free)

Start using UnDercontrol in minutes with our Personal tier:

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

Already using Personal tier? [Contact us](/contact) to upgrade and unlock team features.
