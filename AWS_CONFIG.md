# Your AWS Configuration

Based on your current AWS setup, here are the details you'll need for the GitHub Action:

## S3 Bucket
- **Bucket Name**: `jrtb.me`
- **Region**: `us-east-1`

## CloudFront Distribution
- **Distribution ID**: `E5SOUKF9252TP`
- **Domain**: `d2pnkrwhzhi7kd.cloudfront.net`
- **Status**: Deployed

## GitHub Secrets Required

Add these secrets in your GitHub repository under **Settings** → **Secrets and variables** → **Actions**:

| Secret Name | Value |
|-------------|-------|
| `AWS_ACCESS_KEY_ID` | Your IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | Your IAM user secret key |
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET` | `jrtb.me` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E5SOUKF9252TP` |

## Current IAM User
- **User**: `jrtb-iam-user`
- **Account**: `891377140797`

## What Happens Next

1. **Set up GitHub Secrets**: Add the secrets listed above to your repository
2. **Push to main branch**: The GitHub Action will automatically deploy your changes
3. **Automatic deployment**: Every push to `main` will sync files to S3 and invalidate CloudFront cache
4. **Website updates**: Your site at `d2pnkrwhzhi7kd.cloudfront.net` will update within minutes

## Testing the Setup

After adding the secrets:
1. Make a small change to your website
2. Commit and push to the `main` branch
3. Check the **Actions** tab in GitHub to see the deployment progress
4. Verify your changes appear on the live site

## Security Notes

- ✅ No AWS credentials are stored in this repository
- ✅ IAM user has minimal required permissions
- ✅ S3 bucket is not publicly accessible (CloudFront only)
- ✅ All sensitive values are stored as GitHub secrets
