// "pre-pulling" container images on an AMI (Amazon Machine Image) reduces ec2 instance startup time
// In order for GHCR images to be available to an ec2 instance, it needs to authenticate to ghcr.io's registry
// https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry

export default (ghcrImageUri, githubActionsToken) => ({
  schemaVersion: `1.0`,
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