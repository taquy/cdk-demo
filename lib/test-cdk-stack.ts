import * as cdk from '@aws-cdk/core';
import {VpcStack} from "./vpc-stack";

export class TestCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new VpcStack(this, 'VpcStack');



    // The code that defines your stack goes here
  }
}
