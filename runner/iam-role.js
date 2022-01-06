import * as fs from "fs"
import * as exec from "@vorprog/exec"

const assumeRolePolicyContent = {
  Version: `2012-10-17`,
  Statement: {
    Effect: `Allow`,
    Principal: {
      Service: `ec2.amazonaws.com`
    },
    Action: `sts:AssumeRole`
  }
};

fs.writeFileSync(`${__dirname}/trust-policy.json`, JSON.stringify(assumeRolePolicyContent));

exec(`aws iam policy
--role-name actions-runner
--assume-role-policy-document file://${__dirname}/trust-policy.json`);

exec(`aws iam attach-role-policy
--role-name actions-runner
--policy-arn arn:aws:iam::aws:policy/AdministratorAccess`);

exec(`aws iam attach-role-policy
--role-name actions-runner
--policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore`);
