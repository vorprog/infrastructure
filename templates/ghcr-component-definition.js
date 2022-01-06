// "pre-pulling" container images on an AMI (Amazon Machine Image) reduces ec2 instance startup time
// In order for GHCR images to be available to an ec2 instance, it needs to authenticate to ghcr.io's registry
// https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry

export default (ghcrImageUri, githubActionsToken) => ({
  schemaVersion: `1.0`,
  // parameters: [ // https://docs.aws.amazon.com/imagebuilder/latest/userguide/toe-user-defined-variables.html
  //   {
  //     GHCR_PAT: { // Personal Access Token for pulling from Github Container Registry
  //       type: `string`,
  //       default: `ghp_examplerandomguidcharacters1234`,
  //       // description: `Github Personal Access Token for authenticating to ghcr.io's registry.`
  //     }
  //   }
  // ],
  phases: [
    {
      name: `build`,
      steps: [
        {
          name: `Pre-pull Image`,
          action: `ExecuteBash`,
          inputs: {
            commands: [
              `docker login ghcr.io --username actions-user --password ${githubActionsToken}`, // https://docs.github.com/en/actions/security-guides/automatic-token-authentication
              `docker pull ${ghcrImageUri}`
            ]
          }
        }
      ]
    }
  ]
});