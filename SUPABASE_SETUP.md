# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication with Google and Apple Sign-In in your React Native app.

## Prerequisites

- A Supabase project
- Google Cloud Console project (for Google Sign-In)
- Apple Developer account (for Apple Sign-In)
- React Native app with Expo

## Step 1: Supabase Setup

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Configure Authentication:**
   - In your Supabase dashboard, go to Authentication > Settings
   - Enable Email auth
   - Configure your site URL (for development: `http://localhost:3000`)

3. **Set up OAuth providers:**

   **Google:**
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

   **Apple:**
   - Enable Apple provider
   - Add your Apple OAuth credentials

## Step 2: Google Sign-In Setup

1. **Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to Credentials > Create Credentials > OAuth 2.0 Client IDs
   - Create a Web application client ID
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `yourapp://auth/callback`

2. **Get your Web Client ID:**
   - Copy the Client ID from the OAuth 2.0 client

## Step 3: Apple Sign-In Setup

1. **Apple Developer Console:**
   - Go to [Apple Developer](https://developer.apple.com)
   - Create an App ID with Sign In with Apple capability
   - Create a Services ID for your app
   - Configure the Services ID with your domain

2. **Get your Apple credentials:**
   - Note down your Services ID
   - Create a private key for Sign In with Apple

## Step 4: Environment Configuration

1. **Update the configuration file:**
   - Open `src/config/env.ts`
   - Replace the placeholder values with your actual credentials:

```typescript
export const ENV = {
  SUPABASE_URL: 'https://your-project.supabase.co',
  SUPABASE_ANON_KEY: 'your-supabase-anon-key',
  GOOGLE_WEB_CLIENT_ID: 'your-google-web-client-id.apps.googleusercontent.com',
  APP_SCHEME: 'yourapp', // Your app's URL scheme
};
```

2. **Environment variables (optional):**
   - Create a `.env` file in your project root:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
   ```

## Step 5: App Configuration

1. **Update app.json:**
   - Add your app scheme to the Expo configuration:

```json
{
  "expo": {
    "scheme": "yourapp",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    }
  }
}
```

2. **Install missing dependencies:**
   ```bash
   npm install @react-navigation/stack
   # or
   yarn add @react-navigation/stack
   ```

## Step 6: Testing

1. **Test email/password authentication:**
   - Run your app
   - Try registering with email and password
   - Check your email for verification

2. **Test Google Sign-In:**
   - Make sure you're testing on a device (not simulator)
   - Tap "Continue with Google"
   - Complete the OAuth flow

3. **Test Apple Sign-In:**
   - Test on iOS device
   - Tap "Continue with Apple"
   - Complete the authentication flow

## Troubleshooting

### Common Issues:

1. **"Missing Supabase configuration" error:**
   - Make sure you've updated the environment variables in `src/config/env.ts`

2. **Google Sign-In not working:**
   - Verify your Google Web Client ID is correct
   - Check that you're testing on a device, not simulator
   - Ensure your redirect URIs are properly configured

3. **Apple Sign-In not working:**
   - Verify your Apple Developer account is active
   - Check that Sign In with Apple is enabled for your App ID
   - Ensure you're testing on an iOS device

4. **Navigation issues:**
   - Install `@react-navigation/stack` if you haven't already
   - The current implementation uses a simple state-based navigation

### Security Notes:

- Never commit your actual API keys to version control
- Use environment variables for production
- Regularly rotate your API keys
- Enable Row Level Security (RLS) in Supabase

## Features Included

✅ Email/password authentication  
✅ Google Sign-In  
✅ Apple Sign-In  
✅ Password reset functionality  
✅ Session persistence  
✅ Loading states  
✅ Error handling  
✅ TypeScript support  

## Next Steps

1. **Customize the UI:** Update the styles in the auth screens to match your app's design
2. **Add user profile:** Create a user profile screen to display user information
3. **Implement logout:** Add a logout button to your main app navigation
4. **Add more providers:** Implement additional OAuth providers as needed
5. **Database integration:** Set up user profiles table in Supabase
6. **Push notifications:** Configure push notifications for authenticated users

## Support

If you encounter any issues:
1. Check the Supabase documentation
2. Review the React Native Google Sign-In documentation
3. Check the Expo Apple Authentication documentation
4. Open an issue in your project repository 