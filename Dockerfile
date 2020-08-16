FROM registry.hub.docker.com/library/ubuntu:20.04
ENV TERM=xterm
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /root

RUN echo "Installing nodejs as directed by https://github.com/nodesource/distributions/blob/master/README.md#debinstall"
RUN curl --silent https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

RUN echo "Installing AWS CLI as directed by https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html"
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "$HOME/awscliv2.zip"
RUN unzip $HOME/awscliv2.zip
RUN sudo $HOME/aws/install
RUN rm -rf $HOME/aws $HOME/awscliv2.zip
RUN aws --version

ADD ./source /root/source
ADD ./package.json /root/package.json
RUN npm install

EXPOSE 80
CMD ["npm run create"]