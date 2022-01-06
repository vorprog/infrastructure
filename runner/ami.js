import getGhcrComponentDefinition from '../templates/ghcr-component-definition'

const componentDefinition = getGhcrComponentDefinition(`ghcr.io/vorprog/actions-runner:${process.env.ACTIONS_RUNNER_VERSION}`, process.env.GITHUB_TOKEN);

const component = exec(`aws imagebuilder create-component
--name actions-runner-prepull
--semantic-version ${process.env.ACTIONS_RUNNER_VERSION}
--platform Linux
--data ${JSON.stringify(componentDefinition)}`);

const recipeComponents = [
  { componentArn: `arn:aws:imagebuilder:${process.env.AWS_DEFAULT_REGION}:aws:component/docker-ce-ubuntu/x.x.x` }, // TODO: specify docker-ce-ubuntu compoenent version
  { componentArn: component.componentBuildVersionArn }
];

const recipe = exec(`aws imagebuilder create-image-recipe
--name actions-runner
--semantic-version ${process.env.ACTIONS_RUNNER_VERSION}
--components ${JSON.stringify(recipeComponents)}
--parent-image arn:aws:imagebuilder:${process.env.AWS_DEFAULT_REGION}:aws:image/ubuntu-server-20-lts-arm64/2020.12.11`);

const awsAccountId = exec(`aws sts get-caller-identity --query Account --output text`);

exec(`aws imagebuilder create-image
--tags Name=actions-runner
--image-recipe-arn ${recipe.imageRecipeArn}
--infrastructure-configuration-arn arn:aws:imagebuilder:${process.env.AWS_DEFAULT_REGION}:${awsAccountId}:infrastructure-configuration/default`);

exec(`aws imagebuilder delete-image-recipe ${recipe.imageRecipeArn}`);
exec(`aws imagebuilder delete-component ${component.componentBuildVersionArn}`);
