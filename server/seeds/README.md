# RBAC Database Seeding

This directory contains scripts to initialize and manage the RBAC database with default roles and users.

## 📋 Available Scripts

### Seed Database
```bash
npm run seed
```
- Clears existing data and creates fresh roles and users
- Creates 6 default roles (ADMIN, Legal, Non-Legal, Viewer, Editor, Sub-Admin)
- Creates 4 test users with different roles
- Displays login credentials after completion

### Check Database Status
```bash
npm run db:check
```
- Shows current database status
- Lists all roles and users
- Indicates if RBAC system is properly initialized

## 🔐 Default Login Credentials

After running the seeder, you can use these credentials:

### Admin User (Full Access)
- **Email:** admin@rbac.com
- **Password:** admin123
- **Role:** ADMIN

### Legal User
- **Email:** legal@rbac.com
- **Password:** legal123
- **Role:** Legal

### Viewer User (Limited Access)
- **Email:** viewer@rbac.com
- **Password:** viewer123
- **Role:** Viewer

### Editor User (Extended Access)
- **Email:** editor@rbac.com
- **Password:** editor123
- **Role:** Editor

## 📝 Default Roles and Permissions

### ADMIN
- Full access to all features and sub-features
- Can manage users, roles, and system settings
- Access to admin panel and configuration

### Legal
- Access to conversational features
- Full discovery features
- Limited visualization (no analytics)
- No admin or user management access

### Non-Legal
- Similar to Legal but with restricted discovery features
- No tech or finance content in discovery
- Limited visualization features

### Viewer
- Read-only access to most features
- Can view charts but not create reports
- No admin features or user management
- Limited quick actions

### Editor
- Extended access including analytics
- Can view users but not add them
- Some configuration access
- System logs access

### Sub-Admin
- Nearly full admin access
- Can manage users and roles
- Cannot modify core permissions
- Full configuration access (except security)

## 🚀 Usage Instructions

1. **First Time Setup:**
   ```bash
   cd server
   npm run seed
   ```

2. **Check if RBAC is working:**
   ```bash
   npm run db:check
   ```

3. **Reset database (if needed):**
   ```bash
   npm run seed:fresh
   ```

4. **Login to test:**
   - Use any of the provided credentials
   - Navigate to different sections to test permissions
   - Admin users will see all features
   - Other roles will see limited features based on their permissions

## 🔧 Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running
- Check `.env` file for correct `MONGO_URI`
- Default connection: `mongodb://localhost:27017/rbac`

### Missing Roles/Users
- Run `npm run db:check` to see current status
- If incomplete, run `npm run seed` to reinitialize

### Permission Issues
- Permissions are stored in the Role model
- Each role has feature-based permissions
- Sub-features are nested under main features

## 📁 File Structure

```
seeds/
├── seedDatabase.js     # Main seeding script
├── checkDatabase.js    # Database status checker
└── README.md          # This file
```

## 🛠️ Customization

To modify default roles or users:
1. Edit `seedDatabase.js`
2. Update the `defaultRoles` or `testUsers` arrays
3. Run `npm run seed` to apply changes

**Note:** The seeder clears existing data before creating new records. Make sure to backup any important data before running.