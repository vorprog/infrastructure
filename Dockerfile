FROM registry.hub.docker.com/library/ubuntu:20.04
ENV TERM=xterm
ENV DEBIAN_FRONTEND=noninteractive
ENV HOME=/root
WORKDIR $HOME

RUN apt-get update --yes
RUN apt-get install --yes build-essential apt-transport-https ca-certificates curl unzip git 

RUN echo "Install brew via git clone as directed by https://docs.brew.sh/Homebrew-on-Linux#alternative-installation"
RUN git clone https://github.com/Homebrew/brew $HOME/.linuxbrew/Homebrew
RUN mkdir $HOME/.linuxbrew/bin
RUN ln -s $HOME/.linuxbrew/Homebrew/bin/brew $HOME/.linuxbrew/bin
RUN eval $($HOME/.linuxbrew/bin/brew shellenv) && brew update && brew upgrade && brew install sops kubectl kops

RUN echo "Installing nodejs as directed by https://github.com/nodesource/distributions/blob/master/README.md#debinstall"
RUN curl --silent https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

RUN echo "Installing AWS CLI as directed by https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html"
RUN curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip --output $HOME/awscliv2.zip
RUN unzip $HOME/awscliv2.zip
RUN $HOME/aws/install
RUN rm -rf $HOME/aws $HOME/awscliv2.zip
RUN aws --version

ADD ./source /root/source
ADD ./package.json /root/package.json
RUN npm install

# TODO: is any EXPOSE actually necessary?
EXPOSE 80
