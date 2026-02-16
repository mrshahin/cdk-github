import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const account = props?.env?.account ?? '000000000000';

    // Keep first bucket safe
    new s3.Bucket(this, 'SandboxBucket', {
      bucketName: `cdk-sandbox-bucket-${account}`,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });

    // Add new bucket safely
    new s3.Bucket(this, 'SandboxBucket2', {
      bucketName: `cdk-sandbox-bucket2-${account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}
