#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Ec2Stack } from '../lib/ec2-stack';
import { S3Stack } from '../lib/s3-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

// EC2 stack
new Ec2Stack(app, 'Ec2Stack', { env });

// S3 stack
new S3Stack(app, 'S3Stack', { env });


