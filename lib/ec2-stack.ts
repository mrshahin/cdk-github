import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class Ec2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Use the default VPC
    const vpc = ec2.Vpc.fromLookup(this, 'DefaultVPC', {
      isDefault: true,
    });

    // Create a custom security group
    const sg = new ec2.SecurityGroup(this, 'MySecurityGroup', {
      vpc,
      allowAllOutbound: true,
      securityGroupName: 'ec2-sg',
    });

    // Open only SSH port for now
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH');
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow HTTP');
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(4000), 'Allow App');

    // Use existing AWS keypair
    const keyPair = ec2.KeyPair.fromKeyPairName(this, 'KeyPair', 'ec2-demo-key');

    // Create EC2 instance attached to the custom SG
    new ec2.Instance(this, 'DemoInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t3.micro'),
      machineImage: ec2.MachineImage.latestAmazonLinux(),
      keyPair: keyPair,
      securityGroup: sg,         // 🔥 Attach custom SG
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });
  }
}
