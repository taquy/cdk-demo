import * as cdk from '@aws-cdk/core';
import {VpcStack} from "./vpc-stack";
import {RdsStack} from "./rds-stack";
import {LambdaEnv, LambdaStack} from "./lambda-stack";
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';

export class TestCdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const vpcStack = new VpcStack(this);
        const rdsStack = new RdsStack(this, vpcStack.vpc);


        const rdsSecret = <secretsmanager.ISecret>rdsStack.cluster.secret;

        const region = process.env.CDK_DEFAULT_REGION;
        const accountId = process.env.CDK_DEFAULT_ACCOUNT;
        const rdsIdentifier = rdsStack.cluster.clusterIdentifier;
        const rdsClusterArn = `arn:aws:rds:${region}:${accountId}:cluster:${rdsIdentifier}`;

        const lambdaEnv = {
            rdsArn: rdsClusterArn,
            rdsSecretArn: rdsSecret.secretArn,
            rdsEndpoint: rdsStack.cluster.clusterEndpoint,
        } as LambdaEnv;
        const lambdaStack = new LambdaStack(this, lambdaEnv);
    }
}
