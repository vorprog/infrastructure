FROM registry.hub.docker.com/library/ubuntu:20.04
ENV HOME=/root
WORKDIR $HOME

RUN apt-get update --yes
RUN apt-get install --yes build-essential apt-transport-https ca-certificates curl unzip git jq

# Install nodejs as directed by https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN curl --silent https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

RUN export RELEASE_URL="https://api.github.com/repos/mozilla/sops/releases/latest"
RUN export DOWNLOAD_URL=$(curl --silent $RELEASE_URL | jq -r '.assets[] | select(.browser_download_url | contains(".linux")).browser_download_url')
RUN sudo curl -L $DOWNLOAD_URL --output /usr/bin/sops
RUN sudo chmod +x /usr/bin/sops

# Install AWS CLI as directed by https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_arm.zip" -o "$HOME/awscliv2.zip"
RUN unzip $HOME/awscliv2.zip
RUN $HOME/aws/install
RUN rm -rf $HOME/aws $HOME/awscliv2.zip

ADD ./package.json ./package-lock.json $HOME/
ADD ./source $HOME/source
RUN npm install
