import * as cdk from '@aws-cdk/core';
import {VpcStack} from "./vpc-stack";
import {RdsStack} from "./rds-stack";
import {LambdaStack} from "./lambda-stack";

export class TestCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpcStack = new VpcStack(this);
    const rdsStack = new RdsStack(this, vpcStack.vpc);
    const lambdaStack = new LambdaStack(this);
  }
}
