import {Construct} from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'

export class VpcStack {
    public vpc: ec2.Vpc;

    constructor(scope: Construct) {
        // The code that defines your stack goes here
        this.vpc = new ec2.Vpc(scope, 'TheVPC', {
            cidr: "10.0.0.0/16"
        });
    }
}
