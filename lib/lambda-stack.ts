import {Construct} from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export interface LambdaEnv {
    rdsEndpoint: string
    rdsArn: string
    rdsSecretArn: string
}

export class LambdaStack {
    public role: iam.Role;
    public fn: lambda.Function;

    constructor(scope: Construct, env: LambdaEnv) {
        // The code that defines your stack goes here
        this.role = new iam.Role(scope, 'LambdaAccessRdsRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSDataFullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
            ]
        });

        this.fn = new lambda.Function(scope, "Lambda", {
            role: this.role,
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset("functions"),
            handler: "main.handler",
            environment: {
                RDS_ARN: env.rdsArn,
                RDS_SECRET_ARN: env.rdsSecretArn,
                RDS_ENDPOINT: env.rdsEndpoint
            }
        });
    }
}
