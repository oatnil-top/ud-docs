---
sidebar_position: 3
---

# License Activation Guide

Learn how to activate your Pro or Max license and unlock team features in UnderControl.

:::tip Already have a license?
Jump to the [Quick Activation](#quick-activation) section to get started immediately.
:::

## Understanding UnderControl Tiers

UnderControl offers three tiers to fit your needs:

| Tier | Price | Users | Best For |
|------|-------|-------|----------|
| **Personal** | Free | 1 user | Personal finance management |
| **Pro** | Paid | Multiple users | Teams and businesses |
| **Max** | Paid (Supporter) | Multiple users | Supporting the project |

For detailed feature comparison, visit the [Pricing](/docs/pricing) page.

---

## Quick Activation

### Step 1: Get Your License

After purchasing a Pro or Max license, you'll receive an email containing:
- Your **license key** (a long string of characters)
- Activation instructions
- Support contact information

:::info What does a license key look like?
Your license key is a long string that looks similar to:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aWVyIjoicHJvIiwiY3VzdG9tZXJfaWQiOiJjdXN0XzEyMzQ1In0...
```
Keep this key safe! You'll need it to activate your Pro/Max features.
:::

### Step 2: Add Your License

Choose the method that works best for your setup:

#### Option 1: During Installation (Easiest)

When installing UnderControl, add your license key to the command:

**Mac/Linux:**
```bash
export LICENSE_TOKEN="your-license-key-here"
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

**Windows (PowerShell):**
```powershell
$env:LICENSE_TOKEN="your-license-key-here"
irm https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1 | iex
```

#### Option 2: After Installation

If UnderControl is already installed, add your license to the configuration file:

**Using Docker Compose:**

1. Open your `docker-compose.yml` file
2. Add the license under `environment`:

```yaml
services:
  server:
    image: undercontrol/backend:latest
    environment:
      - LICENSE_TOKEN=your-license-key-here  # Add this line
    # ... rest of your configuration
```

3. Restart UnderControl:
```bash
docker compose restart
```

**Using Environment Variables:**

1. Set the license environment variable:

**Mac/Linux:**
```bash
export LICENSE_TOKEN="your-license-key-here"
```

**Windows (PowerShell):**
```powershell
$env:LICENSE_TOKEN="your-license-key-here"
```

2. Restart UnderControl

### Step 3: Verify Activation

1. Open UnderControl in your browser (`http://localhost:3000`)
2. Log in to your account
3. Check your account settings to confirm your tier shows as **Pro** or **Max**

✅ **Success!** You now have access to all Pro/Max features.

---

## What Happens After Activation

Once your license is activated:

✓ **Admin Dashboard** becomes available  
✓ **User Management** features unlock  
✓ You can **add more users** to your installation  
✓ **Cloud Storage** options (S3, Cloudflare R2, etc.) are enabled  
✓ **PostgreSQL** database support is available  

---

## Managing Your License

### Viewing License Information

To check your current license status:
1. Open UnderControl
2. Go to **Settings** → **License**
3. View your:
   - Current tier (Personal, Pro, or Max)
   - License expiration date
   - Number of users allowed
   - Available features

### Updating Your License

To change or update your license:

1. Replace the old license key with your new one (use the same method you used for initial activation)
2. Restart UnderControl
3. Your new license is now active

### Removing Your License

To switch back to Personal tier:

1. Remove the `LICENSE_TOKEN` from your configuration
2. Restart UnderControl
3. UnderControl will automatically switch to Personal tier

:::warning Data Safety
Removing your license doesn't delete your data. Your budgets, expenses, and records remain safe. However, advanced features will be disabled and only one user will be able to access the system.
:::

---

## Troubleshooting

### License Not Activating

**Problem:** Added license key but still seeing Personal tier

**Solutions:**
1. **Check for typos** - License keys are long and easy to mistype. Copy and paste to avoid errors.
2. **Remove quotes** - Don't include quote marks around your license key
3. **Restart UnderControl** - Changes require a restart to take effect
4. **Check expiration** - Verify your license hasn't expired

### "Invalid License" Error

**Problem:** Getting an error about invalid license

**Possible causes:**
- License has expired
- License key was copied incorrectly
- License is for a different product

**Solution:** Contact support at support@undercontrol.io with your license details

### Features Not Unlocking

**Problem:** License shows as active but Pro/Max features aren't available

**Solution:**
1. Verify license shows correctly in Settings
2. Log out and log back in
3. Clear your browser cache
4. Restart UnderControl completely

If issues persist, contact support@undercontrol.io

---

## Upgrading from Personal to Pro/Max

Already using the Personal tier? Here's how to upgrade:

### Step-by-Step Upgrade Process

1. **Purchase a Pro or Max license**
   - Contact us at support@undercontrol.io
   - Receive your license key via email

2. **Add your license key**
   - Use any of the activation methods above
   - No need to reinstall UnderControl!

3. **Restart UnderControl**
   - `docker compose restart` (if using Docker)
   - Or restart your UnderControl service

4. **Your data stays intact**
   - All your budgets, expenses, and records remain unchanged
   - No migration or export needed!

5. **Start using Pro/Max features**
   - Access the admin dashboard
   - Invite team members
   - Configure cloud storage (optional)

:::success Zero Downtime Upgrade
Upgrading from Personal to Pro/Max doesn't require reinstallation or data migration. Just add your license and restart - that's it!
:::

---

## Need Help?

### Contact Support

Having trouble with license activation? We're here to help!

- 📧 **Email**: support@undercontrol.io
- 📚 **Documentation**: [Installation Guide](/docs/deployment/docker-compose-local)
- 💰 **Pricing Questions**: [Pricing Page](/docs/pricing)

### Common Questions

**Q: Do I need a separate license for development and production?**  
A: Yes, each installation requires its own license.

**Q: Can I transfer my license to a different server?**  
A: Yes! Simply remove the license from the old server and add it to the new one.

**Q: What happens when my license expires?**  
A: UnderControl automatically switches back to Personal tier. Your data remains safe and you can renew anytime.

**Q: Can I get a trial license?**  
A: The Personal tier is free and includes all core features. This serves as a full-featured trial of UnderControl.

---

## Next Steps

After activating your license:

1. **Invite Users** - Add team members from the admin dashboard
2. **Configure Cloud Storage** (optional) - Set up S3 or Cloudflare R2
3. **Set Up PostgreSQL** (optional) - Switch to PostgreSQL for better performance
4. **Explore Team Features** - Set up roles and permissions

See the [Deployment Guide](/docs/deployment/docker-compose-local) for more configuration options.
