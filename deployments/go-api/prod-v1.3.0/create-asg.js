const exec = require('../../../../utilities/exec');
const deploymentName = `go-api-prod-v1.3.0`

exec(`aws autoscaling create-auto-scaling-group
--auto-scaling-group-name ${deploymentName}
--launch-template LaunchTemplateName=${deploymentName},Version=$Latest
--min-size 2
--max-size 5
--vpc-zone-identifier "subnet-5ea0c127,subnet-6194ea3b,subnet-c934b782"`);

// https://docs.aws.amazon.com/autoscaling/ec2/APIReference/API_TargetTrackingConfiguration.html
const targetTrackingConfiguration = {
  PredefinedMetricSpecification: {
    PredefinedMetricType: `ASGAverageCPUUtilization`
  },
  TargetValue: 75.0,
};

// https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html
exec(`aws autoscaling put-scaling-policy
--auto-scaling-group-name ${deploymentName}
--policy-name ${deploymentName}
--policy-type TargetTrackingScaling
--target-tracking-configuration '${JSON.stringify(targetTrackingConfiguration)}'`);
