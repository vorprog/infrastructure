const componentDefinition = {
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
              `docker pull ${process.env.REGISTRY}/${process.env.ORGANIZATION}/actions-runner:${process.env.RUNNER_VERSION}`
            ]
          }
        }
      ]
    }
  ]
};

const component = exec(`aws imagebuilder create-component
--name actions-runner-prepull
--semantic-version ${process.env.RUNNER_VERSION}
--platform Linux
--data ${JSON.stringify(componentDefinition)}`);

const recipeComponents = [
  { componentArn: `arn:aws:imagebuilder:us-west-2:aws:component/docker-ce-ubuntu/x.x.x` },
  { componentArn: component.componentBuildVersionArn }
];

const recipe = exec(`aws imagebuilder create-image-recipe
--name actions-runner
--semantic-version ${process.env.RUNNER_VERSION}
--components ${JSON.stringify(recipeComponents)}
--parent-image arn:aws:imagebuilder:us-west-2:aws:image/ubuntu-server-20-lts-arm64/2020.12.11`);

const image = exec(`aws imagebuilder create-image
--tags Name=actions-runner
--image-recipe-arn ${recipe.imageRecipeArn}
--infrastructure-configuration-arn //arn:aws:imagebuilder:us-west-2:${process.env.AWS_ACCOUNT_ID}:infrastructure-configuration/default`);  
// "imageBuildVersionArn": "arn:aws:imagebuilder:us-west-2:123456789012:image/mybasicrecipe/2019.12.03/1"
