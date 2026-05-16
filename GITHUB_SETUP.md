# GitHub Push Authentication Setup (Termux/Android)

Follow these steps to fix the "Username/Password" prompt and enable zero-error pushing to your repository.

### 1. Configure Global Git Identity
Replace with your own GitHub details:
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### 2. Enable Credential Storage
This ensures you only have to enter your credentials **once**.
```bash
git config --global credential.helper store
```

### 3. Update Remote URL with PAT (Personal Access Token)
Since GitHub password authentication is deprecated, you must use a **Personal Access Token (PAT)**. 

1. Generate a PAT at: [GitHub Settings > Developer Settings > Personal Access Tokens (classic)](https://github.com/settings/tokens)
2. Grant `repo` permissions.
3. Run this command to include your PAT in the remote URL (replace `YOUR_PAT` with your actual token):

```bash
git remote set-url origin https://YOUR_PAT@github.com/bajajravi12/Ravan-infra.git
```

### 4. Direct Push Workflow
Now you can push without being asked for a password:
```bash
git add .
git commit -m "update"
git push
```

---
**Note:** If you prefer not to store the PAT in the URL for security reasons, you can keep the remote URL as it is and the `credential.helper store` will ask for your Username and PAT (as the password) once, then save it forever in `~/.git-credentials`.
