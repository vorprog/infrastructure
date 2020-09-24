FROM registry.hub.docker.com/library/ubuntu:20.04
ENV HOME=/root
WORKDIR $HOME

RUN apt-get update --yes
RUN apt-get install --yes build-essential apt-transport-https ca-certificates curl unzip git 

# Install brew via git clone as directed by https://docs.brew.sh/Homebrew-on-Linux#alternative-installation
RUN git clone https://github.com/Homebrew/brew $HOME/.linuxbrew/Homebrew
RUN mkdir $HOME/.linuxbrew/bin
RUN ln -s $HOME/.linuxbrew/Homebrew/bin/brew $HOME/.linuxbrew/bin
RUN eval $($HOME/.linuxbrew/bin/brew shellenv) && brew install sops kubectl kops

# Install nodejs as directed by https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN curl --silent https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Install AWS CLI as directed by https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "$HOME/awscliv2.zip"
RUN unzip $HOME/awscliv2.zip
RUN $HOME/aws/install
RUN rm -rf $HOME/aws $HOME/awscliv2.zip

ADD ./package.json ./package-lock.json $HOME/
ADD ./source $HOME/source
RUN npm install
