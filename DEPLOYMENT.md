# Deployment Setup

This repository is configured to automatically deploy to S3 when changes are pushed to the `main` branch.

## Prerequisites

1. An AWS S3 bucket configured for static website hosting
2. An IAM user with S3 access permissions
3. (Optional) A CloudFront distribution for CDN

## Setup Steps

### 1. Create IAM User and Policy

Create an IAM user with the following policy attached:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR-BUCKET-NAME",
                "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}
```

### 2. Configure GitHub Secrets

In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions** and add the following secrets:

- `AWS_ACCESS_KEY_ID`: Your IAM user's access key
- `AWS_SECRET_ACCESS_KEY`: Your IAM user's secret key
- `AWS_REGION`: Your AWS region (e.g., `us-east-1`)
- `S3_BUCKET`: Your S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID`: (Optional) Your CloudFront distribution ID

### 3. S3 Bucket Configuration

Ensure your S3 bucket has the following configuration:

- **Static website hosting**: Enabled
- **Index document**: `index.html`
- **Error document**: `index.html` (for SPA routing)
- **Public access**: Blocked (use CloudFront for public access)
- **Bucket policy**: Allow CloudFront access only

### 4. CloudFront Configuration (Recommended)

- Create a CloudFront distribution pointing to your S3 bucket
- Set the origin access control to "S3 bucket access only"
- Configure error pages to return `index.html` for 404s
- Add the distribution ID to your GitHub secrets

## How It Works

1. When you push to the `main` branch, the GitHub Action automatically triggers
2. The action syncs your website files to S3, excluding development files
3. If configured, it invalidates the CloudFront cache for immediate updates
4. Your website is updated within minutes of pushing changes

## Manual Deployment

You can also trigger deployment manually by:
1. Going to the **Actions** tab in GitHub
2. Selecting the "Deploy to S3" workflow
3. Clicking "Run workflow"

## Troubleshooting

- Check the GitHub Actions logs for detailed error messages
- Verify your AWS credentials have the correct permissions
- Ensure your S3 bucket name is correct in the secrets
- Check that your CloudFront distribution ID is valid (if using CDN)
