import {Construct} from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';

export class LambdaStack {
    public role: iam.Role;

    constructor(scope: Construct) {
        // The code that defines your stack goes here
        this.role = new iam.Role(scope, 'LambdaAccessRdsRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonRDSDataFullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
            ]
        });
    }
}
