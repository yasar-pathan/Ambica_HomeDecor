# AWS Deployment Guide for Ambica Home Decor (Managed Route with CI/CD)

*Update: As AWS App Runner is no longer accepting new users, this guide uses **AWS Elastic Beanstalk** for the backend. We've also included a setup for **fully automated deployments directly from GitHub**.*

This guide ensures that **every time you push to the `main` branch on GitHub**, both your frontend and backend will automatically build and deploy the changes live.

### Prerequisites
1. **GitHub Repository:** Your code is pushed to a GitHub repository.
2. **MongoDB Atlas:** Go to your cluster's Network Access and allow access from anywhere (`0.0.0.0/0`) since AWS IPs change dynamically. Copy your connection string.

---

## Part 1: Initial Backend Deployment (AWS Elastic Beanstalk)

First, we need to create the environment manually. After this is done once, we'll automate it.

### 1. Prepare your Backend Code
1. Open your `backend` folder on your computer.
2. Select all files and folders **EXCEPT** the `node_modules` folder and `.env` file.
3. Compress/Zip these selected files into a file named `backend-v1.zip`.

### 2. Create the Beanstalk Environment
1. Go to the **AWS Management Console** and search for **Elastic Beanstalk**.
2. Click **Create application**.
3. **Application Information:** Name it `luxe-decor-api`
4. **Platform:** Select **Node.js** (Branch: Node.js 20 or 18).
5. **Application code:** Select **Upload your code** and upload your `backend-v1.zip`.
6. **Presets:** Select **Single instance (free tier eligible)**.
7. Click **Next** until you reach the **Configure Updates, Monitoring, and Routing** (or Software) step.

### 3. Add Environment Variables
1. Scroll down to **Environment properties**.
2. Add your variables:
   - `MONGO_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `your_secret`
   - `PORT` = `8080` (AWS forwards port 80 to 8080 automatically).
3. Click **Next** and **Submit**.
4. Once it finishes (turns Green), **save the Domain URL** (e.g., `http://luxe-decor-api-env.eba-xxxx.us-east-1.elasticbeanstalk.com`). Also, make note of the exact **Environment Name** (e.g., `Luxedecorapi-env`).

---

## Part 2: Deploying the Frontend (AWS Amplify)
Amplify handles automatic GitHub deployments out of the box.

1. Go to **AWS Amplify** -> **Create new app** -> **GitHub**.
2. Select your `ambica-home-decor` repository and the `main` branch.
3. **Crucial:** Check the box that says **"Connecting a monorepo? Pick a folder."** and type `frontend`.
4. Expand **Advanced settings** and add your Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `http://your-beanstalk-url.elasticbeanstalk.com/api` *(Use the URL from Part 1)*.
5. Click **Next** and **Save and deploy**. 
*Whenever you push changes to the `frontend/` folder on GitHub, Amplify will automatically update your live site!*

---

## Part 3: Automating Backend Deployments (GitHub Actions)
Since the frontend is automated, let's automate the backend so you never have to manually upload a `.zip` file again.

### 1. Get AWS Credentials
1. In AWS, search for **IAM** and go to **Users**.
2. Click **Create user**. Name it `github-actions-deploy`.
3. Click **Next**, select **Attach policies directly**, and search for `AdministratorAccess-AWSElasticBeanstalk`. Select it and create the user.
4. Click on the newly created user, go to the **Security credentials** tab, and click **Create access key**. Select **Third-party service**.
5. Copy the **Access Key** and **Secret Access Key**.

### 2. Add Secrets to GitHub
1. Go to your repository on **GitHub.com** -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Click **New repository secret**.
3. Create `AWS_ACCESS_KEY_ID` and paste your Access Key.
4. Create `AWS_SECRET_ACCESS_KEY` and paste your Secret Key.

### 3. Create the GitHub Action File
In your code editor, create a new file in your project root at `.github/workflows/deploy-backend.yml` and paste the following code:

```yaml
name: Deploy Backend to Elastic Beanstalk

on:
  push:
    branches:
      - main
    paths:
      - 'backend/**' # Only runs when backend files change

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Create ZIP Deployment Package
        run: |
          cd backend
          zip -r ../backend-deploy.zip . -x "node_modules/*" ".env"

      - name: Deploy to Elastic Beanstalk
        uses: einaregilsson/beanstalk-deploy@v21
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: luxe-decor-api
          environment_name: Luxedecorapi-env # UPDATE THIS to your exact Beanstalk Environment Name
          version_label: "backend-${{ github.sha }}"
          region: us-east-1 # UPDATE THIS if your AWS region is different
          deployment_package: backend-deploy.zip
```

### You're Done!
Now, whenever you push code to GitHub:
- If a file in the `frontend/` folder changes, AWS Amplify will automatically detect it and deploy the changes.
- If a file in the `backend/` folder changes, GitHub Actions will zip it and send it to Elastic Beanstalk instantly.
