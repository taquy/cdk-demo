import {Construct} from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds'
import * as ec2 from '@aws-cdk/aws-ec2'
import {IParameterGroup} from "@aws-cdk/aws-rds";

export class RdsStack {
    cluster: rds.DatabaseCluster;

    constructor(scope: Construct, vpc: ec2.Vpc) {
        // The code that defines your stack goes here
        const paramGroup = {
            parameterGroupName: 'default.aurora-postgresql11',
        } as IParameterGroup;

        this.cluster = new rds.DatabaseCluster(scope, 'Database', {
            engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
            parameterGroup: paramGroup,
            masterUser: {
                username: 'root'
            },
            instanceProps: {
                instanceType: ec2.InstanceType.of(ec2.InstanceClass.R4, ec2.InstanceSize.LARGE),
                vpcSubnets: {
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                vpc
            }
        });
    }
}
